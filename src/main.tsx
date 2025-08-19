import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";

// Register service worker for caching and offline support
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }

// Performance monitoring
if (process.env.NODE_ENV === "development") {
  // Log performance metrics in development
  window.addEventListener("load", () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.group("🚀 Initial Load Performance");
        console.log(
          `TTFB: ${navigation.responseStart - navigation.requestStart}ms`
        );
        console.log(
          `DOM Content Loaded: ${
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart
          }ms`
        );
        console.log(
          `Load Complete: ${
            navigation.loadEventEnd - navigation.loadEventStart
          }ms`
        );
        console.groupEnd();
      }
    }, 1000);
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
