import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { create } from "../../services/api/cadastro-user/user";
import * as yup from "yup";
import tenor from "../../../../public/vecteezy.gif";
import { useNavigate } from "react-router-dom";
import log from "/public/logo.png";

const cadastro = yup.object().shape({
  cpf: yup.string().required("CPF é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  name: yup.string().required("Nome é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Senha inválida! Deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
    ),
});

interface ICadastroProps {
  children: React.ReactNode;
}

export const Cadastro: React.FC<ICadastroProps> = ({}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);

    cadastro
      .validate({ cpf, email, name, password }, { abortEarly: false })
      .then((dadosValidados) => {
        const userData = {
          cpf: dadosValidados.cpf,
          email: dadosValidados.email,
          name: dadosValidados.name,
          password: dadosValidados.password,
        };
        return create(userData).then(() => {
          setIsLoading(false);
          setSuccessMessage("Cadastro realizado com sucesso!");
          setTimeout(() => {
            navigate("/");
          }, 2000); // Redireciona após 2 segundos
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        // Limpar mensagens de erro anteriores
        setCpfError("");
        setEmailError("");
        setNameError("");
        setPasswordError("");

        // Exibir novas mensagens de erro
        errors.inner.forEach((error) => {
          if (error.path === "cpf") {
            setCpfError(error.message);
          } else if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "name") {
            setNameError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={2}
      style={{
        backgroundImage: `url(${tenor})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={log}
        alt="Logo"
        style={{ width: "18rem", height: "18rem", marginBottom: "-5rem" }}
      />
      <Card style={{ width: "100%", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" align="center">Cadastro</Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="CPF"
              fullWidth
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              error={!!cpfError}
              helperText={cpfError}
            />
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Nome"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              label="Senha"
              fullWidth
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Cadastrar"}
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
      />
    </Box>
  );
};
