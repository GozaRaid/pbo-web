import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/AuthContext";

export const usePostAuth = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await axiosInstance.post("/api/authentications", {
        username,
        password,
      });

      return response.data;
    },
    onSuccess: (data) => {
      login(data.token);
    },
  });
};
