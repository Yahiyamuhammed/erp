import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload) => {
      await api.post("/auth/login", payload);
    },
  });
};
