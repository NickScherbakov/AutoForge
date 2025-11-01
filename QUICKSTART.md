# AutoForge Quick Start Guide

Get your first automation running in under 10 minutes!

## 🚀 Prerequisites

Choose one:

**Option A: Try the Demo** (No setup needed)
- Visit: https://nickscherbakov.github.io/AutoForge/
- Click "Try Demo" and explore immediately

**Option B: Run Locally** (5 minutes setup)
```bash
git clone https://github.com/NickScherbakov/AutoForge.git
cd AutoForge
docker-compose up --build
```
Then open: http://localhost:3000

---

## 🎯 Your First 3 Automations

### Automation #1: Daily Summary Email (Beginner)

**What you'll build**: A simple email sent every morning at 8 AM.

**Time**: 3 minutes  
**Cost**: $0.05/day = $1.50/month

**Steps**:

1. **Login/Register** at http://localhost:3000
2. **Click "Create New Chain"**
3. **Fill in the form**:
   ```
   Name: Morning Summary
   Description: Daily email to start my day
   Trigger Type: Schedule
   Cron Expression: 0 8 * * *
   Timezone: Your timezone
   ```
4. **Add Action**:
   ```
   Action Type: Send Email
   To: your@email.com
   Subject: Good Morning! Today is {{date}}
   Body: 
   Good morning!
   
   Today's focus:
   - Check project status
   - Follow up with clients
   - Review financials
   
   Have a productive day!
   ```
5. **Set Cost**: 0.05
6. **Click "Create" and Activate**

**Test it**: Click "Execute Now" to test immediately

**Result**: You'll receive an email instantly!

---

### Automation #2: Webhook Alert (Intermediate)

**What you'll build**: Receive Telegram notification when any service sends a webhook.

**Time**: 5 minutes  
**Cost**: $0.05 per notification

**Steps**:

1. **Create Telegram Bot** (one-time setup):
   - Open Telegram, search for @BotFather
   - Send `/newbot` and follow instructions
   - Copy your bot token
   - Get your chat ID: Message your bot, then visit:
     `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Copy the `chat.id` value

2. **Create Workflow**:
   ```
   Name: Webhook to Telegram
   Description: Forward webhook alerts to Telegram
   Trigger Type: Webhook
   ```

3. **Add Action**:
   ```
   Action Type: Telegram Message
   Chat ID: Your chat ID from step 1
   Message: 
   🔔 New Alert!
   
   Time: {{timestamp}}
   Data: {{webhook_data}}
   ```

4. **Set Cost**: 0.05
5. **Create and Activate**

6. **Get Your Webhook URL**:
   - After creation, copy the webhook URL shown
   - It looks like: `http://localhost:8000/webhooks/{chain_id}`

**Test it**:
```bash
curl -X POST http://localhost:8000/webhooks/{chain_id} \
  -H "Content-Type: application/json" \
  -d '{"message": "Test from terminal!"}'
```

**Result**: You'll receive a Telegram message instantly!

**Use this for**:
- GitHub webhook notifications
- Shopify order alerts
- Form submission notifications
- Any service that supports webhooks

---

### Automation #3: API Health Monitor (Advanced)

**What you'll build**: Check if your website/API is up every 5 minutes.

**Time**: 5 minutes  
**Cost**: $0.05 per check × 288 checks/day = $14.40/day

**Steps**:

1. **Create Workflow**:
   ```
   Name: API Health Check
   Description: Monitor uptime every 5 minutes
   Trigger Type: Schedule
   Cron Expression: */5 * * * *
   Timezone: UTC
   ```

2. **Add First Action** (Check API):
   ```
   Action Type: HTTP Request
   URL: https://your-api.com/health
   Method: GET
   Headers: (if needed)
     Authorization: Bearer YOUR_TOKEN
   ```

3. **Add Second Action** (Alert if Down):
   ```
   Action Type: Telegram Message
   Chat ID: Your chat ID
   Message:
   🚨 API DOWN!
   
   URL: https://your-api.com/health
   Time: {{timestamp}}
   Status: {{status_code}}
   
   Check it now!
   ```

