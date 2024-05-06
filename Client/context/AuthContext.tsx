import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

interface AuthProps {
  authState?: {
    token: string | null;
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

interface DecodedToken {
  [key: string]: string; // or whatever types your token properties have
}

const TOKEN_KEY = "todo_jwt";
export const API_URL =
  Platform.OS === "ios"
    ? "http://localhost:5000/api/authentication"
    : "http://10.0.2.2:5000/api/authentication";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    id: string | null;
  }>({
    token: null,
    authenticated: null,
    id: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const decodedToken: DecodedToken = jwtDecode(token);
          const userId =
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];

          setAuthState({
            token: token,
            authenticated: true,
            id: userId,
          });
        }
      } catch (e) {
        console.error("Token loading error:", e);
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
      return await axios.post(`${API_URL}`, { username, email, password });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (userName: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${API_URL}/login`, {
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
        authenticated: true,
        id: userId,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);
      setIsLoading(false);
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
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
