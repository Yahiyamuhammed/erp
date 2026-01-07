import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, payload }) => {
      const { data } = await api.put(`/users/${userId}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
