import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Pencil, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TaskItem } from "./taskItem";
import { toast } from "sonner";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { TodoList } from "@/lib/types";
import { useMutation, useQueryClient } from "react-query";
import { createUpdateTodoMutationFn } from "./mutation";
import { deleteTodoList } from "@/features/services/todoService";

export const ListItem = ({ todoList }: { todoList: TodoList }) => {
  useEffect(() => {
    setTasks([...todoList.tasks]);
  }, [todoList]);

  const [newTaskName, setNewTaskName] = useState<null | string>(null);
  const [newTaskDescription, setNewTaskDescritpion] = useState<
    undefined | string
  >(undefined);
  const [tasks, setTasks] = useState([...todoList.tasks]);
  const [todoListTitle, setTodoListTitle] = useState(todoList.title);
  const queryClient = useQueryClient();

  const createUpdateTodoListMutation = useMutation(
    createUpdateTodoMutationFn(queryClient)
  );
  const deleteTodoListMutation = useMutation({
    mutationFn: (title: string) => deleteTodoList(title),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      toast.success("Liste supprmimée avec succès!");
    },
    onError: () => alert("error!"),
  });

  const newTask = async (maxOrder: number) => {
    if (newTaskName) {
      const todo = {
        ...todoList,
        tasks: [...todoList.tasks, { title: newTaskName, order: maxOrder + 1 }],
      };
      createUpdateTodoListMutation.mutate(todo);
    }
  };

  const handleDeleteList = async (title: string) => {
    deleteTodoListMutation.mutate(title);
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const cloneTasks = [...tasks];
    const [removed] = cloneTasks.splice(result.source.index, 1);

    cloneTasks.splice(result.destination.index, 0, removed);
    cloneTasks.forEach((c, index) => (c.order = index + 1));
    createUpdateTodoListMutation.mutate({ ...todoList, tasks: cloneTasks });
    setTasks(cloneTasks);
  };

  const editTodoListTitle = async () => {
    /* createUpdateTodoListMutation.mutate({...todoList,tasks:cloneTasks})
    await updateTodoList(todoListTitle, todoList.title);
    toast.success("liste mise à jour");
    router.refresh(); */
  };
  return (
    <Card key={todoList.title}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>
            <span>{todoList.title}</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Pencil className="inline ms-1 cursor-pointer h-5" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Maj titre liste</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <div>
                      <Label>Titre</Label>
                      <Input
                        placeholder="titre"
                        onChange={(e) => setTodoListTitle(e.target.value)}
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={editTodoListTitle}>
                    Valider
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-full" size={"icon"}>
                <Plus />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Nouvelle tache</AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <div>
                    <Label>Titre</Label>
                    <Input
                      placeholder="tache"
                      onChange={(e) => setNewTaskName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Titre</Label>
                    <Input
                      placeholder="description"
                      onChange={(e) => setNewTaskDescritpion(e.target.value)}
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    newTask(
                      todoList.tasks.length === 0
                        ? 0
                        : Math.max(...todoList.tasks.map((t) => t.order))
                    )
                  }
                >
                  Valider
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`droppable${todoList.title}`}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={"d-flex flex-column gap-2 w-full"}
              >
                {tasks.map((t, index) => (
                  <Draggable
                    key={index}
                    draggableId={`draggable${String(index)}`}
                    index={index}
                  >
                    {(provided) => <TaskItem task={t} provided={provided} />}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
      <AlertDialog>
        <CardFooter className="flex justify-end">
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Supprimer</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer liste</AlertDialogTitle>
              <AlertDialogDescription>
                Vous etes sur le point de supprimer une liste avec toutes ses
                taches associée.Confirmez vous?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteList(todoList.title)}
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </CardFooter>
      </AlertDialog>
    </Card>
  );
};
