# Frequently Asked Questions (FAQ)

## General Questions

### What is AutoForge?

AutoForge is a no-code automation platform that lets you create workflows (chains) that run automatically. Unlike traditional platforms, you only pay when workflows successfully execute.

**Key Difference**: Traditional platforms charge $20-$100/month whether you use them or not. AutoForge charges $0.05-$0.50 per successful execution.

---

### Who is AutoForge for?

AutoForge is perfect for:
- **Freelancers** who need client communication automation
- **Small businesses** automating customer operations
- **E-commerce stores** handling orders and notifications
- **Developers** monitoring APIs and systems
- **Marketing teams** managing campaigns and leads
- **Anyone** who wants to save time on repetitive tasks

If you do something repeatedly and it follows the same steps, AutoForge can automate it.

---

### What does "Pay-Per-Successful-Execution" mean?

You only pay when a workflow:
1. Runs completely
2. All actions succeed
3. Produces the expected result

**If a workflow fails**: You pay $0. This includes:
- External service is down
- Invalid configuration
- Network errors
- Any other failure

**Example**: 
- You create a workflow that costs $0.10
- It runs 100 times, 95 succeed, 5 fail
- You pay: 95 × $0.10 = $9.50 (not $10!)

---

### How much does AutoForge cost?

**No monthly fees. No setup costs. No subscriptions.**

You set the cost per execution for each workflow ($0.05-$0.50 typical range).

**Example monthly costs**:
- Light use (30 executions): $1.50-$15
- Medium use (300 executions): $15-$150
- Heavy use (1,000 executions): $50-$500

**For seasonal businesses**: Only pay during active months!

See [USE_CASES.md](USE_CASES.md) for detailed cost breakdowns.

---

### Is AutoForge cheaper than Zapier/Make?

**It depends on your usage**:

**AutoForge is cheaper for**:
- Low volume (<100/month)
- Seasonal businesses
- Variable workloads
- Testing/experimentation

**Traditional platforms may be cheaper for**:
- High, consistent volume (>1,000/month)
- Need pre-built integrations
- Non-technical users

**Key AutoForge advantage**: Failed executions are free, no monthly minimum.

See [COMPARISON.md](COMPARISON.md) for detailed analysis.

---

## Technical Questions

### Do I need to know how to code?

**No coding required for basic workflows.**

You can create workflows using simple forms:
- Choose a trigger (schedule, webhook, manual)
- Add actions (email, HTTP request, Telegram)
- Fill in configuration fields
- Activate and go!

**Some API knowledge helps for**:
- Connecting to third-party services
- Understanding webhook payloads
- Debugging issues

See [QUICKSTART.md](QUICKSTART.md) for beginner-friendly tutorials.

---

### What integrations does AutoForge support?

**AutoForge works with any service that has**:
- **API** (most modern services do)
- **Webhooks** (to trigger workflows)
- **Email** (SMTP)

**Built-in actions**:
- HTTP Request (call any API)
- Send Email (via SMTP)
- Telegram Message (bot integration)

**Common integrations** (via API):
- Shopify, WooCommerce (e-commerce)
- Stripe, PayPal (payments)
- Salesforce, HubSpot (CRM)
- Gmail, Outlook (email)
- Slack (team chat)
- Trello, Asana (project management)
- Google Sheets (spreadsheets)

**How to integrate**:
1. Get API credentials from the service
2. Use HTTP Request action in AutoForge
3. Configure endpoint and authentication

See [EXAMPLES.md](EXAMPLES.md) for integration examples.

---

### How do I set up webhooks?

**Setting up webhooks is easy**:

1. **Create workflow** with webhook trigger
2. **Get webhook URL** (shown after creation):
   ```
   https://your-autoforge.com/webhooks/{chain_id}
   ```
3. **Add URL to external service**:
   - In Shopify: Settings → Notifications → Webhooks
   - In Stripe: Developers → Webhooks → Add endpoint
   - In GitHub: Repo → Settings → Webhooks → Add webhook