4. **Set Cost**: 0.05
5. **Create and Activate**

**Result**: You'll be alerted within 5 minutes if your API goes down!

**Note**: This costs ~$432/month for 24/7 monitoring. For lighter monitoring:
- Every 15 minutes: `*/15 * * * *` = $144/month
- Every hour: `0 * * * *` = $36/month
- Business hours only: `0 9-17 * * 1-5` = $6/month

---

## 🎓 What You've Learned

✅ **Schedule Trigger**: Run workflows at specific times  
✅ **Webhook Trigger**: React to external events  
✅ **Multiple Actions**: Chain actions together  
✅ **Email Actions**: Send notifications  
✅ **Telegram Actions**: Instant messaging alerts  
✅ **HTTP Actions**: Call any API  

---

## 🔥 Popular Next Automations

### For Freelancers

**Weekly Client Updates**
```
Trigger: Schedule (Friday 4 PM)
Action: Email client with project status
Cost: $0.10/week = $0.40/month
```

**Invoice Reminders**
```
Trigger: Schedule (Daily check)
Action: Email reminder for overdue invoices
Cost: $0.15/day = $4.50/month
```

### For E-commerce

**New Order Alerts**
```
Trigger: Webhook (from Shopify/WooCommerce)
Actions: Telegram to team + Email receipt
Cost: $0.10 per order
```

**Abandoned Cart Recovery**
```
Trigger: Webhook (cart abandoned 1 hour)
Action: Email with discount code
Cost: $0.10 per cart
```

### For Developers

**Deploy Notifications**
```
Trigger: Webhook (from CI/CD)
Action: Telegram to dev team
Cost: $0.10 per deployment
```

**Error Spike Alerts**
```
Trigger: Schedule (every 10 min)
Actions: Check logs + Alert if spike
Cost: $14.40/day
```

See **[EXAMPLES.md](EXAMPLES.md)** for full configurations!

---

## 💡 Pro Tips

### Tip 1: Test with Manual Trigger First
- Create workflow with any trigger type
- Use "Execute Now" button to test
- Verify actions work correctly
- Then switch to webhook/schedule trigger

### Tip 2: Start with Low-Cost Actions
- Email: $0.05-$0.10
- Telegram: $0.05
- Simple HTTP: $0.05
- Test thoroughly before scaling up

### Tip 3: Use Variables in Messages
Available variables:
- `{{timestamp}}` - Current time
- `{{date}}` - Current date
- `{{webhook_data}}` - Data from webhook
- `{{status_code}}` - HTTP response code
- Custom variables from API responses

Example:
```
Hi {{customer_name}},
Your order {{order_id}} shipped!
Track it: {{tracking_url}}
```

### Tip 4: Monitor Your Executions
- Check dashboard regularly
- Review execution logs
- Look for failed executions (free!)
- Optimize costs based on usage

### Tip 5: Set Realistic Costs
- Start conservative: $0.05
- Monitor execution success rate
- Increase if workflow is valuable
- Decrease for testing

---

## 🐛 Troubleshooting

### Email Not Sending
1. Check SMTP settings in backend/.env
2. Verify recipient email is correct
3. Check spam folder
4. Look at execution log for errors

### Telegram Not Working
1. Verify bot token is correct
2. Ensure you've messaged the bot first
3. Confirm chat ID is correct (use getUpdates)
4. Check bot has permission to message you

### Webhook Not Triggering
1. Verify webhook URL is correct
2. Check workflow is activated
3. Ensure POST request with JSON body
4. Look for webhook in execution history

### Schedule Not Running
1. Verify cron expression syntax
2. Check Celery beat is running:
   ```bash
   docker-compose ps
   ```
3. Look for scheduled tasks in logs
4. Ensure workflow is activated

---

## 📊 Cost Management

### Understand Your Costs

**Low Cost Workflows** ($0.05-$0.10):
- Simple notifications
- Single action workflows
- Low-value automations

**Medium Cost Workflows** ($0.10-$0.25):
- Multi-action sequences
- Business-critical notifications
- Customer-facing automations

