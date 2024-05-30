import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    return token || null; 
  });
  

  useEffect(() => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleSignIn = useCallback(async (username: string, password: string) => {
    const result = await AuthService.auth(username, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.access_token);
      setAccessToken(result.access_token);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(null);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn: handleSignIn, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
