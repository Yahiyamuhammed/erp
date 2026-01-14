import api from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRolePermissions = (companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, permissionIds }) => {
      const { data } = await api.put(
        `/roles/${roleId}/permissions`,
        {
          permissionIds,
        },
        {
          params: companyId ? {companyId} : {},
        }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["roles"]);
      queryClient.invalidateQueries(["role", variables.roleId]);
    },
  });
};
