import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUpcomingBooks = () => {
  return useQuery({
    queryKey: ["recomendationbooks"],
    queryFn: async () => {
      const booksResponse = await axiosInstance.get("/api/books/upcoming", {
        withCredentials: false,
      });
      return booksResponse.data;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
