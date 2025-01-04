import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
  return useQuery({
    queryKey: ["userall"],
    queryFn: async () => {
      const userResponse = await axiosInstance.get("/api/users/all");

      return userResponse.data;
    },
  });
};