**High Cost Workflows** ($0.25-$0.50):
- Complex multi-step processes
- High-value business automation
- Revenue-generating workflows

### Calculate Monthly Costs

Formula: `Executions per month × Cost per execution`

Examples:
- Daily email (30/month) × $0.05 = $1.50/month
- Order notifications (100/month) × $0.10 = $10/month
- API monitoring (8,640/month) × $0.05 = $432/month

### Optimize Costs

1. **Reduce Frequency**:
   - Every 5 min → Every 15 min = 66% savings
   - 24/7 → Business hours only = 65% savings

2. **Batch Operations**:
   - Check 1 item at a time vs check all items once
   - Single daily summary vs multiple individual emails

3. **Use Manual Triggers**:
   - On-demand reports instead of scheduled
   - Pay only when needed

4. **Monitor Failed Executions**:
   - Failed executions are FREE
   - Fix issues, don't pay for failures

---

## 🎯 Next Steps

### Level Up Your Skills

1. **Explore Examples**:
   - Read [EXAMPLES.md](EXAMPLES.md)
   - Copy-paste configurations
   - Modify for your needs

2. **Learn from Use Cases**:
   - Read [USE_CASES.md](USE_CASES.md)
   - See ROI calculations
   - Find scenarios matching your needs

3. **Compare Platforms**:
   - Read [COMPARISON.md](COMPARISON.md)
   - Understand when AutoForge is best choice
   - Learn about alternatives

4. **Join Community**:
   - [GitHub Discussions](https://github.com/NickScherbakov/AutoForge/discussions)
   - Share your workflows
   - Get help from others
   - Contribute improvements

### Build Your First Real Automation

Choose a task you do manually:
1. Document the steps
2. Identify trigger (time? event? manual?)
3. Map steps to actions
4. Create workflow
5. Test thoroughly
6. Activate and monitor
7. Optimize based on results

### Share Your Success

Built something cool?
1. Share in GitHub Discussions
2. Add to USE_CASES.md (via PR)
3. Help others learn
4. Get featured in documentation

---

## 📚 Quick Reference

### Common Cron Expressions
```
0 8 * * *       - Daily at 8 AM
0 */4 * * *     - Every 4 hours
*/5 * * * *     - Every 5 minutes
0 9-17 * * 1-5  - Business hours (9 AM-5 PM, Mon-Fri)
0 0 * * 0       - Weekly (Sunday midnight)
0 0 1 * *       - Monthly (1st day, midnight)
```

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Create/send data
- **PUT**: Update data
- **DELETE**: Delete data

### Action Types
- **send_email**: Send email via SMTP
- **telegram_message**: Send Telegram message
- **http_request**: Call any API

### Trigger Types
- **schedule**: Time-based (cron)
- **webhook**: Event-based (HTTP POST)
- **manual**: On-demand (button)

---

## ❓ Need Help?

### Resources
- **Documentation**: [README.md](README.md)
- **Full Setup**: [SETUP.md](SETUP.md)
- **API Docs**: http://localhost:8000/docs
- **Demo Guide**: [DEMO_GUIDE.md](DEMO_GUIDE.md)

### Community
- **Questions**: [GitHub Discussions](https://github.com/NickScherbakov/AutoForge/discussions)
- **Bugs**: [GitHub Issues](https://github.com/NickScherbakov/AutoForge/issues)
- **Ideas**: Open a Discussion

### Common Issues
- Check logs: `docker-compose logs -f`
- Restart services: `docker-compose restart`
- Reset: `docker-compose down && docker-compose up`

---

## 🎉 Congratulations!

You've completed the AutoForge Quick Start Guide!

You now know how to:
- ✅ Create scheduled workflows
- ✅ Set up webhook triggers
- ✅ Send email notifications
- ✅ Use Telegram for alerts
- ✅ Monitor APIs
- ✅ Manage costs
- ✅ Troubleshoot issues

**Ready to automate your business?** Start building!

---

**Happy Automating! 🚀**

*Have suggestions for this guide?* [Open an issue](https://github.com/NickScherbakov/AutoForge/issues) or [start a discussion](https://github.com/NickScherbakov/AutoForge/discussions)!
