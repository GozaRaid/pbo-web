import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const usePutDisplayname = () => {
  return useMutation({
    mutationFn: async ({ displayname }) => {
      console.log(displayname);
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axiosInstance.put(
          "/api/users/profile",
          {
            displayName: displayname,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
