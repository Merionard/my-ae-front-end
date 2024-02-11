import { useCheckConnection } from "@/features/hooks";
import { fetchAllCustomers } from "@/features/services/customerService";
import { useQuery } from "react-query";
import CraTable from "./craTable";

export const CraPage = () => {
  useCheckConnection();
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
        <CraTable customers={customers} />
      </div>
    );
  }
};
