import { useNavigate } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import {
    IListagemlistedshares,
    listedsharesService
} from "../../shared/services/api/acoes_listadas/acoes_listadas";

import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Environment } from "../../shared/environment";

export const AcoesListadas: React.FC = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce(3000, false);
  const [rows, setRows] = useState<IListagemlistedshares>();
  const [totalCount, settotalCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);

    debounce(() => {
        listedsharesService.getAll().then((result) => {
        setisLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data);
          settotalCount(result.totalCount);
        }
      });
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo={"Ações listadas"}
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova ação"
          aoClicarEmNovo={() => navigate("/NovaAcao")}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Classificação do setor b3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows?.items && rows.items.map((row: { id: Key | null | undefined; ticker: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
            b3_sector_classification: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
           }) => (
              <TableRow>
                <TableCell>{row.ticker}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.b3_sector_classification}</TableCell>
                </TableRow>
              
            ))}
            </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
