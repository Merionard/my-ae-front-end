import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorPage } from "./error-page";
import LogInPage from "./pages/login-page";
import { InvoicePage } from "./pages/invoice/invoice-page";
import { QueryClient, QueryClientProvider } from "react-query";
import { CustomerPage } from "./pages/customer/customer-page";
import { NewCustomerPage } from "./pages/customer/newCustomer-page";
import { EditCustomerPage } from "./pages/customer/editCustomer-page";
import { CraPage } from "./pages/cra/cra-page";
import { NewInvoicePage } from "./pages/invoice/newInvoice-page";
import { EditInvoicePage } from "./pages/invoice/editInvoice-page";

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
          path: "/invoice/new",
          element: <NewInvoicePage />,
        },
        {
          path: "/invoice/edit/:id",
          element: <EditInvoicePage />,
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
        {
          path: "/cra",
          element: <CraPage />,
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
