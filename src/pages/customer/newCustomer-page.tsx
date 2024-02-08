import { CustomerForm } from "@/components/forms/customer/customerForm";
import { Card, CardContent } from "@/components/ui/card";

import { useCheckConnection } from "@/features/hooks";

export function NewCustomerPage() {
  useCheckConnection();
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