4. **Activate workflow**
5. **Test** by triggering event in external service

See [QUICKSTART.md](QUICKSTART.md) for step-by-step tutorial.

---

### Can I test workflows before paying?

**Yes! Multiple ways to test for free**:

1. **Use Manual Trigger**:
   - Create workflow
   - Click "Execute Now"
   - No charge during development

2. **Try the Demo**:
   - Visit https://nickscherbakov.github.io/AutoForge/
   - Explore fully functional demo
   - No registration needed

3. **Check Execution Logs**:
   - Review what happened
   - Fix issues
   - Only pay when it works

**Failed executions = $0 cost**

---

### What happens if a workflow fails?

**You don't pay anything.**

AutoForge only charges for successful executions.

**Workflow fails include**:
- External API is down
- Invalid credentials
- Network timeout
- Bad configuration
- Any error in execution

**You can**:
- View error in execution log
- Fix the issue
- Retry for free (until it works)

**This encourages**:
- Experimentation without risk
- Quality over quantity
- Learning without penalty

---

## Pricing Questions

### How do I add money to my account?

**Via Stripe integration**:

1. Go to Dashboard
2. Click "Deposit Funds"
3. Enter amount
4. Pay with credit card via Stripe
5. Funds appear immediately

**Minimum deposit**: Typically $10 (configurable)

**Your balance** shown in dashboard updates with each execution.

---

### What if I run out of balance?

**Workflows automatically pause** when balance hits $0.

**What happens**:
- Active workflows stop executing
- You receive notification
- No additional charges
- Webhooks return error
- Scheduled tasks skip

**To resume**:
1. Deposit funds
2. Workflows automatically resume
3. No data loss

**Pro tip**: Set up balance alerts to avoid interruption.

---

### Can I get a refund?

**Refund policy depends on your deployment**:

Since AutoForge is open source and can be self-hosted, there's no central billing.

**If using your deployment**:
- You control refunds
- Set your own policies

**If using hosted service**:
- Contact service provider
- Refunds typically for:
  - System errors causing charges
  - Billing mistakes
  - Service outages

**Not refunded**:
- Successful executions (they did run)
- User configuration errors (still executed)

---

### Can I set spending limits?

**Not built into MVP, but you can**:

1. **Monitor balance regularly**
2. **Set low per-execution costs**
3. **Use manual triggers** for expensive workflows
4. **Deactivate workflows** when not needed
5. **Implement external monitoring**:
   - Check balance via API
   - Alert when low
   - Auto-pause workflows

**Coming in Phase 2**:
- Spending limits per workflow
- Daily/monthly caps
- Alert thresholds
- Auto-pause features

---

## Setup & Deployment

### How do I install AutoForge?

**Three options**:

**Option 1: Docker (Easiest)**
```bash
git clone https://github.com/NickScherbakov/AutoForge.git
cd AutoForge
docker-compose up --build
```
Access at http://localhost:3000

**Option 2: Manual Setup**
See [SETUP.md](SETUP.md) for detailed instructions.

**Option 3: Cloud Deployment**
Deploy to Railway, Render, or any VPS.

**Time**: 5-15 minutes depending on method.

---

### What are the system requirements?

**For Docker**:
- Docker 20.10+
- Docker Compose 2.0+
- 2GB RAM minimum
- 5GB disk space
- Linux, macOS, or Windows

**For Manual Setup**:
- Python 3.9+
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

**For Production**:
- 4GB RAM recommended
- 20GB disk space
- SSL certificate
- Domain name

---

### Can I host AutoForge myself?

**Yes! AutoForge is open source.**

**Benefits of self-hosting**:
- ✅ Full control of data
- ✅ No external dependencies
- ✅ Customize as needed
- ✅ No usage fees to third party
- ✅ Meet compliance requirements

**You'll need**:
- Server (VPS, cloud, or on-premise)
- Basic DevOps knowledge
- Maintenance responsibility

