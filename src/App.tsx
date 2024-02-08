import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorPage } from "./error-page";
import LogInPage from "./pages/login-page";
import { InvoicePage } from "./pages/invoice-page";
import { QueryClient, QueryClientProvider } from "react-query";
import { CustomerPage } from "./pages/customer/customer-page";
import { NewCustomerPage } from "./pages/customer/newCustomer-page";
import { EditCustomerPage } from "./pages/customer/editCustomer-page";

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
        {
          path: "/customers",
          element: <CustomerPage />,
        },
        {
          path: "/customers/new",
          element: <NewCustomerPage />,
        },
        {
          path: "/customers/edit/:id",
          element: <EditCustomerPage />,
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
