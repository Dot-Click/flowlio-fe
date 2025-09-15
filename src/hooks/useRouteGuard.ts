import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "@/providers/user.provider";
import { toast } from "sonner";

export const useRouteGuard = () => {
  const { data: userData, isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const lastRedirectRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;

    console.log("Route Guard Check:", {
      currentPath,
      isLoading,
      hasUser: !!userData?.user,
      userRole: userData?.user?.role,
      lastRedirect: lastRedirectRef.current,
    });

    // Don't check while loading - this is crucial to prevent white screen
    if (isLoading) {
      console.log("Route Guard: Still loading, skipping check");
      return;
    }

    // Don't check public routes - this is crucial!
    if (
      currentPath === "/" ||
      currentPath === "/pricing" ||
      currentPath === "/workflow" ||
      currentPath === "/insights" ||
      currentPath.startsWith("/auth/") ||
      currentPath === "/checkout"
    ) {
      console.log("Route Guard: Public route, skipping check");
      lastRedirectRef.current = null; // Reset redirect flag for public routes
      return;
    }

    // Add a small delay before checking authentication to prevent race conditions
    const timeoutId = setTimeout(() => {
      // Check if user is authenticated
      if (!userData?.user) {
        // Only redirect if we haven't already redirected to this path
        if (lastRedirectRef.current !== currentPath) {
          console.log("Route Guard: No user, redirecting to signin");
          lastRedirectRef.current = currentPath;
          toast.error("Authentication required");
          navigate("/auth/signin", {
            replace: true,
            state: { from: currentPath },
          });
        }
        return;
      }

      // User is authenticated, reset redirect flag
      lastRedirectRef.current = null;
      console.log("Route Guard: User authenticated, access granted");
    }, 50); // Small delay to prevent race conditions

    return () => clearTimeout(timeoutId);
  }, [userData, isLoading, location.pathname, navigate]);

  return { user: userData?.user, isLoading };
};
