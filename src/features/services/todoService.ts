import { Task, TodoList } from "@/lib/types";
import { customFetchClient } from "../fetchClient";

const URL_API_TODOLIST = "/todoList";

export const fetchAllTodoList = async () => {
  const { data } = await customFetchClient.get<TodoList[]>(URL_API_TODOLIST);
  return data;
};

export const createUpdateToDoList = async (todo: TodoList) => {
  const { data } = await customFetchClient.post<TodoList[]>(
    URL_API_TODOLIST,
    todo
  );
  return data;
};

export const deleteTodoList = (title: string) => {
  return customFetchClient.delete(URL_API_TODOLIST + `/${title}`);
};

export const updateTask = async (task: Task) => {
  const { data } = await customFetchClient.post("/task", task);
  return data;
};

export const deleteTask = (id: number) => {
  return customFetchClient.delete(`/task/${id}`);
};
