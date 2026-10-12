# ASCEND

Mobile-only fitness and self-improvement app targeting **iOS and Android**, built with Expo, React Native, and TypeScript.

## Open the preview on your phone

1. Install Node.js LTS from [nodejs.org](https://nodejs.org) on a Windows or Mac computer.
2. Download the project from the `feature/mobile-app-expo` branch using GitHub's **Code → Download ZIP**, then unzip it.
3. On Windows, double-click **Start ASCEND.bat** in the unzipped project folder. It installs project dependencies the first time, then starts Expo. Keep the window open.
4. Install **Expo Go** from the App Store or Google Play on your phone. Connect the phone and computer to the same Wi-Fi network.
5. Scan the QR code shown in the terminal. On iPhone use the Camera app; on Android use Expo Go's scan option.

If the QR code cannot connect, check that both devices are on the same Wi-Fi and that your firewall allows Node.js. If it still fails, stop Expo with Ctrl+C, run `npm start -- --tunnel` in the project folder, then scan the new code. Tunnel preview requires internet access.

For a computer-only browser preview, run `npm run web` after the first-time install.

## Included mobile foundation

- Native Today, Train, Fuel, Habits, and Progress tabs.
- Local workout, meal, habit, mission, XP/level, journey, reflection, and profile flows.
- 300 tiered achievements with activity-based criteria.
- On-device persistence through AsyncStorage.
- No AI coach or Ask My Data.

## Current stage: local-only

Supabase is the planned backend, but no project credentials are configured and cloud sync is not enabled. This development build is not ready for public launch or sensitive health data. Account sync, release builds for the App Store and Google Play, production security, backups, device/accessibility checks, monitoring, subscriptions, and load testing still require implementation.
