import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorPage } from "./error-page";
import LogInPage from "./pages/login-page";
import { InvoicePage } from "./pages/invoice-page";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/invoice",
          element: <InvoicePage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LogInPage />,
    },
  ]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
