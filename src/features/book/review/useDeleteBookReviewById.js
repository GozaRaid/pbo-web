import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useDeleteBookReviewById = () => {
  return useMutation({
    mutationFn: async ({ bookId }) => {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      try {
        const response = await axiosInstance.delete(
          `/api/books/${bookId}/review`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
  });
};
