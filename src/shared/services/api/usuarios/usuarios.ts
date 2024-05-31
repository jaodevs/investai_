import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemUser {
  items: any;
  totalCount: number;
  result: {
    id: number;
    email: string;
    name: string;
   
  }[];
  current: number;
  pageSize: number;
  total: number;
}

interface IDetalheuser {
  id: number;
  email: string;
  name: string;
}

type TPessoasComTotalCount = {
  data: IListagemUser;
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


    let urlRelativa = `/users`;


  

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

const getById = async (id: number): Promise<IDetalheuser | Error> => {
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
  dados: Omit<IDetalheuser, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheuser>("/Doctor", dados);

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

export const UserService = {
  getAll,
  getById,
  create,
};
