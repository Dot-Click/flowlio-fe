import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "@/providers/user.provider";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "superadmin" | "subadmin" | "operator" | "viewer" | "user";
  requiredOrganization?: boolean;
}

const ROLE_HIERARCHY: Record<string, number> = {
  user: 1,
  viewer: 2,
  operator: 3,
  subadmin: 4,
  superadmin: 5,
};

const hasRole = (userRole: string, requiredRole: string): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

export const ProtectedRoute = ({
  children,
  requiredRole,
  requiredOrganization = false,
}: ProtectedRouteProps) => {
  const { data: userData, isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (!userData?.user) {
      // Only show error if we're sure there's no session (not just loading)
      // Add a small delay to prevent race conditions during login
      const timeoutId = setTimeout(() => {
        if (!userData?.user) {
          toast.error("Authentication required");
          navigate("/auth/signin", {
            replace: true,
            state: { from: location.pathname },
          });
        }
      }, 1000); // 1 second delay

      return () => clearTimeout(timeoutId);
    }

    const user = userData.user;

    if (requiredRole && user.role) {
      if (!hasRole(user.role, requiredRole)) {
        toast.error(`Access denied. Required role: ${requiredRole}`);
        // Go back to previous page instead of redirectTo
        navigate(-1);
        return;
      }
    }

    if (requiredOrganization && !user.organizationId) {
      toast.error("Organization access required");
      // Go back to previous page instead of dashboard
      navigate(-1);
      return;
    }
  }, [
    userData,
    isLoading,
    requiredRole,
    requiredOrganization,
    navigate,
    location,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we verify your access
          </p>
        </div>
      </div>
    );
  }

  if (!userData?.user) {
    return null;
  }

  const user = userData.user;

  if (requiredRole && user.role && !hasRole(user.role, requiredRole)) {
    return null;
  }

  if (requiredOrganization && !user.organizationId) {
    return null;
  }

  return <>{children}</>;
};

export const SuperAdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="superadmin">{children}</ProtectedRoute>
);

export const SubAdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="subadmin">{children}</ProtectedRoute>
);

export const OperatorRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="operator">{children}</ProtectedRoute>
);

export const ViewerRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="viewer">{children}</ProtectedRoute>
);

export const UserRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="user">{children}</ProtectedRoute>
);
