"use client";

import { useEffect, useMemo } from "react";
import { trackGaEvent, type GaEventParams } from "../../lib/ga";

type TrackEventOnMountProps = {
  eventName: string;
  params?: GaEventParams;
};

export default function TrackEventOnMount({ eventName, params }: TrackEventOnMountProps) {
  const paramsKey = useMemo(() => (params ? JSON.stringify(params) : ""), [params]);

  useEffect(() => {
    trackGaEvent(eventName, params);
  }, [eventName, paramsKey]);

  return null;
}
