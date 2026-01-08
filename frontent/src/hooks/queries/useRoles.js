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
export const useRoleById = (roleId) => {
  return useQuery({
    queryKey: ["role", roleId],
    enabled: !!roleId,
    queryFn: async () => {
      const { data } = await api.get(`/roles/${roleId}`);
      return data.role;
    },
  });
};