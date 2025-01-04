import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchRecomendationBooks = () => {
  return useQuery({
    queryKey: ["upcomingbooks"],
    queryFn: async () => {
      const booksResponse = await axiosInstance.get(
        "/api/books/recommendation",
        {
          withCredentials: false,
        }
      );
      return booksResponse.data;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
