import { RadixToaster } from "kel-ui-components";
import { SonnerToaster } from "kel-ui-components";
import { TooltipProvider } from "kel-ui-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import PageErrorBoundary from "./components/PageErrorBoundary";
import { RouteLoader } from "./utils/lazyLoad";
import { useAnalytics } from "./hooks/useAnalytics";
import { trackError } from "./lib/analytics";
import { ScrollProgress } from "kel-ui-components";
import { pageVariants } from "@/lib/animations";

const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error && "status" in error && typeof error.status === "number") {
          return error.status >= 500 && failureCount < 3;
        }
        return failureCount < 3;
      },
    },
  },
});

function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}

const App = () => (
  <ErrorBoundary
    showDetails={process.env.NODE_ENV === "development"}
    onError={(error, errorInfo) => {
      console.error("Application Error:", { error, errorInfo });

      trackError(error, {
        level: "critical",
        component: "App",
        errorInfo: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnalyticsProvider>
          <ScrollProgress />

          <RadixToaster />
          <SonnerToaster />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Suspense fallback={<RouteLoader />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PageErrorBoundary pageName="homepage">
                        <motion.div
                          variants={pageVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Index />
                        </motion.div>
                      </PageErrorBoundary>
                    }
                  />
                  <Route
                    path="/blog"
                    element={
                      <PageErrorBoundary pageName="blog page">
                        <motion.div
                          variants={pageVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Blog />
                        </motion.div>
                      </PageErrorBoundary>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <PageErrorBoundary pageName="404 page">
                        <motion.div
                          variants={pageVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <NotFound />
                        </motion.div>
                      </PageErrorBoundary>
                    }
                  />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </BrowserRouter>
        </AnalyticsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
