import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemPerfil {
  items: any;
  totalCount: number;
  result: {
    id: number;
    type: string;
    description: string;
  }[];
  current: number;
  pageSize: number;
  total: number;
}

export interface IDetalhePerfil {
    [x: string]: any;
    id: number;
    type: string;
    description: string;
}

type TPessoasComTotalCount = {
  data: IListagemPerfil;
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
    let urlRelativa = `/profiles`;
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


const getById = async ( id: string
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (!accessToken) {
      return new Error("Token de autenticação não encontrado.");
    }
    let urlRelativa = `/profiles/${id}`;
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
export const PerfilService = {
    getAll,
    getById
  };
  