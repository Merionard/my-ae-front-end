import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogInForm } from "./logInForm";
import { RegisterForm } from "./registerForm";

export function TabLogin() {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Se connecter</TabsTrigger>
        <TabsTrigger value="register">Créer compte</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LogInForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
