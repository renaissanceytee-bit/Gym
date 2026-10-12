# ASCEND

Mobile-only fitness and self-improvement app targeting **iOS and Android**, built with Expo, React Native, and TypeScript.

## Open the preview on your phone

1. Install Node.js LTS from [nodejs.org](https://nodejs.org) on a Windows or Mac computer.
2. Download the project from the `feature/mobile-app-expo` branch using GitHub's **Code → Download ZIP**, then unzip it.
3. On Windows, double-click **Start ASCEND.bat** in the unzipped project folder. It installs dependencies the first time, then starts Expo. Keep the window open.
4. Install **Expo Go** from the App Store or Google Play. Connect your phone and computer to the same Wi-Fi.
5. Scan Expo's QR code. On iPhone use Camera; on Android use Expo Go's scanner.

If the QR code cannot connect, stop Expo with Ctrl+C, run `npm start -- --tunnel` in the project folder, then scan the replacement code. Tunnel preview needs internet access.

## Included locally

- Today, Train, Fuel, Habits, and Progress tabs.
- Workout logging with strength/cardio/mobility categories, exercise, sets, reps, weight, duration, and notes.
- Meal logging with meal types and optional protein estimates.
- Custom habits, check-ins, streaks, Daily Missions, XP, and levels.
- 300 tiered badges with activity-based progress.
- Lock-In focus timer, weekly workout challenge, activity recap, rule-based training guidance, and Comeback Mode.
- 90-day journey, reflection, profile preferences, export, and local data deletion.
- On-device storage. No AI coach or Ask My Data.

## Current status

Supabase is the planned backend, but it is not connected and cloud sync is not enabled. Social squads/rankings, account sync, subscriptions, store signing, production security, backups, device/accessibility checks, monitoring, and load testing are still future work. This development build is not ready for public launch or sensitive health data. See [launch readiness](docs/ASCEND_LAUNCH_READINESS.md).
