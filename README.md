# app

## Firebase auth setup

Set these variables in `.env`:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` (optional)

## Firebase Auth Emulator

To run authentication against the emulator, set:

- `EXPO_PUBLIC_USE_FIREBASE_AUTH_EMULATOR=true`
- `EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099`

Host mapping is automatic in the app:

- iOS simulator uses `localhost:9099`
- Android emulator uses `10.0.2.2:9099`

Run the backend and emulator before opening the app:

1. `cd ../backend && npm run emulators:auth`
2. `cd ../backend && npm run start:emulator`
3. `cd ../app && yarn start`
