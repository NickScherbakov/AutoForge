import { useState } from 'react';
import { useRouter } from 'next/router';
import { chainAPI } from '@/lib/api';

export default function NewChain() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [triggerType, setTriggerType] = useState('manual');
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addAction = (type: string) => {
    const newAction = {
      type,
      config: type === 'http_request' ? { method: 'GET', url: '' } :
             type === 'send_email' ? { to: '', subject: '', body: '' } :
             { chat_id: '', message: '' }
    };
    setActions([...actions, newAction]);
  };

  const updateAction = (index: number, field: string, value: any) => {
    const newActions = [...actions];
    newActions[index].config[field] = value;
    setActions(newActions);
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || actions.length === 0) {
      setError('Name and at least one action are required');
      return;
    }

    setLoading(true);

    try {
      await chainAPI.create({
        name,
        description,
        trigger_type: triggerType,
        trigger_config: {},
        actions,
        execution_cost: 0.10
      });

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create chain');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold mb-6">Create New Workflow</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Workflow Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>

            {/* Trigger */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Trigger Type
              </label>
              <select
                value={triggerType}
                onChange={(e) => setTriggerType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="manual">Manual</option>
                <option value="webhook">Webhook</option>
                <option value="schedule">Schedule</option>
              </select>
            </div>

            {/* Actions */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-gray-700 text-sm font-bold">
                  Actions
                </label>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => addAction('http_request')}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    + HTTP Request
                  </button>
                  <button
                    type="button"
                    onClick={() => addAction('send_email')}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    + Send Email
                  </button>
                  <button
                    type="button"
                    onClick={() => addAction('telegram_message')}
                    className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
                  >
                    + Telegram
                  </button>
                </div>
              </div>

              {actions.map((action, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{action.type}</h4>
                    <button
                      type="button"
                      onClick={() => removeAction(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>

                  {action.type === 'http_request' && (
                    <>
                      <div className="mb-2">
                        <label className="block text-sm mb-1">Method</label>
                        <select
                          value={action.config.method}
                          onChange={(e) => updateAction(index, 'method', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option>GET</option>
                          <option>POST</option>
                          <option>PUT</option>
                          <option>DELETE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">URL</label>
                        <input
                          type="url"
                          value={action.config.url}
                          onChange={(e) => updateAction(index, 'url', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                          placeholder="https://api.example.com/endpoint"
                        />
                      </div>
                    </>
                  )}

                  {action.type === 'send_email' && (
                    <>
                      <div className="mb-2">
                        <label className="block text-sm mb-1">To</label>
                        <input
                          type="email"
                          value={action.config.to}
                          onChange={(e) => updateAction(index, 'to', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm mb-1">Subject</label>
                        <input
                          type="text"
                          value={action.config.subject}
                          onChange={(e) => updateAction(index, 'subject', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Body</label>
                        <textarea
                          value={action.config.body}
                          onChange={(e) => updateAction(index, 'body', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {action.type === 'telegram_message' && (
                    <>
                      <div className="mb-2">
                        <label className="block text-sm mb-1">Chat ID</label>
                        <input
                          type="text"
                          value={action.config.chat_id}
                          onChange={(e) => updateAction(index, 'chat_id', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Message</label>
                        <textarea
                          value={action.config.message}
                          onChange={(e) => updateAction(index, 'message', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}

              {actions.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No actions yet. Add an action using the buttons above.
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? 'Creating...' : 'Create Workflow'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
