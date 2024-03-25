import { TabLogin } from "@/components/forms/logInTab";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function LogInPage() {
  const { reason } = useParams();
  useEffect(() => {
    if (reason === "unauthorized") {
      window.localStorage.removeItem("auth_token");
    }
  }, [reason]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-6">
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
          <strong>Bienvenue sur Mon Auto-entreprise! </strong>
          Retrouvez les outils nécessaires à la bonne gestion de votre
          auto-entreprise.
        </p>
      </div>
      <div className="w-full m-auto md:w-1/4">
        {reason === "unauthorized" && (
          <Alert className="mb-3">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Votre session a expiré!</AlertTitle>
            <AlertDescription>Veuillez vous reconnecter!</AlertDescription>
          </Alert>
        )}
        <TabLogin />
      </div>
    </div>
  );
}
