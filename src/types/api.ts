import { DataI, KeyStringPurePrimitiveI,  KeyStringUnknownI,  PurePrimitiveI } from "./common"

export type URLParamsI = {
  path:string;
  id?: PurePrimitiveI
  query?: Record<string, PurePrimitiveI>
  headers?:KeyStringPurePrimitiveI
}
export type APICallFnParamsI =URLParamsI & {
  body?: KeyStringUnknownI | KeyStringUnknownI[],
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
}
export type APICallFnResponseI ={
  status: number;
  json: DataI;
}