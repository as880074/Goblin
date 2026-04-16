"use client";

import { useAppDownloadBridge } from "@/shared/hooks/use-app-download-bridge";
import { Button } from "@/shared/ui/button";

type VenueDetailClientProps = {
  venueId: string;
};

export function VenueDetailClient({ venueId }: VenueDetailClientProps) {
  const { openVenueInApp } = useAppDownloadBridge();

  return <Button onClick={() => openVenueInApp(venueId)}>Open in App</Button>;
}
