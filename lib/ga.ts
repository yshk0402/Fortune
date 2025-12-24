export type GaEventParams = Record<string, unknown>;

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function getGtag() {
  if (typeof window === "undefined") {
    return undefined;
  }
  return (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
}

export function trackGaEvent(eventName: string, params?: GaEventParams) {
  if (!GA_MEASUREMENT_ID) {
    return;
  }
  const gtag = getGtag();
  if (typeof gtag !== "function") {
    return;
  }
  gtag("event", eventName, params);
}
