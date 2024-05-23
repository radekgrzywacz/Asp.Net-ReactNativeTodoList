import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";
import { TOKEN_KEY, useAuth, API_URL } from "../context/AuthContext";

const baseURL = API_URL;

const useAxios = () => {
  const { authState } = useAuth();

  let isRefreshing = false;
  let refreshSubscribers: any = [];

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authState?.token}` },
  });

  const onRefresh = (token: string) => {
    refreshSubscribers.map((callback: any) => callback(token));
  };

  const addRefreshSubscriber = (callback: any) => {
    refreshSubscribers.push(callback);
  };

  const refreshAccessToken = async () => {
    try {
      if (authState) {
        const response = await axios.post(`${baseURL}/authentication/refresh`, {
          accessToken: authState.token,
          refreshToken: authState.refreshToken,
        });
        await SecureStore.setItemAsync(
          TOKEN_KEY,
          JSON.stringify(response.data)
        );

        authState.refreshToken = response.data.refreshToken;
        authState.token = response.data.accessToken;
        onRefresh(response.data.accessToken);

        return response.data.accessToken;
      } else {
        throw new Error("No auth state");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  axiosInstance.interceptors.request.use(
    (config) => config,
    async (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response: { status } = {} } = error;
      const originalRequest = config;

      if (authState && status === 401) {
        if (!originalRequest._retry) {
          if (!isRefreshing) {
            isRefreshing = true;
            originalRequest._retry = true;

            try {
              const newToken = await refreshAccessToken();
              axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              
              // Resolve all pending requests with the new token
              refreshSubscribers.forEach((callback: any) => callback(newToken));
              refreshSubscribers = [];
              return axiosInstance(originalRequest);
            } catch (e) {
              console.error(e);
              return Promise.reject(e);
            } finally {
              isRefreshing = false;
            }
          }

          return new Promise((resolve, reject) => {
            addRefreshSubscriber((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;


