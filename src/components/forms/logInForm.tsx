import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { customFetchClient } from "@/features/fetchClient";
import { useLogIn } from "@/features/hooks";
import { User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Typography } from "../ui/Typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const LogInForm = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(25),
  });

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const logIn = useLogIn();

  async function onSubmit(values: z.infer<typeof logInSchema>) {
    try {
      const { data: user } = await customFetchClient.post<User>(
        "/auth/login",
        values
      );
      if (user) {
        logIn(user);
        navigate("/home");
      }
    } catch (error) {
      setErrorMsg("Identifiants incorrects");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Renseignez vos identifiants</CardTitle>
        {errorMsg && (
          <Typography variant={"large"} className="text-red-500">
            {errorMsg}
          </Typography>
        )}
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Connexion</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
