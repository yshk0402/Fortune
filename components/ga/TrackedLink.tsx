"use client";

import { useCallback, useMemo, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { trackGaEvent, type GaEventParams } from "../../lib/ga";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParams?: GaEventParams;
  children?: ReactNode;
};

export function TrackedLink({ eventName, eventParams, onClick, children, ...props }: TrackedLinkProps) {
  const paramsKey = useMemo(() => (eventParams ? JSON.stringify(eventParams) : ""), [eventParams]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      trackGaEvent(eventName, eventParams);
      if (typeof onClick === "function") {
        onClick(event);
      }
    },
    [eventName, paramsKey, onClick],
  );

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
