import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "./components/ui/provider.tsx";
import "./index.css";
import Chats from "./Pages/Chats.tsx";
import Error from "./Pages/Error.tsx";
import Home from "./Pages/Home.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <></>,
    children: [
      {
        path: "/",
        errorElement: <Error />,
        element: <Home />,
      },
      {
        path: "/chats",
        errorElement: <Error />,
        element: <Chats />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>
);
