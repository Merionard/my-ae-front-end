import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export const AuthentBtn = () => {
  return (
    <Button onClick={() => alert("signOut")} variant={"destructive"}>
      {<LogOut size={12} className="mr-2" />}Déconnexion
    </Button>
  );
};
