import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "kel-ui-components";
import { Badge } from "kel-ui-components";
import { Button } from "kel-ui-components";
import { ScrollArea } from "kel-ui-components";
import { analytics } from "@/lib/analytics";
import type {
  AnalyticsEvent,
  UserSession,
  ScrollMetrics,
} from "@/lib/analytics";

interface AnalyticsDashboardProps {
  className?: string;
}

export function AnalyticsDashboard({ className }: AnalyticsDashboardProps) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [scrollMetrics, setScrollMetrics] = useState<ScrollMetrics | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([]);

  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!isDevelopment) return;

    const updateData = () => {
      setSession(analytics.getSession());
      setScrollMetrics(analytics.getScrollMetrics());

      const currentSession = analytics.getSession();
      if (currentSession) {
        setRecentEvents(currentSession.events.slice(-10));
      }
    };

    updateData();

    const interval = setInterval(updateData, 2000);

    return () => clearInterval(interval);
  }, [isDevelopment]);

  if (!isDevelopment) {
    return null;
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const getEventTypeColor = (eventName: string) => {
    switch (eventName) {
      case "page_view":
        return "bg-blue-500";
      case "button_click":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "scroll_depth":
        return "bg-purple-500";
      case "form_submission":
        return "bg-orange-500";
      case "component_mounted":
        return "bg-cyan-500";
      case "component_unmounted":
        return "bg-gray-500";
      case "performance_metrics":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-2 bg-cyan-600 hover:bg-cyan-700"
        size="sm"
      >
        📊 Analytics {isVisible ? "▼" : "▲"}
      </Button>

      {isVisible && (
        <Card className="w-96 max-h-96 bg-gray-900 border-gray-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono text-cyan-400">
              Analytics Dashboard
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {session && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-cyan-300">Session</h4>
                <div className="text-xs space-y-1">
                  <div>
                    ID:{" "}
                    <span className="font-mono text-gray-300">
                      {session.id.slice(-8)}
                    </span>
                  </div>
                  <div>
                    Duration:{" "}
                    <span className="text-green-400">
                      {formatDuration(Date.now() - session.startTime)}
                    </span>
                  </div>
                  <div>
                    Page Views:{" "}
                    <span className="text-blue-400">{session.pageViews}</span>
                  </div>
                  <div>
                    Events:{" "}
                    <span className="text-purple-400">
                      {session.events.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {scrollMetrics && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-cyan-300">
                  Engagement
                </h4>
                <div className="text-xs space-y-1">
                  <div>
                    Max Scroll:{" "}
                    <span className="text-purple-400">
                      {scrollMetrics.maxDepth}%
                    </span>
                  </div>
                  <div>
                    Time on Page:{" "}
                    <span className="text-green-400">
                      {formatDuration(scrollMetrics.timeOnPage)}
                    </span>
                  </div>
                  <div>
                    Scroll Events:{" "}
                    <span className="text-blue-400">
                      {scrollMetrics.scrollEvents}
                    </span>
                  </div>
                  <div>
                    Engagement Score:{" "}
                    <span className="text-yellow-400">
                      {scrollMetrics.engagementScore}/100
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-cyan-300">
                Recent Events
              </h4>
              <ScrollArea className="h-32">
                <div className="space-y-1">
                  {recentEvents.map((event, index) => (
                    <div
                      key={index}
                      className="text-xs p-2 bg-gray-800 rounded"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-2 h-2 rounded-full ${getEventTypeColor(
                            event.name
                          )}`}
                        />
                        <span className="font-mono text-cyan-400">
                          {event.name}
                        </span>
                        <span className="text-gray-400 ml-auto">
                          {event.timestamp
                            ? formatTimestamp(event.timestamp)
                            : "N/A"}
                        </span>
                      </div>
                      {event.properties &&
                        Object.keys(event.properties).length > 0 && (
                          <div className="text-gray-300 ml-4">
                            {Object.entries(event.properties)
                              .slice(0, 2)
                              .map(([key, value]) => (
                                <div key={key} className="truncate">
                                  {key}: {String(value).substring(0, 20)}
                                  {String(value).length > 20 && "..."}
                                </div>
                              ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {session?.utm && Object.values(session.utm).some((v) => v) && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-cyan-300">
                  UTM Tracking
                </h4>
                <div className="text-xs space-y-1">
                  {Object.entries(session.utm).map(([key, value]) =>
                    value ? (
                      <div key={key}>
                        {key}: <span className="text-green-400">{value}</span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 font-mono pt-2 border-t border-gray-700">
              Development Mode Only
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AnalyticsDashboard;
