import React, { useRef } from "react";
import {
  useScrollTracking,
  useClickTracking,
  useInteractionTracking,
} from "@/hooks/useAnalytics";

interface TrackingWrapperProps {
  children: React.ReactNode;
  componentName: string;
  trackClicks?: boolean;
  trackScrollView?: boolean;
  trackInteractions?: boolean;
  clickLabel?: string;
  className?: string;
  onClick?: () => void;
  onInteraction?: (action: string, value?: string | number | boolean) => void;
}

export function TrackingWrapper({
  children,
  componentName,
  trackClicks = false,
  trackScrollView = false,
  trackInteractions = false,
  clickLabel,
  className,
  onClick,
  onInteraction,
}: TrackingWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleClick = useClickTracking(clickLabel || componentName);
  const trackInteraction = useInteractionTracking();

  useScrollTracking(
    trackScrollView ? elementRef : { current: null },
    componentName
  );

  const handleClickEvent = () => {
    if (trackClicks) {
      handleClick();
    }
    onClick?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (trackClicks && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleClickEvent();
    }
  };

  const handleInteractionEvent = (
    action: string,
    value?: string | number | boolean
  ) => {
    if (trackInteractions) {
      trackInteraction(componentName, action, value);
    }
    onInteraction?.(action, value);
  };

  return (
    <div
      ref={elementRef}
      className={className}
      onClick={trackClicks ? handleClickEvent : onClick}
      onKeyDown={trackClicks ? handleKeyDown : undefined}
      role={trackClicks ? "button" : undefined}
      tabIndex={trackClicks ? 0 : undefined}
      data-tracking-component={componentName}
    >
      {typeof children === "function"
        ? (
            children as (props: {
              trackInteraction: typeof handleInteractionEvent;
            }) => React.ReactNode
          )({ trackInteraction: handleInteractionEvent })
        : children}
    </div>
  );
}

export default TrackingWrapper;
