import { TodoList } from "@/lib/types";
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
