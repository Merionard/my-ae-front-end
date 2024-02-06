import { useLogOut } from "@/features/hooks";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export const AuthentBtn = () => {
  const logOut = useLogOut();

  return (
    <Button onClick={() => logOut()} variant={"destructive"}>
      {<LogOut size={12} className="mr-2" />}Déconnexion
    </Button>
  );
};
