import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "./components/ui/provider.tsx";
import "./index.css";
import Chats from "./Pages/Chats.tsx";
import Error from "./Pages/Error.tsx";
import Home from "./Pages/Home.tsx";
import Root from "./Root/Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <></>,
    element: <Root />,
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
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
