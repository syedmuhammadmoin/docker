import {IApiResponse} from "./IApiResponse";

export interface IPaginationResponse<T> extends IApiResponse<T>{
    pageStart: number,
    pageEnd: number,
    totalRecords: number
  }
