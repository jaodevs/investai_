import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; // Importe o hook useNavigate
import log from "/public/logo.png";

import { useAuthContext } from "../../contexts";

import tenor from "../../../../public/vecteezy.gif";

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(5),
});

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, signIn } = useAuthContext();
  const navigate = useNavigate(); // Use o hook useNavigate

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ username, password }, { abortEarly: false })
      .then((dadosValidados) => {
        signIn(dadosValidados.username, dadosValidados.password).then(() => {
          setIsLoading(false);
          navigate("/pagina-inicial"); // Redirecione após login bem-sucedido
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach((error) => {
          if (error.path === "username") {
            setUsernameError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      style={{ backgroundImage: `url(${tenor})`, backgroundSize: "cover" }}
    >
      <img
        src={log}
        alt="Logo"
        style={{ width: "18rem", height: "18rem", marginBottom: "-5rem" }}
      />
      <Card style={{ marginBottom: "5rem" }}>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={250}>
            <Typography variant="h6" align="center">
              Bem vindo
            </Typography>

            <TextField
              fullWidth
              type="text"
              label="username"
              value={username}
              disabled={isLoading}
              error={!!usernameError}
              helperText={usernameError}
              onKeyDown={() => setUsernameError("")}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError("")}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleSubmit}
              endIcon={
                isLoading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="inherit"
                    size={20}
                  />
                ) : undefined
              }
            >
              Entrar
            </Button>

            <Button
              variant="text"
              disabled={isLoading}
              onClick={() => navigate("/cadastro")}
            >
              Cadastre-se
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
