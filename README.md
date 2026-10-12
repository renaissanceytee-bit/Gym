# ASCEND

ASCEND is a responsive fitness and self-improvement web prototype. This branch expands the starter dashboard into interactive local-first feature screens.

## Run it

Open `index.html` in a modern browser. It has no build step or package install. Google Fonts are optional; the interface works with local fallback fonts. Browser localStorage stores the demo profile and logs.

## Included in this prototype

- Responsive dark dashboard with progress, weekly activity, XP, levels, missions, and recent activity.
- Workout logging and local history with workout type, duration, and exercise/focus notes.
- Nutrition meal logging with meal type and optional self-entered protein amount.
- Habit check-ins, custom habits, streak counts, and daily mission completion.
- A searchable 300-entry achievement catalog across training, nutrition, habits, and consistency, with five tiers.
- 90-day journey progress and locally saved weekly reflection.
- Local summary insights and an Ask My Data preview based on simple recorded counts.
- Personal challenge preview, privacy preference controls, profile preferences, and data export/delete.

## Important: demo versus production

This is a front-end prototype for product exploration. Data is stored in one browser and is not backed up or synced. It is not ready to serve thousands of users or to store sensitive health data.

The following require production services and are not live here: authentication and password/phone/email management; secure cloud database and multi-device sync; automatic verified achievement awards; AI coaching; squads, rivals, and global rankings; Stripe billing; notifications; deployment monitoring, backups, and account recovery. Dashboard progress is calculated from local logs and should not be treated as medical advice.

## Product direction

See [the ASCEND product brief](docs/ASCEND_PRODUCT_BRIEF.md) for the broader vision and a staged implementation plan.

## Next steps before a public launch

1. Choose the actual web/mobile target and hosting plan.
2. Select and configure a secure backend, authentication, database, access controls, and backups.
3. Replace browser-only persistence with account-scoped server data and migrations.
4. Define and verify badge rules and scoring against real event data.
5. Add privacy consent, data deletion/export, monitoring, accessibility review, and recovery flows.
6. Integrate AI and Stripe server-side with secrets protected; validate payments in test mode.
7. Run usability, security, and load testing before inviting a large audience.
