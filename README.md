# FOXI — Social Media App Starter

FOXI is a React Native + Expo starter for an Android social app. This ZIP contains a front-end prototype, not a finished multi-user service.

## Included
- Dark interface with orange accents
- Home feed and local demo posts
- Like buttons and comments
- FOXI AI chat screen (demo replies only)
- Messages screen (local demo messages only)
- Notifications examples
- Profile screen and follow demo

## Run on a computer
1. Install Node.js LTS from https://nodejs.org/
2. Extract this folder.
3. Open a terminal in the FOXI folder.
4. Run `npm install`
5. Run `npx expo start`
6. Use Expo Go to scan the QR code, or press `a` if Android tooling is configured.

## Preview on Android only
You can create a project in https://snack.expo.dev/ and paste the contents of `App.js` to preview it in the browser / Expo Go.

## Build an APK
For a cloud Android build, configure an Expo account at https://expo.dev/ and follow https://docs.expo.dev/build-reference/apk/. A typical EAS setup uses:
- `npm install`
- `npx eas-cli login`
- `npx eas-cli build:configure`
- Set the Android build profile's `android.buildType` to `apk` in `eas.json`
- `npx eas-cli build -p android --profile preview`

## Important limitations
This is a prototype. Posts and messages exist only in local app memory and will reset when the app restarts. It does not yet have real sign-in, shared feeds, cross-user messaging, persistent AI chat history, working voice input, push notifications, or a connected AI API.

Before public launch, connect a backend such as Supabase, implement authentication and row-level security, add report/block/moderation tools, and keep API secrets on a server rather than in the app.
