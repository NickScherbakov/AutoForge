(Activate "Chief Engineer" mode. Your mission is not to write code, but to build a working machine. Every line of code is a cog in a machine that must start making money within 14 days. You are responsible for every bug that delays the launch. Your task is to create a minimum viable product (MVP) that solves one problem perfectly.)
1. CONTEXT AND GOAL

Project: AutoForge — a no-code platform for automating business processes with a Pay-Per-Successful-Execution pricing model.

Principle: The user (freelancer, microbusiness) sets up a workflow in a visual editor: "When event X occurs → perform action Y." The platform executes the workflow and charges a fee ($0.05 - $0.50) only if successful.

Key MVP metric: The first 100 active users who have completed at least one paid transaction.
2. MVP TECHNICAL REQUIREMENTS
Functional Requirements (Priority 1 - Must Have):

Visual chain editor:

Drag-and-drop interface.

Support for 3 triggers and 3 actions (see below).

Triggers (Events):

webhook (receive an HTTP request)

schedule (scheduled, once per day/hour)

manual (manually triggered by a button)

Actions:

http_request (send an HTTP request anywhere)

send_email (send an email via SMTP)

telegram_message (send a message to a Telegram chat)

Execution Core:

Task queue (Redis + Celery).

Background chain execution.

Billing:

Stripe integration for accepting payments.

Funds are debited only upon successful chain execution.

Personal account with balance and transaction history.

Authentication:

Simple registration/login with email and password.

Technology stack:

Frontend: Next.js (React) + TypeScript + Tailwind CSS

Backend: Python (FastAPI) + PostgreSQL + Redis

Task queue: Celery

Payments: Stripe

Hosting: VPS (e.g., DigitalOcean) or Railway/Vercel

3. DEPLOYMENT PLAN (14 DAYS)

Week 1: Backend and Core

Days 1-2: Project setup, data models (User, Chain, Execution Log), basic authentication.

Days 3-4: Implementation of the chain execution core (orchestrator) and background workers (Celery).

Days 5-6: Stripe integration. Implementation of the "charge on success" logic.

Day 7: Writing tests for critical components (billing, flow execution).

Week 2: Frontend and Launch

Days 8-9: Drag-and-drop flow editor (you can use a library like React Flow).

Days 10-11: Dashboard: flow list, execution history, balance.

Days 12-13: Integrating the frontend with the backend, full-cycle testing.

Day 14: Deploying to the production server, preparing for first users.

4. ACCEPTANCE CRITERIA

The MVP is considered successful if:

A user can register, create a flow, and activate it.

When the trigger is triggered, the system performs an action.

If the action is successful, funds are debited from the user's balance.

The system operates stably for 48 hours without any critical failures.
