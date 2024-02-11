import { useCheckConnection } from "@/features/hooks";
import { useConnectedUserStore } from "@/features/store";
import { fetchAllCustomers } from "@/features/urlAPI";
import { useQuery } from "react-query";

export const CraPage = () => {
  useCheckConnection();
  const { user } = useConnectedUserStore();
  const {
    data: customers,
    isError,
    isLoading,
    isSuccess,
  } = useQuery("customers", () => fetchAllCustomers());

  if (isError) {
    return <h1>error</h1>;
  }
  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isSuccess) {
    return (
      <div className="container mt-5">
        <CraTable
          users={users}
          userId={session.user.id}
          customers={customers}
        />
      </div>
    );
  }
};
