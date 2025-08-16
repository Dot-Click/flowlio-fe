import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "@/providers/user.provider";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "superadmin" | "subadmin" | "user";
  requiredOrganization?: boolean;
}

const ROLE_HIERARCHY: Record<string, number> = {
  user: 1,
  subadmin: 2,
  superadmin: 3,
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
      toast.error("Authentication required");
      navigate("/auth/signin", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
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

export const UserRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="user">{children}</ProtectedRoute>
);
