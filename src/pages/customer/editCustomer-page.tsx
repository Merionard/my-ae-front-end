import { CustomerForm } from "@/components/forms/customer/customerForm";
import { customerSchema } from "@/components/forms/customer/customerSchemaAndTypes";
import { Card, CardContent } from "@/components/ui/card";

import { useCheckConnection } from "@/features/hooks";
import { fetchOneCustomer } from "@/features/services/customerService";
import { Loader2 } from "lucide-react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export function EditCustomerPage() {
  useCheckConnection();

  const { id } = useParams();
  if (!id) {
    throw new Error("Paramètre invalide!");
  }

  const {
    data: customer,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(["customer", id], () => fetchOneCustomer(id));

  if (isError) {
    throw new Error(
      "Un problème est survenue lors de la récupération des données"
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent>
            <Loader2 className="animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    const zodCustomer = customerSchema.parse(customer);
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent>
            <CustomerForm customer={zodCustomer} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
