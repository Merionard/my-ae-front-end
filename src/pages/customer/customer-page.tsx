import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCheckConnection } from "@/features/hooks";
import { DataTable } from "@/components/ui/dataTable";
import { useQuery } from "react-query";
import { fetchAllCustomers } from "@/features/urlAPI";
import { columns } from "@/features/dataTable/customerColumnsDatatable";

export const CustomerPage = () => {
  useCheckConnection();
  const {
    data: customers,
    isError,
    isLoading,
    isSuccess,
  } = useQuery("customers", () => fetchAllCustomers());

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
            <a href="/customers/new" className="flex justify-end">
              <Button>
                <PlusCircle size={"sm"} className="mr-2" />
                Nouveau client
              </Button>
            </a>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={customers}
              filter="businessName"
              filterName="Nom"
            />
          </CardContent>
        </Card>
      </div>
    );
  }
};
