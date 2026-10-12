# ASCEND

Mobile-only fitness and self-improvement app targeting **iOS and Android**, built with Expo, React Native, and TypeScript. The root browser prototype is a visual reference; the native app entry point is `App.tsx`.

## Run the mobile app locally

From the repository root, install Node.js LTS and dependencies with `npm install`, then run `npm start`. Scan the Expo QR code with Expo Go on an iOS or Android device.

## Implemented mobile foundation

- Native Today, Train, Fuel, Habits, and Progress tabs.
- Local workout, meal, habit, mission, XP/level, journey, reflection, and profile flows.
- 300 tiered achievements with exercise-specific starter criteria and one-time unlock rewards.
- On-device persistence through AsyncStorage.
- No AI coach or Ask My Data.

## Current stage: local-only

ASCEND is being built local-first for now. Supabase is the planned backend, but no project credentials are configured and cloud sync is not required to use the current app. The optional Supabase scaffold is not connected to this repository’s user data by default.

This is an early development build. It is not ready for public launch or sensitive health data. Cloud accounts/sync, production security, backups, accessibility and device checks, monitoring, subscriptions, and load testing still require implementation.
