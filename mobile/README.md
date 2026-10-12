# ASCEND mobile app

This is the native cross-platform starting point for ASCEND, targeting iOS and Android with Expo + React Native + TypeScript. The browser prototype at the repository root remains a design reference.

## Preview

1. Install a current Node.js LTS release and the project dependencies with `npm install`.
2. Run `npm start`.
3. Open the project in Expo Go on an iOS or Android device, or launch an emulator from the Expo terminal.

## Current scope

The first native slice contains a mobile dashboard, bottom navigation, mission checkboxes, sample progress, recent workouts, and a temporary workout button. State is in memory and resets when the app restarts. No user account, backend, cloud sync, or health data storage is configured yet.

## Next

Build out the native workout and meal flows, habits/streaks, achievement library, settings, accessibility, offline persistence, then add an account-backed API and secure cloud database before a public launch. Create development builds and verify on physical iOS and Android devices before store submission.
