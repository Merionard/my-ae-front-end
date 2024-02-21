import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCheckConnection } from "@/features/hooks";
import { fetchUser } from "@/features/services/userService";
import { useQuery } from "react-query";
import { UserForm } from "../../components/forms/user/userForm";

export default function MyAccountPage() {
  useCheckConnection();
  const { data: user, isSuccess, isError } = useQuery("user", fetchUser);

  if (isError) throw new Error("Aucun user trouvé");

  if (isSuccess) {
    return (
      <div className="container mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Mon compte</CardTitle>
          </CardHeader>
          <CardContent>
            <UserForm user={user} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
