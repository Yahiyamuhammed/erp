import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useUpdateUser = (companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, payload }) => {
      const { data } = await api.put(`/users/${userId}`, payload,{
        params: companyId ? { companyId } : {},
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
