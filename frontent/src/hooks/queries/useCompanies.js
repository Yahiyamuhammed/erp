import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const useCompanies = (companyId) => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await api.get("/companies");
      return data;
    },
  });
};
