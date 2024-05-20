import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert, Platform } from "react-native";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

interface AuthProps {
  authState?: {
    token: string | null;
    refreshToken: string | null;
    authenticated: boolean | null;
    id: string | null;
  };
  onRegister?: (
    email: string,
    userName: string,
    password: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

export interface DecodedToken {
  [key: string]: string;
}

export const TOKEN_KEY = "todo_jwt";
export const API_URL =
  Platform.OS === "ios"
    ? "http://localhost:5000/api"
    : "http://10.0.2.2:5000/api";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState<{
    token: string | null;
    refreshToken: string | null;
    authenticated: boolean | null;
    id: string | null;
  }>({
    token: null,
    refreshToken: null,
    authenticated: null,
    id: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const tokensJson = await SecureStore.getItemAsync(TOKEN_KEY);
        if (tokensJson !== null) {
          const tokens = JSON.parse(tokensJson);
          if (tokens.accessToken && tokens.refreshToken) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${tokens.accessToken}`;

            const decodedToken: DecodedToken = jwtDecode(tokens.accessToken);
            const userId =
              decodedToken[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
              ];

            setAuthState({
              token: tokens.accessToken,
              refreshToken: tokens.refreshToken,
              authenticated: true,
              id: userId,
            });
            console.log("load token refresh: ", tokens.refreshToken)
            console.log("load token token: ", tokens.accessToken)
          }
        }
      } catch (e) {
        Alert.alert(`Token loading error: ${e}`);
      }
    };

    loadToken();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      return await axios.post(`${API_URL}/authentication`, {
        username,
        email,
        password,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response };
    }
  };

  const login = async (userName: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${API_URL}/authentication/login`, {
        userName,
        password,
      });
      const decodedToken: DecodedToken = jwtDecode(result.data.accessToken);
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      setAuthState({
        token: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        authenticated: true,
        id: userId,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.accessToken}`;

      console.log("login refresh: ",result.data.refreshToken);

      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(result.data));
      setIsLoading(false);
    } catch (e) {
      return { error: true, msg: (e as any).response.data };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      refreshToken: null,
      authenticated: false,
      id: null,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
