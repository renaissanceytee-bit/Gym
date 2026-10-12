# ASCEND mobile app

ASCEND targets iOS and Android with Expo + React Native + TypeScript. This is a development preview, not a store release.

## Start on a computer and open on your phone

1. Install Node.js LTS on a Windows or Mac computer.
2. Download the repository's `feature/mobile-app-expo` branch from GitHub using **Code → Download ZIP**, then unzip it.
3. On Windows, double-click `Start ASCEND.bat` in the extracted folder. It installs dependencies on first launch and starts Expo. On Mac, open Terminal in the extracted folder, run `npm install`, then `npm start`.
4. Keep the terminal window open. Install Expo Go on your phone and connect phone and computer to the same Wi-Fi.
5. Scan Expo's QR code. On iPhone use Camera; on Android use Expo Go's scanner.

If the phone cannot connect, stop Expo with Ctrl+C and run `npm start -- --tunnel`; scan the replacement QR code. Tunnel mode needs internet access.

## Included locally

- Five native tabs: Today, Train, Fuel, Habits, Progress.
- Workout tracking with exercise, sets, reps, load, duration, and notes.
- Meal logging with meal type and optional protein estimate.
- Custom habits, check-ins, streaks, Daily Missions, XP, and levels.
- 300 tiered badges with activity-based progress.
- 90-day journey, weekly reflection, profile name, and unit preferences.
- Device persistence with AsyncStorage.
- No AI coach or Ask My Data.

## Not connected yet

Supabase is the planned backend, but there are no credentials configured and no cloud sync. Store signing and distribution, production account recovery/deletion, security/privacy review, backups, accessibility checks, monitoring, social features, adaptive training, and subscriptions are still future work. Do not use this development preview for sensitive health data.
