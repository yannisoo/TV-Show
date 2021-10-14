import { AxiosResponse } from "axios";
import http from "../http-common";
import Shows from "../types/ShowType";
import ShowSingle from "../types/ShowType";

const get = (query: string): Promise<AxiosResponse<Array<Shows>>> => {
  return http.get<Array<Shows>>(`/search/shows?q=${query}`);
};
const findById = (id: string): Promise<AxiosResponse<ShowSingle>> => {
  return http.get<Shows>(`/shows/${id}?embed=cast`);
};
const ShowService = {
  findById,
  get
};

export default ShowService;