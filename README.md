# ASCEND

Mobile-only fitness and self-improvement app targeting **iOS and Android**, built with Expo, React Native, and TypeScript. The root browser prototype is a visual reference; the native app entry point is `App.tsx`.

## Run the mobile app

From the repository root:

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and add Supabase project URL and anon key.
3. Apply `supabase/migrations/0001_initial_schema.sql` in the Supabase SQL editor.
4. Run `npm start`; scan the Expo QR code in Expo Go on an iOS or Android device.

See [mobile/README.md](mobile/README.md) for full setup and implementation status.

## Implemented mobile slice

- Native Today, Train, Fuel, Habits, and Progress tabs.
- Local workout, meal, habit, mission, XP/level, journey, reflection, and badge flows.
- 300 tiered achievements with one-time local unlock rewards.
- Supabase email sign-up/sign-in screen and persisted auth sessions when configured.

## Important status

The app currently saves user activity in device-local AsyncStorage. Supabase authentication and a user-scoped database schema are scaffolded, but activity records are **not yet synced to the cloud**. The app is not production-ready for thousands of users. Cloud CRUD/sync, password recovery, account deletion, offline conflict handling, device testing, privacy review, backups, monitoring, and security/load review remain.

No AI coach or Ask My Data feature is included.
