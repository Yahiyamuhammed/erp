import api from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/companies", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
    },
  });
};
