import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchSearchBooks = (query) => {
  return useQuery({
    queryKey: ["searchBooks", query],
    queryFn: async () => {
      const booksResponse = await axiosInstance.get("/api/books/search", {
        withCredentials: false,
        params: {
          q: query,
        },
      });
      return booksResponse.data;
    },
    enabled: !!query,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
