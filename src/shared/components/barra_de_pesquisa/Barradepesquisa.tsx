import { Box, Paper, TextField, useTheme } from "@mui/material";

import { Environment } from "../../environment";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
}
export const Barradepesquisa: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  aoMudarTextoDeBusca,
  mostrarInputBusca = false,
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
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          placeholder={Environment.INPUT_DE_BUSCA}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
    </Box>
  );
};
