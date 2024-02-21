import { DashBoardInfo } from "@/lib/types";
import { customFetchClient } from "../fetchClient";

export const fetchDashboardInfos = async () => {
  const { data } = await customFetchClient.get<DashBoardInfo>("/dashboard");
  return data;
};
