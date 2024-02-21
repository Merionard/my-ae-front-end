import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Info } from "lucide-react";

export default function CaInfo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Info className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Info plafond CA</AlertDialogTitle>
          <AlertDialogDescription>
            Le plafond de votre CA dépend de votre type d&apos;activité.
            Veuillez saisir dans votre profil le type d&apos; activité qui vous
            correspond.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
