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
    console.log("subs: ", refreshSubscribers.length);
    refreshSubscribers.map((callback: any) => callback(token));
  };

  const addRefreshSubscriber = (callback: any) => {
    console.log("w addref: ", callback);
    refreshSubscribers.push(callback);
    console.log("po addref");
  };

  axiosInstance.interceptors.request.use(async (req) => {
    if (authState?.token) {
      const decodedToken = jwtDecode(authState.token);
      const isExpired = dayjs.unix(decodedToken["exp"]).diff(dayjs()) < 1;

      if (!isExpired) return req;

      if (!isRefreshing) {
        isRefreshing = true;
        console.log("refreshing...", new Date());
        try{
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
        console.log("storage interceptor refresh: ", authState.refreshToken);

        
        req.headers.Authorization = `Bearer ${response.data.accessToken}`;
        onRefresh(response.data.accessToken);
        console.log("USER ID FROM INTERCEPT: ", authState.id);
      } catch (error){
        console.log("Error: ", error)
      } finally{
        isRefreshing = false;
        refreshSubscribers = [];
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((token:string) => {
          req.headers.Authorization = `Bearer ${token}`;
          resolve(req);
        });
      });
      }
    }
    console.log("Koniec intercepta")
    return req;
  });

  return axiosInstance;
};

export default useAxios;
