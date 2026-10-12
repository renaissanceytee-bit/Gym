# ASCEND mobile app

ASCEND targets iOS and Android with Expo + React Native + TypeScript. The browser app at the repository root is a visual reference only.

## Run locally

1. Install Node.js LTS.
2. From the repository root, run `npm install`.
3. Run `npm start`.
4. Scan the Expo QR code with Expo Go on iOS or Android.

No cloud credentials are needed for the current local-only build.

## Working features

- Five native tabs: Today, Train, Fuel, Habits, and Progress.
- Workout logging with exercise name, sets, reps, weight, duration, and notes.
- Meal logging with type and optional self-entered protein; delete entries from the log.
- Custom habits, daily check-ins, streaks, Daily Missions, XP, and levels.
- 300 tiered badge entries with exercise-specific starter progress rules and one-time unlock records.
- 90-day journey summary, weekly reflection, profile name, and unit preference.
- Local data persists on the device through AsyncStorage.
- No AI coach or Ask My Data.

## Cloud work is deferred

Supabase is the planned backend. Optional client/auth/schema scaffolding is present, but no project URL or key is configured. Current user data remains on the device and is not synchronized. When cloud work resumes, the app must add consented migration, account recovery/deletion, conflict handling, and security review before launch.

This development build is not ready for public use or sensitive health data.
