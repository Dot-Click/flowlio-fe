import {
  FC,
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { createAuthClient, type BetterFetchError } from "better-auth/react";
import {
  adminClient,
  emailOTPClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import * as permissions from "@/configs/permission.config";
import { backendDomain } from "@/configs/axios.config";

const { ac, ...roles } = permissions;

export const authClient = createAuthClient({
  plugins: [adminClient({ ac, roles }), emailOTPClient(), twoFactorClient()],
  baseURL: backendDomain,
});

type SessionObject = typeof authClient.$Infer.Session;
export type Role = keyof typeof roles;

type Data = {
  // Typed role property( Modify as needed )
  user: SessionObject["user"] & { role: Role };
  session: SessionObject["session"];
};

interface ContextData {
  refetchUser: () => void;
  isLoading: boolean;
  data: Data | null;
}

interface BeterAuthProviderProps extends PropsWithChildren {
  /**
   * @type boolean
   * @default false
   * @description periodically fetches user if server throws error while fetching session, should be used for development reason.
   */
  refetchOnError?: boolean;
  /**
   * @type function
   * @param error Error
   * @returns void
   * @description contains session error.
   */
  onError?: (error: BetterFetchError) => void;
}

const UserAuthContext = createContext<ContextData>({} as any);

/**
 * UserProvider supplies authentication and user session context to the application.
 *
 * This provider manages user state, session, and loading status, and should wrap your app at the top level
 * (e.g., in App.tsx or main layout) to ensure all components have access to user context via useUser().
 *
 * @example
 *   <UserProvider>
 *     <App />
 *   </UserProvider>
 *
 * Must be used at the top level of your React component tree.
 */
export const UserProvider: FC<BeterAuthProviderProps> = ({
  onError,
  children,
  refetchOnError = false,
}) => {
  const { data: authData, isPending, error, refetch } = authClient.useSession();
  const [data, setData] = useState<ContextData["data"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refetchUser = refetch;

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
      return;
    }
    if (authData?.user && authData?.session) {
      setData(authData as Data);
      setIsLoading(false);
    } else {
      setData(null);
      setIsLoading(false);
    }
    if (error) {
      onError?.(error);
      if (refetchOnError) {
        setTimeout(() => {
          refetchUser();
        }, 1000);
      }
    }
  }, [authData, isPending, error, onError, refetchOnError]);

  return (
    <UserAuthContext.Provider
      value={{
        data,
        isLoading,
        refetchUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

/**
 * useUser is a custom hook that provides access to the current user, session, loading state, and a refetch function.
 *
 * Must be used within a UserProvider.
 *
 * @example
 *   const { data, isLoading, refetchUser } = useUser();
 *   if (isLoading) return <div>Loading...</div>;
 *   if (data?.user) return <div>Hello, {data.user.name}!</div>;
 *
 */
export const useUser = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("userUser must be used within a UserProvider");
  }
  return context;
};
