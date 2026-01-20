import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useCreateUser = (companyId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/users", payload,{
        params: companyId ? { companyId } : {},
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  });
};
