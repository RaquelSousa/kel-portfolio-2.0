import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Focus the main content skip link or main content area
    // Find the main element or an element with id="main-content"
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      // Focus it so screen readers announce it
      mainContent.focus();
    } else {
      // Fallback: reset focus to top of document body if main-content isn't found
      document.body.focus();
    }
  }, [location.pathname]);

  return null;
}
