import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const usePermissions = (companyId) => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data } = await api.get("/permissions", {
        params: companyId ? { companyId } : {},
      });
      return data.permissions;
    },
  });
};
