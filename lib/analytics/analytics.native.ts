export async function initAnalytics(): Promise<void> {}

export async function trackEvent(
  _name: string,
  _params?: Record<string, string | number | boolean>,
): Promise<void> {}

export async function trackScreen(_screenName: string): Promise<void> {}

export async function trackUserId(_uid: string | null): Promise<void> {}
