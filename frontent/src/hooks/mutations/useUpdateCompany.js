import api from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, payload }) => {
      const { data } = await api.put(`/companies/${companyId}`, payload);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["companies"]);
      queryClient.invalidateQueries(["company", variables.companyId]);
    },
  });
};
