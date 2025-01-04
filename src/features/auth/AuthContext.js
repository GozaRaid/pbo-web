import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useFetchDataUser } from "../profile/useFetchDataUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  // Fetch user data
  const { data: fetchedUserData, isSuccess, isLoading } = useFetchDataUser();

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Check authentication status
  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setAccessToken(token);
        setIsLoggedIn(true);
      } else {
        logout();
      }
    } else {
      logout();
    }
  }, []);

  // Update user data when fetched and user is logged in
  useEffect(() => {
    if (isSuccess && fetchedUserData) {
      setUserData(fetchedUserData);
    }
  }, [isSuccess, fetchedUserData]);

  // Run checkAuthStatus on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Login function
  const login = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setAccessToken(token);
      setIsLoggedIn(true);
      setUserData(decodedToken);
      localStorage.setItem("accessToken", token);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    setAccessToken(null);
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("accessToken");
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn,
        userData,
        login,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
