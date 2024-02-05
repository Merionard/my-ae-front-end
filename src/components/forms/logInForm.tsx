import { useForm } from "react-hook-form";
import { Typography } from "../ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { client } from "@/features/fetchClient";
import { User } from "@/lib/types";
import { LOG_IN } from "@/features/urlAPI";
import { redirect } from "react-router-dom";
import { setAuthToken } from "@/features/jwtHelper";

export const LogInForm = () => {
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

  async function onSubmit(values: z.infer<typeof logInSchema>) {
    const user = await client(LOG_IN, "POST", values, {} as User);
    if (user) setAuthToken(user.token);
    redirect("/");
  }

  return (
    <>
      <Typography variant={"h2"}>Bienvenue sur MY AE</Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          <Button type="submit" className="w-full">
            Connexion
          </Button>
        </form>
      </Form>
    </>
  );
};
