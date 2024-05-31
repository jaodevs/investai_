import {useNavigate } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import {
    CarteiraService,
    IListagemCarteira
} from "../../shared/services/api/carteira/carteira";

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

export const Carteira: React.FC = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce(3000, false);
  const [rows, setRows] = useState<IListagemCarteira>();
  const [totalCount, settotalCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);

    debounce(() => {
        CarteiraService.getAll().then((result) => {
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
      titulo={"Carteira de investimeto"}
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova carteira"
          aoClicarEmNovo={() => navigate("/novacarteira")}
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
              <TableCell>Preços</TableCell>
              <TableCell>Quantidade comprada</TableCell>
              <TableCell>Valor investido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows?.items && rows.items.map((row: { id: Key | null | undefined; quantity_purchased: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; share_price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | 
          ReactPortal | null | undefined;
            invested_amount: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
              <TableRow>
                <TableCell>R${row.share_price}</TableCell>
                <TableCell>{row.quantity_purchased}</TableCell>
                <TableCell>R${row.invested_amount}</TableCell>
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
