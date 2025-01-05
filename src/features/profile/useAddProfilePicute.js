import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddProfilePicute = () => {
  return useMutation({
    mutationFn: async ({ image }) => {
      try {
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("cover", image);
        const response = await axiosInstance.post(
          "/api/users/profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
      throw new Error(error.message);
    },
    onSuccess: (data) => {},
  });
};
