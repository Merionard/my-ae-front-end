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
import { Button } from "@/components/ui/button";
import { Euro } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useMutation, useQueryClient } from "react-query";
import { payInvoice } from "@/features/services/invoiceService";
import { toast } from "sonner";

export const PayAction = (props: { invoiceId: number }) => {
  const [payDate, setPayDate] = useState<Date | undefined>(new Date());

  const queryClient = useQueryClient();
  const payInvoiceMutation = useMutation({
    mutationFn: (params: { invoiceId: number; payDate: Date }) =>
      payInvoice(params.invoiceId, params.payDate),
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
      toast.success("Facture payée avec succès!");
    },
  });

  function onConfirmPay() {
    if (!payDate) {
      alert("Veuillez sélectionner une date de paiement!");
      return;
    }
    payInvoiceMutation.mutate({ invoiceId: props.invoiceId, payDate });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-500" size={"icon"}>
          <Euro />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Veuillez sélectionner la date de paiement
          </AlertDialogTitle>
          <AlertDialogDescription className="mx-auto">
            <Calendar
              mode="single"
              selected={payDate}
              onSelect={setPayDate}
              className="rounded-md border"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmPay}>
            Marqué comme payé le {payDate?.toLocaleDateString()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
