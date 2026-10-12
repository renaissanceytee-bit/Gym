# ASCEND launch readiness

This checklist tracks the gap between the current local development app and a public launch. A feature is not launch-ready until it is built, reviewed, and exercised on supported iOS and Android devices.

## Working in the local app

- Today, Train, Fuel, Habits, and Progress tabs.
- Device-local workouts, meals, habit check-ins, missions, XP, levels, and reflections. Older saved meals are migrated with zero calorie/macro values.
- Starter workout templates, multiple exercise rows (Plus gated), editable weekly goal and preferred training days.
- Pro calorie/macronutrient entry and daily totals; estimated weekly training volume and top logged exercise weight.
- 300 tiered achievement entries with activity-based progress.
- Lock-In focus timer, weekly challenge, weekly activity recap, and rule-based training guidance.
- Comeback Mode opens a prefilled low-intensity session for the user to adjust.
- No AI coach or Ask My Data.
- Local export and local data deletion controls.

## Required before public release

1. **Run the app on real devices.** Build and open release candidates on supported iPhone and Android versions. Check navigation, keyboard handling, accessibility sizes, offline behavior, persistence after restart, and low-storage/error states.
2. **Finish and verify user data handling.** The current build is device-local. Supabase is the intended backend, but it is not connected. Before enabling accounts or sync, implement consented migration, reliable conflict handling, account recovery, account/data deletion, backup/restore, and access-control review.
3. **Complete privacy and security review.** Document collected data and retention, minimize health-related data, review permissions and third-party SDKs, protect credentials, and publish a clear privacy policy and terms before collecting real user data.
4. **Finish remaining product features.** Social squads/rivals/global rankings, public-profile privacy controls, push notifications, and reminders are not implemented. Do not present mock or sample data as real community activity.
5. **Prepare store releases.** Configure the owner-controlled Apple Developer and Google Play Console accounts, app identifiers, signing, store listing, screenshots, support contact, age/content declarations, and review submissions.
6. **Set up operational quality.** Add crash reporting with appropriate consent, backups and restore drills, support intake, monitoring, incident response, and a staged rollout plan.
7. **Validate scale and reliability.** Run security review, accessibility review, performance checks, and load testing against the real backend before inviting thousands of users.

## Current status

This repository contains an early local-only development build. The app has not been installed, typechecked, device-tested, or reviewed for public release. It is not production-ready and should not be used for sensitive health information. Store publication and backend setup require the project owner's accounts and configuration.
