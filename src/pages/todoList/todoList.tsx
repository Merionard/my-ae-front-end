import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TodoList } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ListItem } from "./listItem";
import { createUpdateTodoMutationFn } from "./mutation";

export const Todos = ({ todoList }: { todoList: TodoList[] }) => {
  const [newThemeName, setNewThemeName] = useState<null | string>(null);
  const queryClient = useQueryClient();

  const createUpdateTodoListMutation = useMutation(
    createUpdateTodoMutationFn(queryClient)
  );

  const addTheme = async () => {
    if (newThemeName) {
      createUpdateTodoListMutation.mutate({
        tasks: [],
        title: newThemeName,
      });
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex justify-end">
            <Button>
              <PlusCircle className="me-2" /> Liste
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nouvelle liste</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                placeholder="Titre"
                onChange={(e) => setNewThemeName(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={addTheme}>Valider</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
        {todoList.map((list) => (
          <ListItem key={list.title} todoList={list} />
        ))}
      </div>
    </div>
  );
};
