"use client";

import { useCallback } from "react";

import { buildVenueDeepLink, getDownloadUrl } from "@/shared/lib/mobile/deep-link";

const DEEP_LINK_TIMEOUT_MS = 1200;

export const useAppDownloadBridge = () => {
  const openVenueInApp = useCallback((venueId: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        window.clearTimeout(fallbackTimer);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
    };

    const fallbackTimer = window.setTimeout(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.open(getDownloadUrl(navigator.userAgent), "_blank", "noopener,noreferrer");
    }, DEEP_LINK_TIMEOUT_MS);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.location.href = buildVenueDeepLink(venueId);
  }, []);

  return { openVenueInApp };
};
