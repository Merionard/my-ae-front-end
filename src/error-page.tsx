import { useRouteError } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string };
  console.error(error);

  return (
    <div className="container min-h-screen flex  justify-center items-center">
      <Card className="">
        <CardHeader>
          <CardTitle>
            <h1>Oops!</h1>
          </CardTitle>
          <CardDescription>
            <p>Sorry, an unexpected error has occurred.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
