import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppThemeProvider, AuthProvider, DrawerProvider, useAuthContext } from "./shared/contexts";
import { Login, Cadastro } from "./shared/components";
import { AppRoutes } from "./routes";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login children={<div />} />} />
              <Route path="/cadastro" element={<Cadastro children={<div />} />} /> 
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppRoutes />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
};
