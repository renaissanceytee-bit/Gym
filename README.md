# ASCEND

ASCEND is a mobile-only fitness and self-improvement app targeting **iOS and Android**. This repository contains a native Expo + React Native + TypeScript starter in `App.tsx`; the browser UI at the root is a separate visual reference.

## Preview the mobile app

1. Install Node.js and project dependencies with `npm install`.
2. Start Expo with `npm start`.
3. Scan the QR code in Expo Go on an iOS or Android device, or launch a configured simulator/emulator.

See [mobile/README.md](mobile/README.md) for setup and current scope.

## Current mobile slice

- Native dark dashboard and bottom navigation.
- Daily mission checkboxes and sample progress cards.
- Recent workout preview and temporary workout action.

The current native screen uses sample data stored only in memory. It resets when the app restarts. The browser prototype is still available at the root for reference.

## Product decisions

- Mobile only, launching on both iOS and Android.
- No AI coach and no Ask My Data.
- Dark premium visual direction with training, nutrition, habits, streaks, tiered achievements, progress, and 90-day journey features.

## Production status

This is an early mobile starter, not ready for public use. It has no account system, cloud data, secure persistence, backups, real workout/nutrition flows, push notifications, social backend, or billing. Do not use it to store sensitive health data.

Before a launch for a large audience, build account-scoped cloud storage, privacy and recovery controls, offline-safe sync, server-side validation, monitoring, accessibility and device coverage, and security/load reviews.

See [the product brief](docs/ASCEND_PRODUCT_BRIEF.md) for the full feature plan.
