import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const usePermissions = (companyId, roleId, open) => {
  return useQuery({
    queryKey: ["permissions"],
    enabled: !!roleId && open,

    queryFn: async () => {
      const { data } = await api.get("/permissions", {
        params: {
          roleId,
          ...(companyId ? { companyId } : {}),
        },
      });
      return data.permissions;
    },
  });
};
