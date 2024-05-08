import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";
import { TOKEN_KEY, useAuth } from "../context/AuthContext";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "ios" ? "http://localhost:5000" : "http://10.0.2.2:5000";

const useAxios = () => {
  const { authState } = useAuth();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authState?.token}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (authState?.token) {
      const decodedToken = jwtDecode(authState.token);
      const isExpired = dayjs.unix(decodedToken["exp"]).diff(dayjs()) < 1;

      if (!isExpired) return req;

      const response = await axios.post(
        `${baseURL}/api/authentication/refresh`,
        {
          accessToken: authState.token,
          refreshToken: authState.refreshToken,
        }
      );

      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(response.data));

      authState.refreshToken = response.data.refreshToken;
      authState.token = response.data.accessToken;

      req.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return req;
    }   
  });

  return axiosInstance;
};

export default useAxios;
