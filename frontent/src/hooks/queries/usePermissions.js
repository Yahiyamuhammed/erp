import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const usePermissions = () => {
  console.log('hit usepermission')
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data } = await api.get("/permissions");
      console.log(data)
      return data.permissions;
    },
  });
};
