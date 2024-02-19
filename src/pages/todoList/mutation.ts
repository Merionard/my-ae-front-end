import { createUpdateToDoList } from "@/features/services/todoService";
import { TodoList } from "@/lib/types";
import { QueryClient } from "react-query";
import { toast } from "sonner";

export const createUpdateTodoMutationFn = (queryClient: QueryClient) => {
  return {
    mutationFn: (todo: TodoList) => createUpdateToDoList(todo),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      toast.success("Nouvelle liste ajoutée/modifiée avec succès!");
    },
    onError() {
      alert("erreur");
    },
  };
};
