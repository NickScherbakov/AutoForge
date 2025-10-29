# AutoForge Demo - User Guide

Welcome to the AutoForge interactive demo! This guide will help you explore all the features of the platform.

## 🚀 Getting Started

### Accessing the Demo
Visit: **https://nickscherbakov.github.io/AutoForge/**

### No Registration Required
The demo uses simulated data, so you can explore everything without creating a real account.

## 📖 How to Use the Demo

### 1. Landing Page
When you first visit, you'll see:
- **Yellow banner** at the top indicating demo mode
- **Feature overview** showcasing AutoForge capabilities
- **Try Demo button** to get started
- **GitHub link** to view the full project

### 2. Login
Click "Try Demo" or "Login" button:
- Enter **any email address** (e.g., demo@autoforge.io)
- Enter **any password** (e.g., demo)
- The demo will simulate authentication and log you in

### 3. Dashboard
After login, you'll see:
- **User balance**: $25.50 (simulated)
- **Workflow cards**: 4 pre-configured sample workflows
- **Create New Chain** button to add workflows

### 4. Sample Workflows

The demo includes these example workflows:

#### Daily Report Email
- **Trigger**: Scheduled (daily at 9:00 AM)
- **Action**: Send email with daily metrics
- **Cost**: $0.10 per execution
- **Status**: Active

#### Webhook to Telegram
- **Trigger**: Webhook
- **Action**: Forward notifications to Telegram
- **Cost**: $0.05 per execution
- **Status**: Active

#### API Status Monitor
- **Trigger**: Scheduled (hourly)
- **Actions**: Check API health + Send alert email
- **Cost**: $0.15 per execution
- **Status**: Active

#### Customer Onboarding
- **Trigger**: Manual
- **Actions**: Welcome email + CRM update
- **Cost**: $0.20 per execution
- **Status**: Inactive

### 5. Workflow Actions

From the dashboard, you can:
- **Execute**: Run a workflow immediately (simulated)
- **Edit**: View workflow details and configuration
- **View**: See execution history

### 6. Workflow Details

Click "Edit" on any workflow to see:
- **Configuration**: Trigger type, actions, cost
- **Execution History**: Past runs with results
- **Control Buttons**:
  - Execute Now (simulated)
  - Activate/Deactivate
  - Delete (simulated)
- **Webhook URL** (for webhook triggers)

### 7. Execution History

View past executions with:
- **Status**: Success or Failed
- **Timestamp**: When it ran
- **Cost**: Amount charged (only for successful runs)
- **Details**: Expandable execution results

### 8. Create New Workflow

Click "Create New Chain" to:
- Enter workflow name and description
- Choose trigger type (webhook, schedule, manual)
- Configure trigger settings
- Add actions (HTTP request, email, Telegram)
- Set action parameters

**Note**: In demo mode, creation is simulated.

## 🎭 Demo Features

### What Works in Demo Mode

✅ **Full UI Navigation**: Browse all pages and features  
✅ **Sample Data**: 4 workflows, 5 executions, 6 transactions  
✅ **Interactive Elements**: Buttons and forms work  
✅ **Simulated Actions**: Execute, create, edit, delete (no real changes)  
✅ **Authentication**: Login/register work with any credentials  
✅ **Responsive Design**: Works on mobile and desktop  

### What's Simulated

🎭 **Backend API**: All API calls are mocked  
🎭 **Data Persistence**: Changes don't save between sessions  
🎭 **Execution**: Workflows don't actually run  
🎭 **Payments**: No real Stripe integration  
🎭 **Email/Telegram**: Actions are simulated  

## 🔍 What to Explore

### 1. User Flow
- Try the complete workflow: login → dashboard → create → execute
- Notice the pay-per-success pricing model
- Check execution history and costs

### 2. Different Trigger Types
- **Webhook**: See how external services can trigger workflows
- **Schedule**: Check time-based automation setup
- **Manual**: Try button-triggered execution

### 3. Multiple Actions
- Look at workflows with multiple steps
- See how actions can be chained together
- Check the configuration format

### 4. Execution Tracking
- View successful vs failed executions
- Notice that failed executions don't charge
- Expand execution details to see results

### 5. Cost Transparency
- See per-execution costs upfront
- Track spending in execution history
- Check balance in dashboard header

## 🎯 Key Concepts Demonstrated

### Pay-Per-Success Model
- Only charged when workflows succeed
- Failed executions are free
- Transparent per-execution pricing

### No-Code Automation
- Simple form-based workflow creation
- Configure without writing code
- Multiple trigger and action types

### Flexibility
- Mix and match triggers and actions
- Chain multiple actions together
- Enable/disable workflows as needed

### Monitoring
- Complete execution history
- Success/failure tracking
- Cost breakdown

## 🔗 Next Steps

### Try the Full Version
Want to use AutoForge for real automation?

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NickScherbakov/AutoForge.git
   cd AutoForge
   ```

2. **Run with Docker**
   ```bash
   docker-compose up --build
   ```

3. **Configure Services**
   - Set up PostgreSQL database
   - Configure Redis for task queue
   - Add Stripe API keys
   - Set up SMTP for emails
   - Add Telegram bot token

4. **Start Automating**
   - Create real workflows
   - Connect to actual services
   - Monitor real executions
   - Track actual costs

### Learn More
- **README**: [Project overview](README.md)
- **Setup Guide**: [Detailed setup instructions](SETUP.md)
- **GitHub Pages Info**: [Demo deployment details](GITHUB_PAGES.md)
- **Repository**: [Full source code](https://github.com/NickScherbakov/AutoForge)

## 💡 Tips

- The demo resets on each visit (no persistence)
- All interactions are instant (no real API delays)
- Feel free to click around and explore
- You can't break anything in demo mode!
- Check the yellow banner for GitHub link

## 🤔 Questions?

- **Issues**: [GitHub Issues](https://github.com/NickScherbakov/AutoForge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/NickScherbakov/AutoForge/discussions)
- **Documentation**: See README and SETUP files

## 📱 Mobile Users

The demo is fully responsive:
- Works on phones and tablets
- Touch-friendly interface
- Optimized layout for small screens

## 🎓 For Developers

Interested in the implementation?
- Frontend: Next.js + TypeScript + Tailwind CSS
- Demo Mode: Static export with mock data
- State: Zustand for auth management
- API: Axios with demo interceptor
- Build: GitHub Actions → GitHub Pages

Check the source code for details!

---

**Enjoy exploring AutoForge!** 🚀

This demo showcases the complete user experience of a no-code automation platform with fair, transparent pricing. The full version runs on Docker with FastAPI backend, PostgreSQL database, Celery task queue, and real integrations.
