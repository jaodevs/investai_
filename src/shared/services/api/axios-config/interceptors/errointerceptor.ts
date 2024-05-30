import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Erro de conexão"));
  }

  if (error.response?.status === 401) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  if (error.response?.status === 404) {
    return Promise.reject(new Error("Recurso não encontrado"));
  }

  if (error.response?.status === 500) {
    return Promise.reject(new Error("Erro interno do servidor"));
  }

  if (error.response?.status === 403) {
    return Promise.reject(new Error("Acesso negado"));
  }


  if (error.response?.status === 400) {
    return Promise.reject(new Error("Erro na requisição"));
  }


  if (error.response?.status === 409) {
    return Promise.reject(new Error("Conflito"));
  }


  



  return Promise.reject(error);
};
