import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchHomeBook = () => {
  return useQuery({
    queryKey: ["homebooks"],
    queryFn: async () => {
      const booksResponse = await axiosInstance.get("/api/books/home", {
        withCredentials: false,
      });
      return booksResponse.data;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
