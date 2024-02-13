import { Button } from "@/components/ui/button";
import { ConditionsReglementType, Invoice } from "@/lib/types";
import { Eye, Pencil } from "lucide-react";
import { DeleteAction } from "./deleteAction";
import { ValidateAction } from "./validateAction";
import { PayAction } from "./payAction";

export const Actions = (props: { invoice: Invoice }) => {
  console.log(props.invoice);
  const editAction = (
    <a href={`/invoice/edit/${props.invoice.id}`}>
      <Button size={"icon"} title="Editer" className="bg-orange-500">
        <Pencil size={16} />
      </Button>
    </a>
  );

  const showAction = (
    <a href={`/invoice/view/${props.invoice.id}`}>
      <Button size={"icon"} title="show">
        <Eye />
      </Button>
    </a>
  );

  let actions = null;

  if (props.invoice.status === "DRAFT") {
    actions = (
      <>
        {editAction}
        {showAction}
        <DeleteAction invoiceId={props.invoice.id} />
        <ValidateAction
          invoiceId={props.invoice.id}
          conditionReglement={
            props.invoice.conditionReglement as ConditionsReglementType
          }
        />
      </>
    );
  }
  if (props.invoice.status === "VALIDATED") {
    actions = (
      <>
        {showAction}
        <PayAction invoiceId={props.invoice.id} />
      </>
    );
  }

  if (props.invoice.status === "PAYED") {
    actions = <>{showAction}</>;
  }

  return <div className="flex gap-2">{actions}</div>;
};
