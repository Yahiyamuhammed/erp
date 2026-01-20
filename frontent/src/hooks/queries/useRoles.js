import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useRoles = (companyId) => {
  return useQuery({
    queryKey: ["roles", companyId],
    queryFn: async () => {
      const { data } = await api.get("/roles", {
        params: companyId ? { companyId } : {},
      });
      return data.roles;
    },
  });
};

export const useRoleById = (roleId, companyId) => {
  return useQuery({
    queryKey: ["role", roleId, companyId],
    enabled: !!roleId,
    queryFn: async () => {
      const { data } = await api.get(`/roles/${roleId}`, {
        params: companyId ? { companyId } : {},
      });
      return data.role;
    },
  });
};
