import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useUsers = (companyId) => {
  return useQuery({
    queryKey: ["users", companyId],
    queryFn: async () => {
      const { data } = await api.get("/users", {
        params: companyId ? { companyId } : {},
      });
      return data.users;
    },
  });
};
