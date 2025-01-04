import axios from "axios";
// import jwtDecode from "jwt-decode"; // Library to decode JWT payload
import { apiurl } from "./config";
// import { getAccessToken, setAccessToken } from "./tokenManager";

const axiosInstance = axios.create({
  baseURL: apiurl.baseUrl,
});

// Function to check if the token is near its expiry
// function isTokenExpired(token, bufferSeconds = 60) {
//   try {
//     console.log(token);
//     const decoded = jwtDecode(token); // Decode JWT
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     return decoded.exp - currentTime <= bufferSeconds; // Token is expired or near expiry
//   } catch (error) {
//     return true; // Assume expired if decoding fails
//   }
// }

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { response, config } = error;
//     const token = getAccessToken();

//     if (
//       token &&
//       response &&
//       response.status === 401 &&
//       !config.__isRetryRequest &&
//       isTokenExpired(token)
//     ) {
//       config.__isRetryRequest = true; // Prevent infinite retries
//       try {
//         // Refresh the token
//         const refreshResponse = await axiosInstance.put("/authentications");
//         const newAccessToken = refreshResponse.data.data.accessToken;
//         setAccessToken(newAccessToken);

//         // Retry the original request with the new token
//         config.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axiosInstance(config);
//       } catch (refreshError) {
//         return Promise.reject(refreshError); // Reject if refresh fails
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export { axiosInstance };
