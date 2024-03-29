import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { columnsInvoice } from "../../features/dataTable/columnsDatatableInvoice";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { DataTable } from "@/components/ui/dataTable";
import { useCheckConnection } from "@/features/hooks";
import { fetchAllInvoices } from "@/features/services/invoiceService";
import { useQuery } from "react-query";

export const InvoicePage = () => {
  useCheckConnection();
  const {
    data: invoices,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: "invoices",
    queryFn: () => fetchAllInvoices(),
    onError(err) {
      console.log(err);
    },
  });

  if (isError) {
    return <h1>error</h1>;
  }
  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isSuccess) {
    return (
      <div className="container mx-auto mt-5">
        <Card>
          <CardHeader>
            <a href="/invoice/new" className="flex justify-end">
              <Button>
                <PlusCircle size={"sm"} className="mr-2" />
                Nouvelle facture
              </Button>
            </a>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columnsInvoice}
              data={invoices}
              filter="number"
              filterName="Numéro de facture"
            />
          </CardContent>
        </Card>
      </div>
    );
  }
};
