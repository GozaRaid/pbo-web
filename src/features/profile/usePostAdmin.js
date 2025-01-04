import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const usePostAdmin = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.post("/api/users/admin", id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    },
  });
};
