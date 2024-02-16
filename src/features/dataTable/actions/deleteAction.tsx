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
import { deleteInvoice } from "@/features/services/invoiceService";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

export const DeleteAction = (props: { invoiceId: number }) => {
  const queryClient = useQueryClient();
  const deleteInvoiceMutation = useMutation({
    mutationFn: (id: number) => deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries("invoices");
      toast.success("Facture supprimée!");
    },
  });
  async function onConfirmDelete() {
    deleteInvoiceMutation.mutate(props.invoiceId);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"} title="Supprimer">
          <Trash2 size={"16"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sur?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est définitive. Confirmer la suppression de cette
            facture?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete}>
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
