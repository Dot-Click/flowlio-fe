import { NotificationsProvider } from "./providers/notifications.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/sonner";
import { Router } from "./router";

const client = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={client}>
      <NotificationsProvider>
        <Router />
        <Toaster />
        <ReactQueryDevtools />
      </NotificationsProvider>
    </QueryClientProvider>
  );                                   
};

export default App;
