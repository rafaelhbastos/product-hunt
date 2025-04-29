import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "./pages/posts";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Posts />
      </div>
    </QueryClientProvider>
  );
};

export default App;
