import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemHistorico {
  items: any;
  totalCount: number;
  result: {
    id: number;
    last_value: string;
    opening: string;
    high: string;
    low: string;
    trading_volume: string;
    percentage_change: string;
  }[];
  current: number;
  pageSize: number;
  total: number;
}

interface IDetalheHistorico {
  id: number;
  last_value: string;
  opening: string;
  high: string;
  low: string;
  trading_volume: string;
  percentage_change: string;
}

type TPessoasComTotalCount = {
  data: IListagemHistorico;
  totalCount: number;
};

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

const getAll = async (
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (!accessToken) {
      return new Error("Token de autenticação não encontrado.");
    }

    let urlRelativa = `/listed-share-history`;
    
    const { data, headers } = await Api.get(urlRelativa, {
      headers: {
        Authorization:  accessToken
      }

    });
    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
     
    }

    console.log(data);

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<IDetalheHistorico | Error> => {
  try {
    const { data } = await Api.get(`/Doctor/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<IDetalheHistorico, "id">
): Promise<number | Error> => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (!accessToken) {
      return new Error("Token de autenticação não encontrado.");
    }

    const { data } = await Api.post<IDetalheHistorico>("/listed-share-history", dados, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

export const HistoricoService = {
  getAll,
  create,
  getById,
};
