# ASCEND — Product Brief

## Product vision

ASCEND is a premium, dark-themed fitness and self-improvement app that helps people build consistent habits, train with purpose, eat intentionally, and see measurable progress. The experience should feel focused, encouraging, polished, and personal rather than noisy or punitive.

## Product principles

- Make the next useful action obvious.
- Reward consistency and personal progress, not only elite performance.
- Keep tracking fast enough to use during a real workout or busy day.
- Make coaching supportive and grounded in the user's own data.
- Protect user privacy, especially around health, social, and ranking features.
- Build a dependable core before adding complex social or AI features.

## Intended audience and outcomes

ASCEND is for people who want one place to improve fitness and daily routines. Users should be able to plan and log workouts, record meals, keep useful streaks, understand progress, and get back on track after missed days.

## Experience and feature vision

### Training and workout tracking

- Create, schedule, and log workouts, exercises, sets, reps, weight, duration, and notes.
- Support exercise history, personal records, progress charts, and workout templates.
- Provide adaptive training suggestions based on goals, history, recovery, and available equipment; suggestions should be explainable and editable.
- Add exercise-specific mastery trees that show skills or milestones and the next achievable step.
- Include Lock-In focus mode for a distraction-light active workout, with clear rest timers and quick logging.

### Nutrition and meal logging

- Make meal and nutrition logging quick, with saved meals and a clear daily view.
- Support meal-logging achievements and streaks.
- Keep nutrition goals configurable and avoid judgmental language.
- Defer integrations and automated nutrition estimates until their data quality and privacy implications are understood.

### Habits, missions, and consistency

- Track user-selected habits and streaks with flexible schedules and forgiving recovery.
- Offer Daily Missions that are small, actionable, and aligned with the user's goals.
- Add Comeback Mode to help users resume after a break without shaming or wiping out their progress.
- Offer a guided 90-day journey with milestones and periodic reflection.

### Motivation and progress

- Give the user a customizable character, XP, levels, and progress rewards.
- Create an ASCEND Score that summarizes progress transparently, explains its inputs, and avoids presenting it as a medical measure or an absolute judgment.
- Include Momentum as a quick view of recent consistency and progress.
- Provide weekly reports with workouts, habits, nutrition logging, personal records, and suggested next steps.
- Build a library of approximately 300 achievements, with tiers where useful. Cover exercise-specific milestones, strength and endurance progress, workout consistency, meal logging, habit streaks, recovery, and personal bests. The library should reward meaningful personal progress and provide accessible milestones for beginners as well as advanced users.

### Progress and personalization

- Provide transparent progress summaries grounded in user-entered activity.
- Include optional weekly reflections and editable training guidance.
- Clearly distinguish recorded facts from estimates or suggestions. Do not invent missing data.
- Keep the product free of AI coaching and conversational data-query features, per the user's preference.
- Provide user controls for personalization and data use.

### Social and challenge features

- Add challenges, rivals, squads, and global rankings as opt-in experiences.
- Let users control which profile and progress details are visible and whether they appear in rankings.
- Design fair comparisons and allow private participation or disabling social features.

### Account and billing

- Provide account settings for name, email, password, phone, profile picture, and privacy preferences.
- Support subscription plans and billing through Stripe, with clear pricing, renewal, cancellation, and receipt details.
- Keep payment data with the payment provider; the app should store only the references and subscription state needed to provide the service.

### Visual direction

- Use a polished, premium dark interface with strong hierarchy, readable contrast, restrained accent colors, and clear progress visualization.
- Keep workout logging and meal logging easy to use on small screens.
- Use motion and rewards sparingly so they clarify progress instead of distracting from it.
- Treat the visual reference from the original conversation as a direction to recover when available; do not assume missing imagery or screens.

## Suggested delivery plan

### Phase 0 — Understand and protect the existing project

1. Open the existing repository in Codex and inspect the full tree, README, dependency manifests, app entry points, and current Git state. This web prototype is a visual and interaction reference; the product target is mobile-only.
2. Identify the actual framework, runtime, backend, database, deployment setup, and existing user-facing functionality before choosing architecture.
3. Record a baseline of what currently works. Do not replace the app or change frameworks just because the stack is unfamiliar.
4. Create a dedicated feature branch and preserve a clean recovery point before implementation. Keep secrets out of source control.

### Phase 1 — Define a small MVP

Agree on iOS/Android targets, target user, first-run flow, and the smallest useful mobile launch slice. A reasonable MVP is:

- Account onboarding and editable goals.
- Workout logging with exercise history and personal records.
- Habit tracking with simple streaks and Daily Missions.
- A clear home/progress screen with Momentum and a basic weekly summary.
- A starter achievement set designed to scale toward the larger badge library.
- Essential account and privacy settings.

Choose one complete, dependable user journey before implementing the broader feature set. Keep nutrition logging simple if it is essential to the launch goal; otherwise add it in the next phase.

### Phase 2 — Build the core iteratively

1. Reuse the current stack and patterns when they are sound.
2. Implement one vertical feature at a time, including interface, data model, validation, error states, and accessibility.
3. Review each change before continuing. Keep changes small and avoid unrelated rewrites.
4. Add nutrition logging, meal achievements, the expanded badge tiers, character/XP, and the guided 90-day journey after the core loop is stable.
5. Add weekly reports, adaptive suggestions, exercise mastery trees, and Comeback Mode based on real user data and clear user controls.

### Phase 3 — Advanced features and launch

1. Add AI coaching and Ask My Data only after data access, privacy, consent, and factual grounding are designed.
2. Add squads, rivals, challenges, and rankings as opt-in features with explicit visibility controls.
3. Integrate Stripe in test mode first; verify plan changes, renewals, cancellations, failed payments, and webhooks before launch.
4. Review security, accessibility, performance, backups, privacy disclosures, and account deletion/export needs.
5. Release to a small test group, collect feedback, fix the highest-impact issues, then expand gradually.

## Safe Codex workflow

- Start with repository inspection and a written implementation plan.
- Work on a feature branch; do not commit directly to the default branch.
- Ask Codex to explain unfamiliar changes and review the diff before merging.
- Keep credentials and production data out of prompts and repository files.
- Use preview/test environments for authentication, payments, migrations, and deployment changes.
- Make database changes backward-compatible where possible, and confirm backups and rollback steps before production changes.
- Verify behavior relevant to each change before merging; preserve existing working behavior.

## Open decisions

- ASCEND is mobile-only. Decide whether the first release targets iOS, Android, or both.
- Which users and platform should the MVP serve first?
- What is the current technology stack and what already works?
- What visual reference or screens should guide the implementation?
- Which activity and nutrition data should be private by default?
- What subscription tiers and paid features are intended?
- Should the first release include nutrition logging, or focus on training and habits?

## Scope note

This document captures the feature direction available from the conversation and organizes it into an implementation brief. It is not a final technical specification. Resolve open decisions after inspecting the existing app, and keep the first release smaller than the full long-term vision.
