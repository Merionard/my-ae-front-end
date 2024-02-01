import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorPage } from "./error-page";
import LogInPage from "./pages/login-page";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/invoice",
          element: <div>invoice</div>,
        },
      ],
    },
    {
      path: "/login",
      element: <LogInPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
