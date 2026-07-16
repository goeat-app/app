const MEASUREMENT_ID =
  process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID?.trim() ?? '';

type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: GtagCommand,
      targetOrDate: string | Date,
      params?: Record<string, string | number | boolean | null>,
    ) => void;
  }
}

function gtag(
  command: GtagCommand,
  targetOrDate: string | Date,
  params?: Record<string, string | number | boolean | null>,
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag(command, targetOrDate, params);
}

export async function initAnalytics(): Promise<void> {
  if (typeof window === 'undefined' || !MEASUREMENT_ID) {
    return;
  }

  gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

export async function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): Promise<void> {
  if (!MEASUREMENT_ID) {
    return;
  }

  gtag('event', name, params);
}

export async function trackScreen(screenName: string): Promise<void> {
  if (!MEASUREMENT_ID) {
    return;
  }

  gtag('event', 'page_view', {
    page_path: screenName,
    page_title: screenName,
  });
}

export async function trackUserId(uid: string | null): Promise<void> {
  if (!MEASUREMENT_ID) {
    return;
  }

  gtag('config', MEASUREMENT_ID, {
    user_id: uid,
    send_page_view: false,
  });
}
