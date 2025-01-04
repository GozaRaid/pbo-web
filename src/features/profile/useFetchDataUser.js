import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDataUser = () => {
  return useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      const userResponse = await axiosInstance.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return userResponse.data;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
