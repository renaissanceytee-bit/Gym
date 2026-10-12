# ASCEND mobile app

ASCEND targets iOS and Android with Expo + React Native + TypeScript. This is a development preview, not a store release.

## Start on a computer and open on your phone

1. Install Node.js LTS on a Windows or Mac computer.
2. Download the repository's `feature/mobile-app-expo` branch using GitHub **Code → Download ZIP**, then unzip it.
3. On Windows, double-click `Start ASCEND.bat`. On Mac, open Terminal in the extracted folder, run `npm install`, then `npm start`.
4. Keep the terminal open. Install Expo Go on your phone and connect phone and computer to the same Wi-Fi.
5. Scan the QR code. On iPhone use Camera; on Android use Expo Go's scanner.

If the phone cannot connect, stop Expo with Ctrl+C and run `npm start -- --tunnel`; scan the replacement QR code. Tunnel mode needs internet access.

## Included locally

- Five tabs: Today, Train, Fuel, Habits, Progress.
- Workout and meal logs; habit check-ins, streaks, Daily Missions, XP, and levels.
- 300 tiered badges with activity-based progress.
- Lock-In timer, weekly challenge and recap, rule-based training guidance, and Comeback Mode.
- 90-day journey, weekly reflection, profile name and units, export, and local data deletion.
- Device persistence with AsyncStorage.
- No AI coach or Ask My Data.

## Launch status

Supabase is planned but not configured; the app currently stores data on the device only. Social features, subscriptions, store signing, and production privacy/security/operations work remain. This development build has not been device-tested and is not ready for public launch or sensitive health data. See [launch readiness](../docs/ASCEND_LAUNCH_READINESS.md).
