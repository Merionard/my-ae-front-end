import { LogInForm } from "@/components/forms/logInForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useParams } from "react-router-dom";

export default function LogInPage() {
  const { reason } = useParams();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52"></div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-red-600">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" />
          <Button onClick={() => alert("coucou")}>Log in</Button>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <div className="w-2/5">
            {reason === "unauthorized" && (
              <Alert className="mb-3">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Votre session a expiré!</AlertTitle>
                <AlertDescription>Veuillez vous reconnecter!</AlertDescription>
              </Alert>
            )}
            <LogInForm />
          </div>
        </div>
      </div>
    </main>
  );
}
