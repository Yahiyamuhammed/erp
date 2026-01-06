import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/me");
      return data;
    },
    retry: false
  });
};
