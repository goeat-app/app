# 🍽️ goeat — Mobile App

React Native mobile app built with **Expo**, **React Native**, and **TypeScript**. Connects to the backend API and uses **Firebase Auth** (with local emulator support) for authentication.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the App](#running-the-app)
- [Backend Setup](#backend-setup)
- [Development Workflows](#development-workflows)
- [Network Configuration](#network-configuration)
- [Troubleshooting](#troubleshooting)
- [Quality Checks](#quality-checks)

---

## Overview

GoEat is a restaurant recommendation mobile app with:

- **Authentication**: Firebase Auth (email/password & Google Sign-In)
- **Features**: Restaurant discovery, filtering, favorites, user profiling, recommendations
- **Tech Stack**: Expo, React Native, TypeScript, NativeWind (Tailwind), Zustand (state), Firebase, Axios
- **Platforms**: iOS, Android, Web (via Expo)

The app communicates with a **NestJS backend** running on `http://127.0.0.1:5001/demo-goeat/us-central1/api:3000` (or configured via `EXPO_PUBLIC_API_URL`).

---

## Prerequisites

Before starting, install:

- **Node.js 20+** ([nodejs.org](https://nodejs.org))
- **Yarn 1.x** (or npm)
  ```bash
  npm install -g yarn
  ```
- **iOS development** (macOS only):
  - Xcode 15+
  - CocoaPods: `sudo gem install cocoapods`
- **Android development**:
  - Android Studio (API 24+) or emulator
- **Firebase CLI** (for emulator):
  ```bash
  npm install -g firebase-tools
  firebase login
  ```

---

## Installation

1. **Clone and navigate to the app folder:**

   ```bash
   cd app
   ```

2. **Install dependencies:**

   ```bash
   yarn
   ```

3. **Create environment file:**
   ```bash
   cp .env.exemple .env
   ```

---

## Environment Setup

Environment variables are read from `.env` using Expo's `EXPO_PUBLIC_*` prefix (client-side only). All variables prefixed with `EXPO_PUBLIC_` are baked into the bundle.

### Local Environment Variables

| Variable                                   | Purpose                                | Default (local)              |
| ------------------------------------------ | -------------------------------------- | ---------------------------- |
| `EXPO_PUBLIC_API_URL`                      | Backend API base URL                   | `http://127.0.0.1:3000`      |
| `EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST`  | Firebase Auth emulator (set to enable) | `localhost:9099`             |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID                    | `demo-goeat`                 |
| `EXPO_PUBLIC_FIREBASE_API_KEY`             | Firebase API key                       | `fake-key` (emulator)        |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain                   | `demo-goeat.firebaseapp.com` |
| `EXPO_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID                        | `fake-app-id`                |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase storage                       | `fake-bucket.appspot.com`    |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging ID                  | `fake-sender-id`             |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`         | Google OAuth (Web)                     | (optional)                   |
| `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`         | Google OAuth (iOS)                     | (optional)                   |

### Mode 1: Local Development (Recommended)

**Best for:** Testing with local backend + Firebase Auth emulator + fake data.

Use `.env.exemple` as-is:

```env
# Backend API running locally
EXPO_PUBLIC_API_URL=http://127.0.0.1:3000

# Firebase Auth Emulator (must be running)
EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099

# Fake credentials for emulator (any values work)
EXPO_PUBLIC_FIREBASE_PROJECT_ID=demo-goeat
EXPO_PUBLIC_FIREBASE_API_KEY=fake-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=demo-goeat.firebaseapp.com
EXPO_PUBLIC_FIREBASE_APP_ID=fake-app-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=fake-bucket.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=fake-sender-id
```

**Steps:**

1. Backend must be running (see [Backend Setup](#backend-setup))
2. Firebase Auth Emulator must be running (`firebase emulators:start`)
3. Start Expo: `yarn start`

### Mode 2: Real Firebase + Local Backend

**Best for:** Testing against production Firebase while keeping backend local.

Edit `.env`:

Check the [Confluence Page](https://projetorestaurantes.atlassian.net/wiki/spaces/APP/pages/110526465/Firebase+Client+Config) to get the real values

```env
# Local backend
EXPO_PUBLIC_API_URL=http://127.0.0.1:3000

# Point to your Firebase Console project
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-real-project-id
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id

# Remove or comment out to disable emulator
# EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
```

**Steps:**

1. Backend running locally
2. Firebase credentials from [Firebase Console](https://console.firebase.google.com) > Project Settings > Web App
3. Start Expo: `yarn start`

### Mode 3: Production

**Best for:** Testing against staging/production backend and Firebase.

Edit `.env`:

```env
# Production backend URL
EXPO_PUBLIC_API_URL=https://api.production.example.com

# Production Firebase credentials
EXPO_PUBLIC_FIREBASE_PROJECT_ID=production-project-id
# ... (all other Firebase vars from production Firebase Console)

# Disable emulator
# EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=
```

---

## Running the App

### Start Expo

```bash
yarn start
```

This launches the Expo dev server. Press:

- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser
- `r` to reload
- `m` to open menu

### Run Specific Platform

```bash
# iOS (macOS only)
yarn ios

# Android
yarn android

# Web
yarn web

# Run tests
yarn test
```

### Build the Installable PWA

The web app includes a manifest, app icons, iOS install metadata, an offline
fallback page, and a service worker that caches the app shell and same-origin
assets.

```bash
# Create the production web bundle in dist/
yarn build:web
```

Serve the exported `dist/` folder over HTTPS in production. For a local PWA
check, serve `dist/` from `localhost` so the service worker can register.

---

## Backend Setup

The app requires a running backend API. By default, it connects to `http://127.0.0.1:3000`.

### Quick Start (Local + Emulator)

**Terminal 1 — Start Firebase Emulator:**

```bash
cd ../backend
firebase emulators:start --project demo-goeat
```

The emulator runs on `http://127.0.0.1:5001/demo-goeat/us-central1/api:4000` (UI) and auth on `localhost:9099`.

**Terminal 2 — Start Backend:**

```bash
cd ../backend
docker compose up -d  # Start PostgreSQL
yarn install
yarn db:migrate       # Run migrations
yarn start:emulator   # Start NestJS in emulator mode
```

Backend starts on `http://127.0.0.1:5001/demo-goeat/us-central1/api:3000`.

**Terminal 3 — Start App:**

```bash
cd app
yarn start
```

---

## Development Workflows

### Device Connections

By default, Expo shows your machine's **LAN IP** (e.g., `192.168.1.10:8081`). Use this to connect physical devices on the same network.

#### Physical Device Setup

1. Install **Expo Go** from App Store or Google Play
2. Ensure device is on same Wi-Fi as your computer
3. Scan QR code from `yarn start`
4. **For backend access**: Use your computer's LAN IP in `.env`:
   ```env
   EXPO_PUBLIC_API_URL=http://192.168.1.10:3000
   ```

#### Android Emulator

Address `127.0.0.1` inside the emulator maps to `10.0.2.2` on your machine. This is **automatic** in the app code — no env changes needed.

#### iOS Simulator

Can access `127.0.0.1` directly. No mapping required.

### Hot Reload vs. Hard Reload

- **Hot reload**: `r` in Expo CLI (preserves app state)
- **Hard reload**: `Shift + m` then `r` (full restart)

---

## Network Configuration

### API URL Resolution

The app uses smart URL resolution in [lib/api/resolve-api-base-url.ts](lib/api/resolve-api-base-url.ts):

1. **Explicit env var** (`EXPO_PUBLIC_API_URL`) — used if set
2. **Web browser** — `http://127.0.0.1:5001/demo-goeat/us-central1/api:3000` (local machine)
3. **Dev mode** — extracts host from Expo's debug server
4. **Fallback** — `http://127.0.0.1:5001/demo-goeat/us-central1/api:3000`

### Emulator Host Mapping

Firebase Auth emulator host is resolved in [lib/auth/firebase-auth.ts](lib/auth/firebase-auth.ts):

- **Android emulator**: `localhost:9099` → `10.0.2.2:9099`
- **iOS simulator & web**: `localhost:9099` (direct)
- **Physical device**: Must manually set to your machine's LAN IP

---

## Troubleshooting

### "Cannot connect to API" / 404 errors

1. Check backend is running: `curl http://127.0.0.1:5001/demo-goeat/us-central1/api:3000/health`
2. Verify `EXPO_PUBLIC_API_URL` in `.env`
3. On physical device, use your LAN IP (e.g., `http://192.168.1.10:3000`)

### Firebase Auth Emulator fails

1. Emulator running? `firebase emulators:start --project demo-goeat`
2. UI should be at `http://127.0.0.1:5001/demo-goeat/us-central1/api:4000`
3. Verify `EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099` is set
4. Try clearing Expo cache: `yarn start -c`

### "Missing Firebase config" error

- Ensure all Firebase env vars are set (at least `apiKey`, `projectId`, `appId`)
- On emulator mode, fake values are OK
- Re-run `yarn start -c` to clear cache

### "Module not found" / TypeScript errors

```bash
yarn install
rm -rf node_modules/.cache
yarn start -c
```

### iOS specific

- **Pod installation issues**: `cd ios && pod install && cd ..`
- **XCode build errors**: `yarn start -c` and rebuild

---

## Quality Checks

```bash
# Lint (ESLint)
yarn lint

# Auto-fix linting issues
yarn lint:fix

# Type checking (TypeScript)
yarn typecheck

# Run tests (Jest)
yarn test
```

---

## Project Structure

```
app/
├── app/                    # Expo Router screens & navigation
├── lib/                    # Core utilities
│   ├── api/               # API client & URL resolution
│   ├── auth/              # Firebase Auth config & helpers
│   ├── storage/           # Local storage (AsyncStorage)
│   └── utils/             # General utilities
├── hooks/                 # React hooks
├── services/              # Business logic & API calls
├── use-cases/             # Feature-specific logic (login, favorites, etc.)
├── store/                 # Zustand state management
├── assets/                # Images & icons
├── styles/                # Theme, colors, fonts
├── components/            # Reusable UI components
└── package.json           # Dependencies
```

---

## Authentication Flow

1. **Signup/Login** → Email or Google Sign-In via Firebase Auth
2. Firebase generates **ID token**
3. App stores token in `AsyncStorage` (session persistence)
4. API requests include `Authorization: Bearer <token>`
5. Backend validates token with Firebase Admin SDK
6. On first auth, backend provisions internal user

See [lib/auth/firebase-auth.ts](lib/auth/firebase-auth.ts) and [use-cases/login/](use-cases/login/) for details.

---

## Useful Links

- [Expo Documentation](https://docs.expo.dev)
- [React Native](https://reactnative.dev)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Backend Repository](../backend)
- [Project on GitHub](https://github.com/goeat-app)
