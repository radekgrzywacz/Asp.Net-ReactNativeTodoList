import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import axios from "axios";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: {
    userName: string;
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (
    email: string,
    password: string,
    userName: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

interface DecodedToken {
  [key: string]: string; // or whatever types your token properties have
}

const TOKEN_KEY = "todo_jwt";
const USER_NAME = "todo_username";
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
    userName: string | null;
    token: string | null;
    authenticated: boolean | null;
  }>({
    userName: null,
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        console.log("IN EFFECT");
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        console.log("stored: ", token);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const decodedToken: DecodedToken = jwtDecode(token);

          const name =
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ];
          setAuthState({
            userName: name,
            token: token,
            authenticated: true,
          });
        }
      } catch (error) {
        console.error("Token loading error:", error);
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
      return await axios.post(`${API_URL}`, {
        username,
        email,
        password,
      });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const login = async (userName: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${API_URL}/login`, {
        userName,
        password,
      });
      console.log("TOKEN: ", result.data.accessToken);
      const token = result.data.accessToken;
      console.log("TOKEN  2:  ", token);
      const decodedToken: DecodedToken = jwtDecode(token);
      console.log("After decoding");
      const name =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      console.log("after parsing");
      setAuthState({
        token: result.data.accessToken,
        userName: name,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);

      setIsLoading(false);

      return result;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      userName: null,
      token: null,
      authenticated: false,
    });
    setIsLoading(false);
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
