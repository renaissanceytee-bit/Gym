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
- Workout logging with strength/cardio/mobility categories, reusable starter templates, session details, and Plus multi-exercise sets/reps/weight tracking.
- Meal logging with optional protein for everyone; Pro calorie, protein, carbohydrate, and fat tracking with daily totals.
- Personalized weekly workout goal and preferred training days; ASCEND Score adjusts to the selected goal.
- Pro training metrics include estimated weekly volume and the highest recorded exercise weight.
- Progress calendar, eight-week workout chart, per-exercise logged bests, searchable exercise library, permission-based weekly workout reminders, and JSON backup restore.
- Custom habits, check-ins, streaks, Daily Missions, XP, and levels.
- 300 tiered badges with activity-based progress.
- Lock-In focus timer, weekly workout challenge, activity recap, rule-based training guidance, and Comeback Mode.
- 90-day journey, reflection, profile preferences, export, and local data deletion.
- On-device storage. No AI coach or Ask My Data.

## Current status

Supabase is the planned backend, but it is not connected and cloud sync is not enabled. Plus ($7.99/month) and Pro ($11.99/month) checkout is wired to RevenueCat entitlements and store restore, and the free-plan banner is wired to consent-gated AdMob; both stay disabled until owner-created store/ad products, keys, app IDs, and a native development build are configured. Expo Go remains for local preview, but cannot exercise native purchases or ads. Social squads/rankings, account sync, store signing, production privacy/security, backups, device/accessibility checks, monitoring, and load testing remain before public launch. See [billing and ads setup](docs/ASCEND_LAUNCH_READINESS.md#billing-and-ad-setup). This development build is not ready for public launch or sensitive health data. See [launch readiness](docs/ASCEND_LAUNCH_READINESS.md).