**Cost of self-hosting**:
- Server: $5-$50/month
- Database: Included or $10-$20/month
- Redis: Included or $5-$15/month
- Domain: ~$12/year
- SSL: Free (Let's Encrypt)

**Total**: $10-$100/month (no per-execution fees!)

---

### Is AutoForge secure?

**Security measures**:
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Environment variables for secrets
- ✅ CORS protection
- ✅ SQL injection protection (ORM)
- ✅ HTTPS ready
- ✅ Rate limiting ready

**Data security**:
- You control where data is stored
- Self-host for maximum security
- No third-party data sharing
- Open source (audit the code)

**Best practices**:
- Use strong SECRET_KEY
- Enable HTTPS in production
- Limit CORS origins
- Regular backups
- Keep dependencies updated

See [SETUP.md](SETUP.md) for security configuration.

---

## Workflow Questions

### What is a workflow (chain)?

**A workflow is an automation that**:
1. **Trigger**: Starts from an event
2. **Actions**: Performs one or more tasks
3. **Cost**: Has a defined cost per execution

**Example workflow**:
```
Trigger: New order (webhook)
Actions:
  1. Send confirmation email
  2. Notify team via Telegram
  3. Update inventory system
Cost: $0.20 per order
```

**Workflows can**:
- Run on schedule (time-based)
- React to webhooks (event-based)
- Be triggered manually (button)

---

### How many actions can a workflow have?

**MVP**: No hard limit, but practical limit ~5-10 actions.

**Considerations**:
- More actions = longer execution time
- Each action is a potential failure point
- Cost should reflect complexity

**Best practice**:
- Keep workflows focused
- Create multiple simple workflows
- Rather than one complex workflow

**Coming in Phase 2**:
- Conditional logic
- Branching
- Loops
- Better handling of complex workflows

---

### Can workflows run in parallel?

**Yes! AutoForge uses Celery** for background processing.

**Benefits**:
- Multiple workflows run simultaneously
- No blocking or queuing
- Scales with more workers
- Independent execution

**Example**:
- 10 orders arrive at once
- All 10 workflows start immediately
- Each completes independently
- All charged only if successful

---

### Can I schedule workflows?

**Yes, using cron expressions.**

**Common schedules**:
- Every day at 8 AM: `0 8 * * *`
- Every hour: `0 * * * *`
- Every 5 minutes: `*/5 * * * *`
- Business hours: `0 9-17 * * 1-5`
- Weekly: `0 0 * * 0` (Sunday)
- Monthly: `0 0 1 * *` (1st of month)

**Cron helper**: Use https://crontab.guru to build expressions.

See [QUICKSTART.md](QUICKSTART.md) for cron reference.

---

### How do I debug failed workflows?

**Check execution log**:

1. Go to Dashboard
2. Click workflow
3. View "Execution History"
4. Expand failed execution
5. Read error message

**Common issues**:
- **Invalid API credentials**: Check API keys
- **Timeout**: Increase timeout or check service
- **Bad request**: Verify request format
- **Network error**: Check service is up
- **Configuration error**: Review workflow settings

**Testing tips**:
- Use manual trigger for testing
- Test with small data first
- Check external service status
- Review API documentation
- Look at successful vs failed patterns

See [QUICKSTART.md](QUICKSTART.md) for troubleshooting guide.

---

## Comparison Questions

### AutoForge vs Zapier?

**Choose AutoForge if**:
- Want pay-per-success pricing
- Have variable/seasonal usage
- Comfortable with APIs
- Want to self-host
- Cost-conscious

**Choose Zapier if**:
- Need 5,000+ pre-built integrations
- Non-technical team
- Want managed service
- Need extensive tutorials
- High consistent volume

See [COMPARISON.md](COMPARISON.md) for detailed analysis.

---

### AutoForge vs Make (Integromat)?

**Choose AutoForge if**:
- Want pay-per-success pricing
- Prefer simple form-based editor
- Want to self-host
- Variable usage patterns

**Choose Make if**:
- Need visual drag-and-drop editor
- Complex data transformations
- Want affordable pre-built integrations
- Team collaboration features

See [COMPARISON.md](COMPARISON.md) for cost scenarios.

---

### AutoForge vs n8n?

**Similarities**:
- Both open source
- Both self-hostable
- Both use APIs
- Both support webhooks

**AutoForge advantages**:
- Pay-per-success pricing
- Simpler deployment
- Lower operational overhead

**n8n advantages**:
- Visual workflow editor
- 300+ pre-built integrations
- More mature project

**Decision**: 
- **AutoForge** for cost optimization
- **n8n** for visual workflows

See [COMPARISON.md](COMPARISON.md) for hybrid approaches.

---

## Advanced Questions

### Can I use AutoForge for commercial projects?

**Yes! MIT License allows**:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

**You can**:
- Build services on AutoForge
- Offer automation to clients
- White-label the platform
- Charge for hosted service

**Requirements**:
- Include MIT license
- Retain copyright notices

See [LICENSE](LICENSE) file for full terms.

---

### Can I contribute to AutoForge?

**Absolutely! Contributions welcome.**

**Ways to contribute**:
1. **Share use cases**: Add to [USE_CASES.md](USE_CASES.md)
2. **Create examples**: Add to [EXAMPLES.md](EXAMPLES.md)
3. **Improve docs**: Fix typos, clarify instructions
4. **Report bugs**: Open GitHub issue
5. **Suggest features**: Start discussion
6. **Submit code**: Open pull request

**Get featured**:
- Best contributions highlighted in README
- Showcased on demo site
- Credited in release notes

See Contributing section in [README.md](README.md).

---

### What's on the roadmap?

**Phase 2: Enhanced Features**
- Drag-and-drop visual editor
- More action types (Slack, Discord, DB)
- Conditional logic and branching
- Workflow templates library

**Phase 3: Scale & Polish**
- Team collaboration
- Advanced analytics
- Rate limiting
- Workflow versioning

**Phase 4: Enterprise**
- SSO authentication
- Advanced security
- White-label options
- Custom actions

See full roadmap in [README.md](README.md).

---

### How can I get help?

**Resources**:
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- **Setup Guide**: [SETUP.md](SETUP.md)
- **Use Cases**: [USE_CASES.md](USE_CASES.md)
- **Examples**: [EXAMPLES.md](EXAMPLES.md)
- **API Docs**: http://localhost:8000/docs

**Community**:
- **Questions**: [GitHub Discussions](https://github.com/NickScherbakov/AutoForge/discussions)
- **Bugs**: [GitHub Issues](https://github.com/NickScherbakov/AutoForge/issues)
- **Ideas**: Open a discussion

**Tips**:
- Search existing issues first
- Provide error logs
- Describe expected vs actual behavior
- Include workflow configuration (without secrets)

---

## Still Have Questions?

**Can't find your answer?**

1. **Search documentation**:
   - [README.md](README.md) - Overview
   - [SETUP.md](SETUP.md) - Setup
   - [QUICKSTART.md](QUICKSTART.md) - Tutorial
   - [USE_CASES.md](USE_CASES.md) - Scenarios
   - [EXAMPLES.md](EXAMPLES.md) - Templates
   - [COMPARISON.md](COMPARISON.md) - Platform comparison

2. **Try the demo**:
   - https://nickscherbakov.github.io/AutoForge/
   - Explore without setup

3. **Ask the community**:
   - [GitHub Discussions](https://github.com/NickScherbakov/AutoForge/discussions)
   - Someone may have asked before

4. **Open an issue**:
   - [New Question](https://github.com/NickScherbakov/AutoForge/discussions/new)
   - We're happy to help!

---

**Last Updated**: November 2025

*This FAQ will be updated as new questions arise. Suggest additions via [GitHub Issues](https://github.com/NickScherbakov/AutoForge/issues).*
