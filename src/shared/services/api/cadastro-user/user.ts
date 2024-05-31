
import { Api } from "../axios-config";



interface IDetaluser {
    id: number;
    cpf: string;
    name: string;
    email: string;
    password: string;
}



export const create = async (
    dados: Omit<IDetaluser, "id">
  ): Promise<number | Error> => {
    try {
      const { data } = await Api.post<IDetaluser>("/sign-up", dados);
  
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
  export const ConsultaService = {
    create,
  };
  