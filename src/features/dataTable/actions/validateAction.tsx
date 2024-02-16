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
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { validateInvoice } from "@/features/services/invoiceService";
export const ValidateAction = (props: {
  invoiceId: number;
  conditionReglement: ConditionsReglementType;
}) => {
  const queryClient = useQueryClient();
  const validateInvoiceMutation = useMutation({
    mutationFn: (invoiceId: number) => validateInvoice(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
      toast.success("Validation facture effectuée avec succès!");
    },
  });
  function onConfirmValidate() {
    validateInvoiceMutation.mutate(props.invoiceId);
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
