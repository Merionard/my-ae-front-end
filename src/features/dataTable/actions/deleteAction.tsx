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
import { Trash2 } from "lucide-react";

export const DeleteAction = (props: { invoiceId: number }) => {
  async function onConfirmDelete() {
    /*     const deletedInvoice = await deleteInvoice(props.invoiceId);
    if (deletedInvoice) {
      toast.success("la facture " + deletedInvoice.number + " a été supprimée");
    } else {
      toast.error("une erreur est survenue");
    } */
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
