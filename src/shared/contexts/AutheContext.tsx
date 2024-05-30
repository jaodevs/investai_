import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';
const TOKEN_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    return token || null;
  });

  // Timeout reference to clear the timeout on logout or token update
  const tokenTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const setTokenWithTimeout = useCallback((token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, token);
    setAccessToken(token);

    // Clear any existing timeout
    if (tokenTimeoutRef.current) {
      clearTimeout(tokenTimeoutRef.current);
    }

    // Set a timeout to remove the token after 15 minutes
    tokenTimeoutRef.current = setTimeout(() => {
      localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
      setAccessToken(null);
    }, TOKEN_EXPIRATION_TIME);
  }, []);

  const handleSignIn = useCallback(async (username: string, password: string) => {
    const result = await AuthService.auth(username, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      setTokenWithTimeout(result.access_token);
    }
  }, [setTokenWithTimeout]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(null);

    // Clear the timeout if it exists
    if (tokenTimeoutRef.current) {
      clearTimeout(tokenTimeoutRef.current);
      tokenTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    if (storedToken) {
      setTokenWithTimeout(storedToken);
    }
    // Clean up the timeout when the component unmounts
    return () => {
      if (tokenTimeoutRef.current) {
        clearTimeout(tokenTimeoutRef.current);
      }
    };
  }, [setTokenWithTimeout]);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn: handleSignIn, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);