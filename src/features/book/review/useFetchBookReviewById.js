import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchBookReviewsById = async (id) => {
  const bookResponse = await axiosInstance.get(`/api/books/${id}/review`, {
    withCredentials: false,
  });
  return bookResponse.data;
};

export const useFetchBookReviewById = (id) => {
  return useQuery({
    queryKey: ["bookReviews", id],
    queryFn: () => fetchBookReviewsById(id),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: !!id,
  });
};
