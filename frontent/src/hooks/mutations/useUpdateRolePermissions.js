import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, permissions }) => {
      const { data } = await api.put(
        `/roles/${roleId}/permissions`,
        { permissions }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["roles"]);
      queryClient.invalidateQueries(["role", variables.roleId]);
    },
  });
};
