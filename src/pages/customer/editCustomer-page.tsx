import { CustomerForm } from "@/components/forms/customer/customerForm";
import { Card, CardContent } from "@/components/ui/card";

import { useCheckConnection } from "@/features/hooks";
import { fetchOneCustomer } from "@/features/urlAPI";
import { Loader2 } from "lucide-react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export function EditCustomerPage() {
  useCheckConnection();

  const { id } = useParams();

  const { data: customer, isSuccess } = useQuery(["customer", id], () =>
    fetchOneCustomer(id)
  );
  if (!isSuccess) {
    <Loader2 className="animate-spin" />;
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent>
            <CustomerForm customer={null} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
