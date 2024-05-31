import { Box, Button, Icon, Paper,  useTheme } from "@mui/material";
import { Clientes} from "../../../page";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}
export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  aoClicarEmNovo = () => {
    Clientes;
  },
  textoBotaoNovo = "Novo",
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      <Box flex={1} display="flex" justifyContent="end">
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={aoClicarEmNovo}
          endIcon={<Icon>add</Icon>}
        >
          {textoBotaoNovo}
        </Button>
      </Box>
    </Box>
  );
};
