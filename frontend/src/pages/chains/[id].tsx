import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { chainAPI } from '@/lib/api';

interface Chain {
  id: number;
  name: string;
  description: string;
  trigger_type: string;
  trigger_config: any;
  actions: any[];
  is_active: boolean;
  execution_cost: number;
  created_at: string;
  updated_at: string;
}

interface Execution {
  id: number;
  status: string;
  trigger_data: any;
  execution_result: any;
  cost: number;
  charged: boolean;
  created_at: string;
  completed_at: string;
}

export default function ChainDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [chain, setChain] = useState<Chain | null>(null);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (id) {
      fetchChainData();
    }
  }, [id, router]);

  const fetchChainData = async () => {
    try {
      const [chainRes, executionsRes] = await Promise.all([
        chainAPI.get(Number(id)),
        chainAPI.getExecutions(Number(id), 20)
      ]);
      
      setChain(chainRes.data);
      setExecutions(executionsRes.data);
    } catch (error) {
      console.error('Failed to fetch chain data:', error);
      alert('Failed to load chain data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async () => {
    if (!chain) return;
    
    try {
      await chainAPI.update(chain.id, { is_active: !chain.is_active });
      setChain({ ...chain, is_active: !chain.is_active });
    } catch (error) {
      alert('Failed to update chain');
    }
  };

  const handleExecute = async () => {
    if (!chain) return;
    
    try {
      await chainAPI.execute(chain.id);
      alert('Chain execution started!');
      fetchChainData(); // Refresh data
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to execute chain');
    }
  };

  const handleDelete = async () => {
    if (!chain) return;
    
    if (!confirm(`Are you sure you want to delete "${chain.name}"?`)) {
      return;
    }
    
    try {
      await chainAPI.delete(chain.id);
      router.push('/dashboard');
    } catch (error) {
      alert('Failed to delete chain');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!chain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chain not found</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-600 hover:underline mb-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">{chain.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chain Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{chain.name}</h2>
                  <p className="text-gray-600">{chain.description || 'No description'}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded ${
                    chain.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {chain.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Trigger Type</p>
                  <p className="font-semibold">{chain.trigger_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Execution Cost</p>
                  <p className="font-semibold">${chain.execution_cost.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Actions ({chain.actions.length})</h3>
                <div className="space-y-2">
                  {chain.actions.map((action, index) => (
                    <div key={index} className="border rounded p-3">
                      <p className="font-medium">{index + 1}. {action.type}</p>
                      <pre className="text-sm text-gray-600 mt-1 overflow-x-auto">
                        {JSON.stringify(action.config, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>Created: {new Date(chain.created_at).toLocaleString()}</p>
                <p>Updated: {new Date(chain.updated_at).toLocaleString()}</p>
              </div>
            </div>

            {/* Execution History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Execution History</h2>
              
              {executions.length === 0 ? (
                <p className="text-gray-600">No executions yet</p>
              ) : (
                <div className="space-y-3">
                  {executions.map((execution) => (
                    <div key={execution.id} className="border rounded p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(execution.status)}`}>
                          {execution.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(execution.created_at).toLocaleString()}
                        </span>
                      </div>
                      
                      {execution.charged && (
                        <p className="text-sm text-gray-600">
                          Cost: <span className="font-semibold">${execution.cost.toFixed(2)}</span>
                        </p>
                      )}
                      
                      {execution.execution_result && (
                        <details className="mt-2">
                          <summary className="text-sm cursor-pointer text-blue-600">
                            View details
                          </summary>
                          <pre className="text-xs mt-2 p-2 bg-gray-50 rounded overflow-x-auto">
                            {JSON.stringify(execution.execution_result, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="font-semibold mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleExecute}
                  disabled={!chain.is_active}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-300"
                >
                  Execute Now
                </button>
                
                <button
                  onClick={handleToggleActive}
                  className={`w-full py-2 px-4 rounded ${
                    chain.is_active
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {chain.is_active ? 'Deactivate' : 'Activate'}
                </button>
                
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Delete Chain
                </button>
              </div>

              {chain.trigger_type === 'webhook' && (
                <div className="mt-6 p-3 bg-blue-50 rounded">
                  <p className="text-sm font-semibold mb-1">Webhook URL:</p>
                  <code className="text-xs break-all">
                    {process.env.NEXT_PUBLIC_API_URL}/webhooks/{chain.id}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
