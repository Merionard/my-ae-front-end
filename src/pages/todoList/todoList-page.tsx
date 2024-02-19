import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Todos } from "./todoList";
import { useCheckConnection } from "@/features/hooks";
import { useQuery } from "react-query";
import { fetchAllTodoList } from "@/features/services/todoService";

export default function TodoListPage() {
  useCheckConnection();
  const {
    data: todos,
    isError,
    isLoading,
    isSuccess,
  } = useQuery("todos", () => fetchAllTodoList());

  if (isError) {
    return "ERROR!!";
  }
  if (isLoading) {
    return "... loading";
  }

  if (isSuccess) {
    return (
      <div className="container mt-5">
        <Card>
          <CardHeader>
            <CardTitle>TODO</CardTitle>
          </CardHeader>
          <CardContent>
            <Todos todoList={todos} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
