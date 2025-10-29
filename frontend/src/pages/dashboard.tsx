import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { chainAPI, userAPI } from '@/lib/api';

interface Chain {
  id: number;
  name: string;
  description: string;
  trigger_type: string;
  is_active: boolean;
  execution_cost: number;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [chains, setChains] = useState<Chain[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [chainsRes, userRes] = await Promise.all([
        chainAPI.list(),
        userAPI.getMe()
      ]);
      
      setChains(chainsRes.data);
      setUserData(userRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleExecuteChain = async (chainId: number) => {
    try {
      await chainAPI.execute(chainId);
      alert('Chain execution started!');
      fetchData(); // Refresh data
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to execute chain');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AutoForge</h1>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">{userData?.email}</p>
              <p className="text-sm font-semibold">Balance: ${userData?.balance?.toFixed(2) || '0.00'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Your Workflows</h2>
          <Link
            href="/chains/new"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Create New Chain
          </Link>
        </div>

        {/* Balance Warning */}
        {userData?.balance < 1 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <p className="font-bold">Low Balance</p>
            <p>Your balance is low. Add funds to ensure your workflows can execute.</p>
            <Link href="/deposit" className="text-blue-600 hover:underline">
              Add Funds
            </Link>
          </div>
        )}

        {/* Chains List */}
        {chains.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't created any workflows yet.</p>
            <Link
              href="/chains/new"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Your First Workflow
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chains.map((chain) => (
              <div key={chain.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{chain.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      chain.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {chain.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{chain.description || 'No description'}</p>

                <div className="text-sm text-gray-500 mb-4">
                  <p>Trigger: <span className="font-semibold">{chain.trigger_type}</span></p>
                  <p>Cost: <span className="font-semibold">${chain.execution_cost.toFixed(2)}</span></p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExecuteChain(chain.id)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    disabled={!chain.is_active}
                  >
                    Execute
                  </button>
                  <Link
                    href={`/chains/${chain.id}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
