import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, permissionIds }) => {
      const { data } = await api.put(`/roles/${roleId}/permissions`, {
        permissionIds,
      });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["roles"]);
      queryClient.invalidateQueries(["role", variables.roleId]);
    },
  });
};
