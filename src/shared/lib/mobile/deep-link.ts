const IOS_STORE = "https://apps.apple.com";
const ANDROID_STORE = "https://play.google.com/store/apps";

export const getDownloadUrl = (userAgent: string): string => {
  const normalizedUA = userAgent.toLowerCase();

  if (normalizedUA.includes("iphone") || normalizedUA.includes("ipad")) {
    return IOS_STORE;
  }

  if (normalizedUA.includes("android")) {
    return ANDROID_STORE;
  }

  return ANDROID_STORE;
};

export const buildVenueDeepLink = (venueId: string) => `ptalk://venues/${encodeURIComponent(venueId)}`;
