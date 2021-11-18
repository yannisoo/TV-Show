import { AxiosResponse } from "axios";
import http from "../http-commonBack";
const baseURL = "http://localhost:3001/";

const getMyShows = (): Promise<AxiosResponse<any>> => {
  return http.get<any>(baseURL + `show`);
};
const addMyShows = (body: any): Promise<AxiosResponse<any>> => {
  return http.post<any>(baseURL + `show`, body);
};
const changeSeen = (id: string): Promise<AxiosResponse<any>> => {
    return http.patch<any>(baseURL + `show/` + id);
  };
const isThisShowSaved = (id: string): Promise<AxiosResponse<any>> => {
    return http.get<any>(baseURL + `show/` + id);
  };
const deleteMyShow = (id: string): Promise<AxiosResponse<any>> => {
    return http.delete<any>(baseURL + `show/` + id);
  };
const MyShowsService = {
    getMyShows,
    addMyShows,
    changeSeen,
    isThisShowSaved,
    deleteMyShow
};

export default MyShowsService;