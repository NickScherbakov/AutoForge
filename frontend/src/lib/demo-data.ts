// Demo data for GitHub Pages showcase
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const demoUser = {
  id: 1,
  email: 'demo@autoforge.io',
  balance: 25.50,
  created_at: '2024-01-15T10:00:00Z',
};

export const demoChains = [
  {
    id: 1,
    name: 'Daily Report Email',
    description: 'Send a daily summary email with system metrics',
    trigger_type: 'schedule',
    trigger_config: {
      schedule_type: 'daily',
      time: '09:00',
    },
    actions: [
      {
        type: 'send_email',
        config: {
          to: 'team@company.com',
          subject: 'Daily Report',
          body: 'Your daily metrics report...',
        },
      },
    ],
    is_active: true,
    execution_cost: 0.10,
    created_at: '2024-01-20T14:30:00Z',
  },
  {
    id: 2,
    name: 'Webhook to Telegram',
    description: 'Forward webhook notifications to Telegram',
    trigger_type: 'webhook',
    trigger_config: {
      webhook_url: 'https://autoforge.io/webhooks/abc123',
    },
    actions: [
      {
        type: 'telegram_message',
        config: {
          chat_id: '123456789',
          text: 'New webhook received: {{trigger.data}}',
        },
      },
    ],
    is_active: true,
    execution_cost: 0.05,
    created_at: '2024-02-01T09:15:00Z',
  },
  {
    id: 3,
    name: 'API Status Monitor',
    description: 'Check API health and send alerts',
    trigger_type: 'schedule',
    trigger_config: {
      schedule_type: 'hourly',
    },
    actions: [
      {
        type: 'http_request',
        config: {
          method: 'GET',
          url: 'https://api.example.com/health',
        },
      },
      {
        type: 'send_email',
        config: {
          to: 'alerts@company.com',
          subject: 'API Status Update',
          body: 'API health check result: {{action.0.response}}',
        },
      },
    ],
    is_active: true,
    execution_cost: 0.15,
    created_at: '2024-02-10T16:45:00Z',
  },
  {
    id: 4,
    name: 'Customer Onboarding',
    description: 'Send welcome email to new customers',
    trigger_type: 'manual',
    trigger_config: {},
    actions: [
      {
        type: 'send_email',
        config: {
          to: '{{trigger.customer_email}}',
          subject: 'Welcome to Our Service!',
          body: 'Thank you for signing up...',
        },
      },
      {
        type: 'http_request',
        config: {
          method: 'POST',
          url: 'https://crm.example.com/api/customers',
          body: '{{trigger.customer_data}}',
        },
      },
    ],
    is_active: false,
    execution_cost: 0.20,
    created_at: '2024-02-15T11:20:00Z',
  },
];

export const demoExecutions = [
  {
    id: 101,
    chain_id: 1,
    status: 'success',
    trigger_data: { scheduled_time: '2024-02-20T09:00:00Z' },
    result: { email_sent: true, message_id: 'msg_abc123' },
    cost: 0.10,
    started_at: '2024-02-20T09:00:01Z',
    completed_at: '2024-02-20T09:00:03Z',
  },
  {
    id: 102,
    chain_id: 2,
    status: 'success',
    trigger_data: { source: 'external_api', event: 'user_signup' },
    result: { telegram_sent: true, message_id: 12345 },
    cost: 0.05,
    started_at: '2024-02-20T10:15:22Z',
    completed_at: '2024-02-20T10:15:24Z',
  },
  {
    id: 103,
    chain_id: 3,
    status: 'success',
    trigger_data: { scheduled_time: '2024-02-20T11:00:00Z' },
    result: { 
      http_status: 200,
      email_sent: true,
    },
    cost: 0.15,
    started_at: '2024-02-20T11:00:01Z',
    completed_at: '2024-02-20T11:00:04Z',
  },
  {
    id: 104,
    chain_id: 1,
    status: 'failed',
    trigger_data: { scheduled_time: '2024-02-19T09:00:00Z' },
    result: { error: 'SMTP connection timeout' },
    cost: 0.00,
    started_at: '2024-02-19T09:00:01Z',
    completed_at: '2024-02-19T09:00:15Z',
  },
  {
    id: 105,
    chain_id: 2,
    status: 'success',
    trigger_data: { source: 'payment_gateway', event: 'payment_received' },
    result: { telegram_sent: true, message_id: 12346 },
    cost: 0.05,
    started_at: '2024-02-20T14:30:10Z',
    completed_at: '2024-02-20T14:30:12Z',
  },
];

export const demoTransactions = [
  {
    id: 201,
    type: 'deposit',
    amount: 50.00,
    description: 'Deposit via Stripe',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 202,
    type: 'debit',
    amount: -0.10,
    description: 'Chain execution: Daily Report Email',
    created_at: '2024-02-20T09:00:03Z',
  },
  {
    id: 203,
    type: 'debit',
    amount: -0.05,
    description: 'Chain execution: Webhook to Telegram',
    created_at: '2024-02-20T10:15:24Z',
  },
  {
    id: 204,
    type: 'debit',
    amount: -0.15,
    description: 'Chain execution: API Status Monitor',
    created_at: '2024-02-20T11:00:04Z',
  },
  {
    id: 205,
    type: 'debit',
    amount: -0.05,
    description: 'Chain execution: Webhook to Telegram',
    created_at: '2024-02-20T14:30:12Z',
  },
  {
    id: 206,
    type: 'deposit',
    amount: 25.00,
    description: 'Deposit via Stripe',
    created_at: '2024-02-18T15:00:00Z',
  },
];

// Helper to get mock executions for a specific chain
export function getDemoExecutionsForChain(chainId: number) {
  return demoExecutions.filter(ex => ex.chain_id === chainId);
}

// Helper to get a specific chain
export function getDemoChain(chainId: number) {
  return demoChains.find(chain => chain.id === chainId);
}
