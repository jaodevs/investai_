import { useNavigate } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "../../shared/hooks";
import {
  HistoricoService,
  IListagemHistorico,
} from "../../shared/services/api/historico/historico";

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

export const Historico: React.FC = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce(3000, false);
  const [rows, setRows] = useState<IListagemHistorico>();
  const [totalCount, settotalCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);

    debounce(() => {
      HistoricoService.getAll().then((result) => {
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
      titulo={"Histórico da ação"}
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Novo histórico"
          aoClicarEmNovo={() => navigate("/Novohistorico")}
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
              <TableCell>Valor investido</TableCell>
              <TableCell>Abertura</TableCell>
              <TableCell>Alto</TableCell>
              <TableCell>baixo</TableCell>
              <TableCell>Volume de negociação</TableCell>
              <TableCell>Alteração percentual</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.items &&
              rows.items.map(
                (row: {
                  id: Key | null | undefined;
                  last_value:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  opening:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  high:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  low:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  trade_volume:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  percentage_change:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                }) => (
                  <TableRow>
                    <TableCell>{row.last_value}</TableCell>
                    <TableCell>{row.opening}</TableCell>
                    <TableCell>{row.high}</TableCell>
                    <TableCell>{row.low}</TableCell>
                    <TableCell>{row.trade_volume}</TableCell>
                    <TableCell>{row.percentage_change}</TableCell>
                  </TableRow>
                )
              )}
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
