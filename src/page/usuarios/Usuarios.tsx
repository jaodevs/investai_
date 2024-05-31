import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  LinearProgress,
  Pagination,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Environment } from "../../shared/environment";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  UserService,
  IListagemUser,
} from "../../shared/services/api/usuarios/usuarios";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDebounce } from "../../shared/hooks/UseDebounce";

export const Usuarios: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const [rows, setRows] = useState<IListagemUser>();
  const [totalCount, setTotalCount] = useState(rows?.total);
  const [isLoading, setisLoading] = useState(true);

  const filter = useMemo(() => {
    return searchParams.get("filter") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  useEffect(() => {
    setisLoading(true);

    debounce(() =>
      UserService.getAll().then((result) => {
        setisLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      })
    );
  }, [filter, page]);

  return (
    <LayoutBaseDePagina
      titulo={"Usuarios"}
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
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.items &&
              rows.items.map(
                (row: {
                  id: Key | null | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  email:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                }) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
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
            {rows?.total && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(rows.total / 8)}
                    onChange={(_, value) =>
                      setSearchParams(
                        { page: value.toString() },
                        { replace: true }
                      )
                    }
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
