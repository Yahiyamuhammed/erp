import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useAuthMe = () => {
  return useQuery({
    queryKey: ["authMe"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data;
    },
    retry: false,
  });
};
