import Constants from 'expo-constants';
import { Platform } from 'react-native';

/** Backend HTTP port (Nest default). */
const API_PORT = 3000;

/**
 * Metro/dev machine host as seen by Expo Go (`192.168.x.x:8081` → `192.168.x.x`).
 */
function hostFromExpoUri(uri: string | undefined): string | undefined {
  if (!uri) {
    return undefined;
  }
  const host = uri.split(':')[0];
  return host || undefined;
}

/**
 * Resolves the API base URL for Expo Web, native simulators, emulators, and physical devices.
 *
 * Override anytime with `EXPO_PUBLIC_API_URL` (e.g. `http://192.168.1.10:3000`).
 */
export function resolveApiBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.location?.hostname) {
      return `http://${window.location.hostname}:${API_PORT}`;
    }
    return `http://localhost:${API_PORT}`;
  }

  const hostUri = Constants.expoConfig?.hostUri;
  const fromExpoConfig = hostFromExpoUri(hostUri);

  const legacyManifest = Constants.manifest as
    | { debuggerHost?: string }
    | null
    | undefined;
  const fromLegacy =
    !fromExpoConfig && legacyManifest?.debuggerHost
      ? hostFromExpoUri(legacyManifest.debuggerHost)
      : undefined;

  const devHost = fromExpoConfig ?? fromLegacy;
  if (devHost) {
    return `http://${devHost}:${API_PORT}`;
  }

  // Android emulator: host machine loopback
  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${API_PORT}`;
  }

  // iOS simulator
  return `http://localhost:${API_PORT}`;
}
