import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/users", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  });
};
