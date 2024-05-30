import axios from "axios";
import { responseInterceptor } from "./interceptors/Responseinterceptor";
import { errorInterceptor } from "./interceptors";
import { Environment } from "../../../environment";

const Api = axios.create({
  baseURL: Environment.REACT_APP_API_URL,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
