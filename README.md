# ASCEND

ASCEND is a responsive fitness and self-improvement web prototype. The current feature branch expands the original dashboard into interactive, local-first feature screens.

## Run it

Open `index.html` in a modern browser. No build step or package installation is required. Browser localStorage saves the demo profile and logs. Google Fonts are optional.

## Included

- Responsive dark dashboard with logged activity, streaks, XP, levels, and Daily Missions.
- Workout logging with type, duration, focus/exercise notes, local history, and basic training summaries.
- Meal logging with type and optional self-entered protein, plus meal history.
- Custom habit check-ins, streak counts, 90-day journey tracking, and saved reflections.
- Searchable 300-entry achievement catalog covering exercise milestones, training consistency, nutrition, habits, and streaks. Five tiers unlock from starter activity thresholds.
- Local Ask My Data counts and coach-style summaries.
- Personal challenge preview, privacy preferences, editable display name/units, local data export, and local data deletion.

## Production status

This is a front-end prototype, not ready to serve thousands of people. All user data stays in one browser's localStorage; it is not synced or backed up, and browser data can be cleared. Do not store sensitive health data here.

There is no authentication, password/email/phone account management, cloud database, server-side privacy enforcement, social network, global rankings, AI service, adaptive training engine, Lock-In timer, notification service, or Stripe billing. These require production backend/services, security and privacy design, and further implementation. The ASCEND Score and starter achievement rules are product prototypes, not health measurements or clinically validated guidance.

## Product direction and launch path

See [the ASCEND product brief](docs/ASCEND_PRODUCT_BRIEF.md) for the broader vision. Before a public launch, choose a platform and hosting stack, add account-scoped persistence and access controls, confirm privacy and deletion/export behavior, implement integrations server-side, and complete usability, security, accessibility, backup, monitoring, and load reviews.
