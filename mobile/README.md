# ASCEND mobile app

ASCEND targets iOS and Android with Expo + React Native + TypeScript. The browser app at the repository root is a visual reference only.

## Run on a phone

1. Install Node.js LTS and run `npm install` from the repository root.
2. Copy `.env.example` to `.env`.
3. Create a Supabase project and set its project URL and public anon key in `.env`.
4. In Supabase, run `supabase/migrations/0001_initial_schema.sql` in the SQL editor.
5. Run `npm start`, then scan the Expo QR code using Expo Go on iOS or Android.

Never put a Supabase service-role key in the mobile app or commit credentials.

## Working features

- Five native tabs: Today, Train, Fuel, Habits, and Progress.
- Workout logging with exercise name, sets, reps, weight, duration, and notes.
- Meal logging with type and optional self-entered protein; delete entries from the log.
- Custom habits, daily check-ins, streaks, Daily Missions, XP, and levels.
- 300-entry tiered badge library with local progress criteria and one-time unlock records.
- 90-day journey summary, weekly reflection, profile name, and unit preference.
- Local data persists on this device through AsyncStorage.
- Supabase email sign-up/sign-in UI and persisted auth sessions when credentials are configured.

## Not connected yet

Accounts authenticate through Supabase when configured, but workout, meal, habit, badge, and profile records are still stored locally and are not synchronized to Supabase. The initial SQL schema is groundwork only. Cloud CRUD/sync, account deletion, password recovery, device testing, offline conflict handling, push notifications, subscriptions, and production monitoring remain to be implemented and reviewed.

This is an early development build, not ready for public launch or sensitive health data.
