import { useQuery } from "@tanstack/react-query";

export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data } = await api.get("/permissions");
      return data.permissions;
    },
  });
};
