import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { toast } from "sonner";
import { Megaphone, MegaphoneOff, Trash } from "lucide-react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Task } from "@/lib/types";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask, updateTask } from "@/features/services/todoService";

export const TaskItem = ({
  task,
  provided,
}: {
  task: Task;
  provided: DraggableProvided;
}) => {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: (task: Task) => updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      toast.success("Tache mise à jour!");
    },
    onError() {
      alert("erreur");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      toast.success("Tache supprimée");
    },
    onError() {
      alert("erreur");
    },
  });

  const checkTask = async (check: boolean | string) => {
    updateTaskMutation.mutate({ ...task, status: check ? "DONE" : "OPEN" });
  };

  const onClickDelete = async (taskId: number | undefined) => {
    if (!taskId) return;
    deleteTaskMutation.mutate(taskId);
  };

  const toogleCritical = async () => {
    updateTaskMutation.mutate({ ...task, critical: !task.critical });
  };
  return (
    <div
      ref={provided.innerRef}
      className={clsx(
        "border-b-2 ps-3 flex justify-between mb-3 rounded-md  p-3 ",
        { "bg-red-500": task.critical, "bg-green-400": !task.critical }
      )}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.status === "DONE"}
          onCheckedChange={(e) => checkTask(e.valueOf())}
        />
        <p
          className={clsx({
            "line-through": task.status === "DONE",
          })}
        >
          {task.title}
        </p>
      </div>
      <div className="flex gap-2">
        {task.critical ? (
          <MegaphoneOff className="cursor-pointer" onClick={toogleCritical} />
        ) : (
          <Megaphone className="cursor-pointer" onClick={toogleCritical} />
        )}

        <Trash
          onClick={() => onClickDelete(task.id)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
