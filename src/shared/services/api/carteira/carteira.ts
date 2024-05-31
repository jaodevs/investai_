import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemCarteira {
  items: any;
  totalCount: number;
  result: {
    id: number;
    share_price: string;
    quantity_purchased: string;
    invested_amount: string;
   
  }[];
  current: number;
  pageSize: number;
  total: number;
}

interface IDetalheCliente {
  id: number;
  id_client: string;
  id_listed_shares: string;
  share_price: string;
  quantity_purchased: string;
  invested_amount: string;
}

type TPessoasComTotalCount = {
  data: IListagemCarteira;
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

    let urlRelativa = `/investment-portfolio`;
    
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

const getById = async (id: number): Promise<IDetalheCliente | Error> => {
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
  dados: Omit<IDetalheCliente, "id">
): Promise<number | Error> => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (!accessToken) {
      return new Error("Token de autenticação não encontrado.");
    }

    const { data } = await Api.post<IDetalheCliente>("/investment-portfolio", dados, {
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


export const CarteiraService = {
  getAll,
  create,
  getById,
};
