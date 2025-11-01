# AutoForge - Ready-to-Use Workflow Examples

This guide provides copy-paste workflow configurations you can use immediately with AutoForge.

## 📋 Table of Contents

1. [Quick Start Templates](#quick-start-templates)
2. [E-commerce Workflows](#e-commerce-workflows)
3. [Marketing Automation](#marketing-automation)
4. [Developer Operations](#developer-operations)
5. [Business Operations](#business-operations)
6. [Personal Productivity](#personal-productivity)
7. [Integration Patterns](#integration-patterns)

---

## Quick Start Templates

### Example 1: Daily Summary Email

**What it does**: Sends you a daily summary email every morning.

**Configuration**:
```json
{
  "name": "Daily Summary Email",
  "description": "Morning digest of important information",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "0 8 * * *",
      "timezone": "America/New_York"
    }
  },
  "actions": [
    {
      "type": "send_email",
      "config": {
        "to": "you@example.com",
        "subject": "Daily Summary - {{date}}",
        "body": "Good morning! Here's your daily summary:\n\n- Tasks for today\n- Calendar events\n- Weather forecast\n\nHave a productive day!"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.05
}
```

**Setup Steps**:
1. Create new workflow
2. Set trigger type: Schedule
3. Enter cron: `0 8 * * *`
4. Add action: Send Email
5. Configure your email
6. Activate workflow

**Cost**: $0.05/day = $1.50/month

---

### Example 2: Webhook to Telegram Alert

**What it does**: Forwards any webhook notification to Telegram instantly.

**Configuration**:
```json
{
  "name": "Webhook to Telegram",
  "description": "Forward webhook events to Telegram",
  "trigger": {
    "type": "webhook",
    "config": {}
  },
  "actions": [
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "YOUR_CHAT_ID",
        "text": "🔔 New Event Received!\n\nTimestamp: {{timestamp}}\nData: {{webhook_data}}"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.05
}
```

**Webhook URL**: `https://your-autoforge.com/webhooks/{chain_id}`

**Testing**:
```bash
curl -X POST https://your-autoforge.com/webhooks/{chain_id} \
  -H "Content-Type: application/json" \
  -d '{"message": "Test notification"}'
```

**Cost**: $0.05 per webhook received

---

### Example 3: Manual Button - Send Report

**What it does**: Generate and email a report when you click a button.

**Configuration**:
```json
{
  "name": "Generate Weekly Report",
  "description": "Click to generate and email weekly report",
  "trigger": {
    "type": "manual",
    "config": {}
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-api.com/reports/generate",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        },
        "body": {
          "report_type": "weekly",
          "format": "pdf"
        }
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "team@company.com",
        "subject": "Weekly Report - {{date}}",
        "body": "The weekly report has been generated and is attached.\n\nReport generated at: {{timestamp}}"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.15
}
```

**Cost**: $0.15 per execution (on-demand)

---

## E-commerce Workflows

### Example 4: New Order Notification

**What it does**: Notifies your team immediately when an order is placed.

**Configuration**:
```json
{
  "name": "New Order Alert",
  "description": "Instant notification for new orders",
  "trigger": {
    "type": "webhook",
    "config": {}
  },
  "actions": [
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "YOUR_TEAM_CHAT_ID",
        "text": "🛍️ NEW ORDER RECEIVED!\n\nOrder #: {{order_id}}\nCustomer: {{customer_name}}\nAmount: ${{order_total}}\nItems: {{item_count}}\n\nProcess now: {{order_link}}"
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "orders@company.com",
        "subject": "New Order #{{order_id}}",
        "body": "Order details:\n\nCustomer: {{customer_name}}\nEmail: {{customer_email}}\nAmount: ${{order_total}}\n\nView order: {{order_link}}"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.10
}
```

**Shopify Integration**:
1. Go to Shopify Admin → Settings → Notifications
2. Add webhook for "Order created"
3. Webhook URL: `https://your-autoforge.com/webhooks/{chain_id}`
4. Format: JSON

**Cost**: $0.10 per order

---

### Example 5: Low Stock Alert

**What it does**: Checks inventory daily and alerts when stock is low.

**Configuration**:
```json
{
  "name": "Low Stock Monitor",
  "description": "Daily inventory check with alerts",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "0 9,17 * * *",
      "timezone": "America/New_York"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-inventory-api.com/check-stock",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        }
      }
    },
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "YOUR_CHAT_ID",
        "text": "⚠️ LOW STOCK ALERT\n\nProducts below threshold:\n{{low_stock_items}}\n\nReorder soon to avoid stockouts!"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.10
}
```

**Cost**: $0.20/day (2 checks) = $6/month

---

### Example 6: Abandoned Cart Recovery

**What it does**: Sends recovery email 1 hour after cart abandonment.

**Configuration**:
```json
{
  "name": "Abandoned Cart Email",
  "description": "Recover abandoned carts with email",
  "trigger": {
    "type": "webhook",
    "config": {
      "filter": "cart_abandoned"
    }
  },
  "actions": [
    {
      "type": "send_email",
      "config": {
        "to": "{{customer_email}}",
        "subject": "You left something behind! 🛍️",
        "body": "Hi {{customer_name}},\n\nWe noticed you left some items in your cart:\n\n{{cart_items}}\n\nTotal: ${{cart_total}}\n\nComplete your purchase now: {{checkout_link}}\n\nUse code SAVE10 for 10% off (expires in 24h)!"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.10
}
```

**Expected Recovery**: 10-15% of abandoned carts

**ROI Example**:
- 100 abandoned carts/month
- $10 automation cost
- Recover 15 carts × $50 average = $750 revenue
- **Net gain: $740/month**

---

## Marketing Automation

### Example 7: New Subscriber Welcome Series

**What it does**: Sends welcome email immediately when someone subscribes.

**Configuration**:
```json
{
  "name": "Welcome Email",
  "description": "Instant welcome for new subscribers",
  "trigger": {
    "type": "webhook",
    "config": {}
  },
  "actions": [
    {
      "type": "send_email",
      "config": {
        "to": "{{subscriber_email}}",
        "subject": "Welcome to {{company_name}}! 🎉",
        "body": "Hi {{subscriber_name}},\n\nThank you for subscribing! Here's what you can expect:\n\n✅ Weekly tips and insights\n✅ Exclusive offers\n✅ Early access to new features\n\nGet started: {{onboarding_link}}\n\nBest regards,\nThe {{company_name}} Team"
      }
    },
    {
      "type": "http_request",
      "config": {
        "url": "https://your-crm.com/api/contacts",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN",
          "Content-Type": "application/json"
        },
        "body": {
          "email": "{{subscriber_email}}",
          "name": "{{subscriber_name}}",
          "tags": ["new_subscriber", "welcome_sent"]
        }
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.15
}
```

**Cost**: $0.15 per new subscriber

---

### Example 8: Social Media Monitoring

**What it does**: Monitors brand mentions and sends alerts for negative sentiment.

**Configuration**:
```json
{
  "name": "Brand Mention Alert",
  "description": "Monitor social media mentions",
  "trigger": {
    "type": "webhook",
    "config": {}
  },
  "actions": [
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "YOUR_CHAT_ID",
        "text": "📢 Brand Mention Detected\n\nPlatform: {{platform}}\nUser: {{username}}\nSentiment: {{sentiment}}\nMessage: {{message}}\n\nRespond: {{link}}"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.05
}
```

**Setup with Social Monitoring Tool**:
1. Configure tool (Mention, Brand24, etc.)
2. Set webhook to AutoForge
3. Filter for your brand keywords
4. Get instant alerts

**Cost**: $0.05 per mention

---

### Example 9: Lead Score Notification

**What it does**: Alerts sales team when a hot lead is identified.

**Configuration**:
```json
{
  "name": "Hot Lead Alert",
  "description": "Notify sales of high-value leads",
  "trigger": {
    "type": "webhook",
    "config": {
      "filter": "lead_score > 80"
    }
  },
  "actions": [
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "SALES_TEAM_CHAT_ID",
        "text": "🔥 HOT LEAD ALERT!\n\nScore: {{lead_score}}/100\n\nContact:\n- Name: {{name}}\n- Company: {{company}}\n- Email: {{email}}\n- Phone: {{phone}}\n\nInterest: {{interest_area}}\nBudget: {{budget}}\n\nContact immediately: {{crm_link}}"
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "{{assigned_sales_rep}}",
        "subject": "Hot Lead: {{company}} - Score {{lead_score}}",
        "body": "A high-value lead requires immediate attention.\n\nSee details in CRM: {{crm_link}}\n\nFollow up within 1 hour for best results."
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.15
}
```

**Impact**: 5-10x increase in lead response time

---

## Developer Operations

### Example 10: API Uptime Monitor

**What it does**: Checks API health every 5 minutes, alerts if down.

**Configuration**:
```json
{
  "name": "API Health Check",
  "description": "Monitor API uptime and performance",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "*/5 * * * *",
      "timezone": "UTC"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-api.com/health",
        "method": "GET",
        "timeout": 5
      }
    },
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "ONCALL_CHAT_ID",
        "text": "🚨 API DOWN!\n\nEndpoint: {{api_url}}\nStatus: {{status_code}}\nError: {{error_message}}\nTime: {{timestamp}}\n\nInvestigate immediately!",
        "send_if": "status_code != 200"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.05
}
```

**Cost**: 288 checks/day × $0.05 = $14.40/day = $432/month

**Alternative**: UptimeRobot Pro = $84/month (but less customization)

---

### Example 11: Deployment Notification

**What it does**: Announces successful deployments to the team.

**Configuration**:
```json
{
  "name": "Deployment Notification",
  "description": "Notify team of deployments",
  "trigger": {
    "type": "webhook",
    "config": {}
  },
  "actions": [
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "DEV_TEAM_CHAT_ID",
        "text": "🚀 DEPLOYMENT SUCCESSFUL\n\nEnvironment: {{environment}}\nVersion: {{version}}\nCommit: {{commit_hash}}\nBy: {{deployed_by}}\nTime: {{timestamp}}\n\nChangelog: {{changelog_link}}"
      }
    },
    {
      "type": "http_request",
      "config": {
        "url": "https://status-page.com/api/deployments",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        },
        "body": {
          "version": "{{version}}",
          "status": "deployed",
          "timestamp": "{{timestamp}}"
        }
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.10
}
```

**Integration with CI/CD**:
```yaml
# GitHub Actions example
- name: Notify AutoForge
  run: |
    curl -X POST https://autoforge.com/webhooks/{chain_id} \
      -H "Content-Type: application/json" \
      -d '{
        "environment": "production",
        "version": "${{ github.ref }}",
        "commit_hash": "${{ github.sha }}",
        "deployed_by": "${{ github.actor }}"
      }'
```

---

### Example 12: Error Log Monitor

**What it does**: Watches error logs and alerts on spikes.

**Configuration**:
```json
{
  "name": "Error Spike Alert",
  "description": "Monitor error rate and alert",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "*/10 * * * *",
      "timezone": "UTC"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-logging-api.com/errors/count",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        }
      }
    },
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "ONCALL_CHAT_ID",
        "text": "⚠️ ERROR SPIKE DETECTED\n\nErrors in last 10 min: {{error_count}}\nThreshold: {{threshold}}\nIncrease: {{percentage}}%\n\nTop errors:\n{{top_errors}}\n\nCheck logs: {{logs_link}}",
        "send_if": "error_count > threshold"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.10
}
```

**Cost**: $0.10 per check × 144 checks/day = $14.40/day = $432/month

---

## Business Operations

### Example 13: Invoice Payment Reminder

**What it does**: Sends polite reminders for overdue invoices.

**Configuration**:
```json
{
  "name": "Payment Reminder",
  "description": "Automated invoice reminders",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "0 10 * * *",
      "timezone": "America/New_York"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-accounting-api.com/invoices/overdue",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        }
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "{{client_email}}",
        "subject": "Friendly Reminder: Invoice {{invoice_number}}",
        "body": "Hi {{client_name}},\n\nThis is a friendly reminder that invoice {{invoice_number}} for ${{amount}} was due on {{due_date}}.\n\nIf you've already sent payment, please disregard this message.\n\nPay now: {{payment_link}}\n\nQuestions? Reply to this email.\n\nThank you!"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.15
}
```

**Cost**: $0.15/day = $4.50/month

**Benefit**: Get paid faster without awkward conversations

---

### Example 14: Meeting Reminder

**What it does**: Sends meeting reminders 24 hours in advance.

**Configuration**:
```json
{
  "name": "Meeting Reminder",
  "description": "24-hour meeting reminder",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "0 9 * * *",
      "timezone": "America/New_York"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-calendar-api.com/meetings/tomorrow",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        }
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "{{attendee_email}}",
        "subject": "Reminder: Meeting Tomorrow - {{meeting_title}}",
        "body": "Hi {{attendee_name}},\n\nReminder: We have a meeting tomorrow.\n\nTitle: {{meeting_title}}\nTime: {{meeting_time}}\nDuration: {{duration}}\nLocation: {{location}}\n\nJoin link: {{meeting_link}}\n\nPreparation: {{agenda}}\n\nSee you then!"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.10
}
```

**Result**: Reduce no-shows by 50%+

---

### Example 15: Expense Report Automation

**What it does**: Processes submitted expense reports and notifies approvers.

**Configuration**:
```json
{
  "name": "Expense Report Processor",
  "description": "Automate expense approval workflow",
  "trigger": {
    "type": "webhook",
    "config": {}
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-accounting-system.com/api/expenses",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        },
        "body": {
          "employee_id": "{{employee_id}}",
          "amount": "{{amount}}",
          "category": "{{category}}",
          "receipt_url": "{{receipt_url}}"
        }
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "{{approver_email}}",
        "subject": "Expense Report Pending: {{employee_name}} - ${{amount}}",
        "body": "New expense report submitted:\n\nEmployee: {{employee_name}}\nAmount: ${{amount}}\nCategory: {{category}}\nDate: {{expense_date}}\nDescription: {{description}}\n\nView receipt: {{receipt_url}}\n\nApprove or reject: {{approval_link}}"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.15
}
```

**Efficiency**: Process reports 10x faster

---

## Personal Productivity

### Example 16: Daily Weather Report

**What it does**: Sends weather forecast every morning.

**Configuration**:
```json
{
  "name": "Morning Weather",
  "description": "Daily weather forecast email",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "0 7 * * *",
      "timezone": "America/New_York"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://api.openweathermap.org/data/2.5/weather?q={{city}}&appid={{api_key}}",
        "method": "GET"
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "you@example.com",
        "subject": "Today's Weather: {{condition}}",
        "body": "Good morning!\n\nToday's weather in {{city}}:\n\nCondition: {{condition}}\nTemperature: {{temp}}°F\nFeels like: {{feels_like}}°F\nHumidity: {{humidity}}%\nWind: {{wind_speed}} mph\n\nRecommendation: {{clothing_suggestion}}\n\nHave a great day!"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.05
}
```

**Cost**: $0.05/day = $1.50/month

---

### Example 17: Birthday Reminder

**What it does**: Reminds you of upcoming birthdays.

**Configuration**:
```json
{
  "name": "Birthday Reminder",
  "description": "Never forget a birthday",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "0 8 * * *",
      "timezone": "America/New_York"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-contacts-api.com/birthdays/upcoming",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        }
      }
    },
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "YOUR_CHAT_ID",
        "text": "🎂 Birthday Reminders\n\nToday: {{birthdays_today}}\nTomorrow: {{birthdays_tomorrow}}\nThis week: {{birthdays_week}}\n\nDon't forget to send wishes!"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.05
}
```

**Cost**: $0.05/day = $1.50/month

**Value**: Never miss another birthday!

---

### Example 18: Savings Goal Tracker

**What it does**: Tracks your savings progress weekly.

**Configuration**:
```json
{
  "name": "Savings Progress",
  "description": "Weekly savings goal update",
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "0 9 * * 1",
      "timezone": "America/New_York"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://your-bank-api.com/account/balance",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer YOUR_TOKEN"
        }
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "you@example.com",
        "subject": "Weekly Savings Update 💰",
        "body": "Hi there!\n\nYour savings progress:\n\nCurrent balance: ${{balance}}\nGoal: ${{goal}}\nProgress: {{percentage}}%\nRemaining: ${{remaining}}\n\nLast week change: {{weekly_change}}\n\nKeep it up! You're {{weeks_remaining}} weeks from your goal.\n\nTip: {{savings_tip}}"
      }
    }
  ],
  "is_active": true,
  "cost_per_execution": 0.10
}
```

**Cost**: $0.10/week = $0.40/month

---

## Integration Patterns

### Pattern 1: Webhook + Multiple Actions

Chain multiple actions from a single webhook:

```json
{
  "trigger": {
    "type": "webhook"
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://api1.com/process"
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "team@company.com"
      }
    },
    {
      "type": "telegram_message",
      "config": {
        "chat_id": "YOUR_CHAT_ID"
      }
    }
  ]
}
```

**Use for**: Processing events with multiple notification channels

---

### Pattern 2: Scheduled Data Sync

Sync data between systems on a schedule:

```json
{
  "trigger": {
    "type": "schedule",
    "config": {
      "cron": "0 */4 * * *"
    }
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://source-system.com/api/data",
        "method": "GET"
      }
    },
    {
      "type": "http_request",
      "config": {
        "url": "https://destination-system.com/api/data",
        "method": "POST",
        "body": "{{data_from_previous_action}}"
      }
    }
  ]
}
```

**Use for**: Keeping systems in sync without custom code

---

### Pattern 3: Manual Trigger for Reports

Generate reports on-demand:

```json
{
  "trigger": {
    "type": "manual"
  },
  "actions": [
    {
      "type": "http_request",
      "config": {
        "url": "https://analytics-api.com/report",
        "method": "POST"
      }
    },
    {
      "type": "send_email",
      "config": {
        "to": "stakeholders@company.com",
        "subject": "Report: {{report_name}}",
        "body": "Report generated at {{timestamp}}\n\nDownload: {{report_link}}"
      }
    }
  ]
}
```

**Use for**: Ad-hoc reporting without accessing multiple systems

---

## 🔧 Customization Tips

### Using Variables

AutoForge supports template variables in actions:
- `{{timestamp}}` - Current timestamp
- `{{date}}` - Current date
- `{{webhook_data}}` - Data from webhook trigger
- `{{previous_action_response}}` - Response from previous action
- Custom variables from your API responses

### Example with Variables:
```json
{
  "type": "send_email",
  "config": {
    "to": "{{customer_email}}",
    "subject": "Order {{order_id}} Update",
    "body": "Hi {{customer_name}},\n\nYour order {{order_id}} status: {{status}}\n\nTracking: {{tracking_number}}"
  }
}
```

---

## 📊 Testing Your Workflows

### Test Workflow Before Activation

1. **Create workflow** with all configurations
2. **Use manual trigger** for testing
3. **Execute once** to verify
4. **Check execution log** for results
5. **Adjust configuration** if needed
6. **Activate** when working correctly

### Test Checklist:
- [ ] Trigger fires correctly
- [ ] Actions execute in order
- [ ] Variables are replaced properly
- [ ] Error handling works
- [ ] Notifications are received
- [ ] Cost is as expected

---

## 🎯 Next Steps

### Start with Simple Workflows
1. Pick one example from this guide
2. Modify for your specific needs
3. Test thoroughly
4. Activate and monitor
5. Iterate based on results

### Build More Complex Workflows
Once comfortable:
- Combine multiple examples
- Add custom API integrations
- Create workflow sequences
- Build your automation library

### Share Your Workflows
Have a great workflow? Share it:
- Open PR to add to this file
- Post in GitHub Discussions
- Help the community

---

## 📞 Need Help?

- **Documentation**: [README.md](README.md), [SETUP.md](SETUP.md)
- **Use Cases**: [USE_CASES.md](USE_CASES.md)
- **Demo**: [Try AutoForge Demo](https://nickscherbakov.github.io/AutoForge/)
- **Community**: [GitHub Discussions](https://github.com/NickScherbakov/AutoForge/discussions)
- **Issues**: [Report Bugs](https://github.com/NickScherbakov/AutoForge/issues)

---

*These examples are templates. Customize them for your specific needs!*
