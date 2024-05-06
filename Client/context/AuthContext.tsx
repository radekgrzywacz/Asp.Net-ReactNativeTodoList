// import { createContext, useContext, useEffect, useState } from "react";
// import { Platform } from "react-native";
// import axios from "axios";
// import "core-js/stable/atob";
// import { jwtDecode } from "jwt-decode";
// import * as SecureStore from "expo-secure-store";

// interface AuthProps {
//   authState?: {
//     id: string | null;
//     token: string | null;
//     authenticated: boolean | null;
//   };
//   onRegister?: (
//     email: string,
//     password: string,
//     userName: string
//   ) => Promise<any>;
//   onLogin?: (username: string, password: string) => Promise<any>;
//   onLogout?: () => Promise<any>;
// }

// interface DecodedToken {
//   [key: string]: string; // or whatever types your token properties have
// }

// const TOKEN_KEY = "todo_jwt";
// export const API_URL =
//   Platform.OS === "ios"
//     ? "http://localhost:5000/api/authentication"
//     : "http://10.0.2.2:5000/api/authentication";
// const AuthContext = createContext<AuthProps>({});

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }: any) => {
//   const [id, setId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [authState, setAuthState] = useState<{
//     id: string | null;
//     token: string | null;
//     authenticated: boolean | null;
//   }>({
//     id: null,
//     token: null,
//     authenticated: null,
//   });

//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const token = await SecureStore.getItemAsync(TOKEN_KEY);

//         if (token) {
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//           const decodedToken: DecodedToken = jwtDecode(token);

//           const id =
//             decodedToken[
//               "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//             ];
//           setId(id);

//           console.log("USer id: ", id);

//           setAuthState({
//             id: id,
//             token: token,
//             authenticated: true,
//           });
//         }
//       } catch (error) {
//         console.error("Token loading error:", error);
//       }
//     };
//     loadToken();
//   }, []);

//   const register = async (
//     username: string,
//     email: string,
//     password: string
//   ) => {
//     try {
//       return await axios.post(`${API_URL}`, {
//         username,
//         email,
//         password,
//       });
//     } catch (error) {
//       return { error: true, msg: (error as any).response.data.msg };
//     }
//   };

//   const login = async (userName: string, password: string) => {
//     try {
//       setIsLoading(true);
//       const result = await axios.post(`${API_URL}/login`, {
//         userName,
//         password,
//       });
//       const token = result.data.accessToken;
//       const decodedToken: DecodedToken = jwtDecode(token);
//       const id =
//         decodedToken[
//           "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier	"
//         ];
//       setAuthState({
//         token: token,
//         id: id,
//         authenticated: true,
//       });

//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       await SecureStore.setItemAsync(TOKEN_KEY, token);
//       console.log("Token zapisany, ID: ", authState?.token);

//       setIsLoading(false);
//       return result;
//     } catch (error) {
//       return { error: true, msg: (error as any).response.data.msg };
//     }
//   };

//   const logout = async () => {
//     setIsLoading(true);
//     await SecureStore.deleteItemAsync(TOKEN_KEY);

//     axios.defaults.headers.common["Authorization"] = "";

//     setAuthState({
//       id: null,
//       token: null,
//       authenticated: false,
//     });
//     setIsLoading(false);
//   };

//   const value = {
//     onRegister: register,
//     onLogin: login,
//     onLogout: logout,
//     authState,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

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
  onLogin?: (userName: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

const TOKEN_KEY = "my-jwt";
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
    userName: string,
    email: string,
    password: string
  ) => {
    try {
      return await axios.post(`${API_URL}`, { userName, email, password });
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

      const decodedToken: DecodedToken = jwtDecode(result.data.token);
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      setAuthState({
        token: result.data.token,
        authenticated: true,
        id: userId,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
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
