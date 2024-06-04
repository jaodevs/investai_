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
  ClientesService,
  IListagemCliente,
} from "../../shared/services/api/cliente/clientes";

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

export const Clientes: React.FC = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce(3000, false);
  const [rows, setRows] = useState<IListagemCliente>();
  const [totalCount, settotalCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);

    debounce(() => {
      ClientesService.getAll().then((result) => {
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
      titulo={"Clientes"}
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Novo Cliente"
          aoClicarEmNovo={() => navigate("/novoclientes")}
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
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.items &&
              rows.items.map(
                (row: {
                  id: Key | null | undefined;
                  type:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  id_profile:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>;
                }) => (
                  <TableRow>
                    <TableCell>
                      {row.name} (
                      {row.id_profile === 1
                        ? "Conservador"
                        : row.id_profile === 2
                        ? "Moderado"
                        : row.id_profile === 3
                        ? "Agressivo"
                        : "Indefinido"}
                      )
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
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
