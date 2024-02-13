import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ConditionsReglementType } from "@/lib/types";
import { getLastDayOfMonth } from "../columnsDatatableInvoice";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
export const ValidateAction = (props: {
  invoiceId: number;
  conditionReglement: ConditionsReglementType;
}) => {
  async function onConfirmValidate() {
    let dueDate = new Date();
    switch (props.conditionReglement) {
      case "30 jours fin de mois":
        dueDate.setDate(dueDate.getDate() + 30);
        dueDate = getLastDayOfMonth(dueDate.getFullYear(), dueDate.getMonth());
        break;
      case "45 jours":
        dueDate.setDate(dueDate.getDate() + 45);
        break;
      case "45 jours fin de mois":
        dueDate.setDate(dueDate.getDate() + 45);
        dueDate = getLastDayOfMonth(dueDate.getFullYear(), dueDate.getMonth());
        break;
      case "60 jours":
        dueDate.setDate(dueDate.getDate() + 60);
        break;
      case "60 jours fin de mois":
        dueDate.setDate(dueDate.getDate() + 60);
        dueDate = getLastDayOfMonth(dueDate.getFullYear(), dueDate.getMonth());
        break;
      case "90 jours":
        dueDate.setDate(dueDate.getDate() + 90);
        break;
    }
    /*     const validatedInvoice = await validateInvoice(props.invoiceId, dueDate);
    if (validatedInvoice) {
      toast.success("la facture " + validatedInvoice.number + " a été validée");
    } else {
      toast.error("une erreur est survenue");
    } */
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-500" size={"icon"}>
          <Check />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sur?</AlertDialogTitle>
          <AlertDialogDescription>
            Après validation, cette facture ne pourra plus étre modifiée
            confirmez vous?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmValidate}>
            Valider
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
