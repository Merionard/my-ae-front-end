import { useConnectedUserStore } from "@/features/store";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export const AuthentBtn = () => {
  const { cleanUser } = useConnectedUserStore();
  const logOut = () => {
    cleanUser();
    window.localStorage.removeItem("auth_token");
  };

  return (
    <Button onClick={() => logOut()} variant={"destructive"}>
      {<LogOut size={12} className="mr-2" />}Déconnexion
    </Button>
  );
};
