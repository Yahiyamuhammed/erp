import { useMutation } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post("/auth/login", payload);
      return data;
    }
  });
};
