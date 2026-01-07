import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await api.get("/roles");
      return data;
    }
  });
};
