import { NotificationsProvider } from "./providers/notifications.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/sonner";
import { Router } from "./router";
import { UserProvider } from "./providers/user.provider";

const client = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={client}>
      <UserProvider>
        <NotificationsProvider>
          <Router />
          <Toaster />
          <ReactQueryDevtools />
        </NotificationsProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
