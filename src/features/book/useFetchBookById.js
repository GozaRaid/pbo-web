import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchBookById = (id) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const bookResponse = await axiosInstance.get(`/api/books/${id}`, {
        withCredentials: false,
      });
      return bookResponse.data;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: !!id,
  });
};
