import { InvoiceForm } from "@/components/forms/invoice/invoiceForm";
import { useCheckConnection } from "@/features/hooks";
import { fetchAllCustomers } from "@/features/services/customerService";
import { useQuery } from "react-query";

export const NewInvoicePage = () => {
  useCheckConnection();
  const {
    data: customers,

    isSuccess,
  } = useQuery("customers", () => fetchAllCustomers());
  if (isSuccess) {
    return (
      <div>
        <InvoiceForm customers={customers} />
      </div>
    );
  }
};
