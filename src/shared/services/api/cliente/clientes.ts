import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemCliente {
  items: any;
  totalCount: number;
  result: {
    id: number;
    type: string;
    name: string;
    id_profile: string;
   
  }[];
  current: number;
  pageSize: number;
  total: number;
}

export interface IDetalheCliente {
  id: number;
  type: string;
  name: string;
  document: string;
  observation: string;
  active: boolean;
  id_profile: string;
}

type TPessoasComTotalCount = {
  data: IListagemCliente;
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

    let urlRelativa = `/clients`;
    
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

const create = async (
  dados: Omit<IDetalheCliente, "id">
): Promise<number | Error> => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (!accessToken) {
      return new Error("Token de autenticação não encontrado.");
    }

    const { data } = await Api.post<IDetalheCliente>("/clients", dados, {
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

export const ClientesService = {
  getAll,
  create,
  getById,
};
