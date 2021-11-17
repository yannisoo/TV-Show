import { AxiosResponse } from "axios";
import http from "../http-common";
const baseURL = "http://localhost:3001/";

const login = (body: any): Promise<AxiosResponse<any>> => {
  return http.post<any>(baseURL + `login`, body);
};
const register = (body: any): Promise<AxiosResponse<any>> => {
  return http.post<any>(baseURL + `register`, body);
};
const LoginService = {
  register,
  login
};

export default LoginService;