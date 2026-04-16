"use client";

import { useCallback } from "react";

import { buildVenueDeepLink, getDownloadUrl } from "@/shared/lib/mobile/deep-link";

export const useAppDownloadBridge = () => {
  const openVenueInApp = useCallback((venueId: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const deepLink = buildVenueDeepLink(venueId);
    window.location.href = deepLink;

    window.setTimeout(() => {
      window.open(getDownloadUrl(navigator.userAgent), "_blank", "noopener,noreferrer");
    }, 1200);
  }, []);

  return { openVenueInApp };
};
