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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/features/services/userService";
import { useConnectedUserStore } from "@/features/store";
import { User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TypeActiviteEnums, UserZod, userSchema } from "./userSchema";

export const UserForm = ({ user }: { user: User }) => {
  const form = useForm<UserZod>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: user.email,
      image: user.image != null ? user.image : "undefined",
      lastName: user.lastName != null ? user.lastName : undefined,
      activity: user.activity != null ? user.activity : undefined,
      firstName: user.firstName != null ? user.firstName : undefined,
    },
  });
  const { setUser } = useConnectedUserStore();

  const navigate = useNavigate();
  const client = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: (user: UserZod) => updateUser(user),
    onSuccess: (data) => {
      toast.success("Données utilisateurs mises à jours avec succès!");
      setUser(data);
      navigate("/home");
      client.invalidateQueries("user");
    },
  });

  function onSubmit(values: UserZod) {
    updateUserMutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type activité</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choissisez un type d'activité pour votre entreprise" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TypeActiviteEnums.map((type, index) => (
                    <SelectItem value={type.type} key={index}>
                      {type.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
};
