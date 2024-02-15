import { InvoiceForm } from "@/components/forms/invoice/invoiceForm";
import { useCheckConnection } from "@/features/hooks";
import { fetchAllCustomers } from "@/features/services/customerService";
import { fetchInvoice } from "@/features/services/invoiceService";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const EditInvoicePage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Paramètre invalide!");
  }
  useCheckConnection();
  const { data: customers, isSuccess } = useQuery("customers", () =>
    fetchAllCustomers()
  );

  const { data: invoice, isSuccess: loadInvoiceSuccess } = useQuery(
    ["invoice", id],
    () => fetchInvoice(id)
  );

  console.log(invoice);

  if (isSuccess && loadInvoiceSuccess) {
    return (
      <div>
        <InvoiceForm customers={customers} invoiceToEdit={invoice} />
      </div>
    );
  }
};
