import { KeyStringPurePrimitiveI, PrimitiveI, PurePrimitiveI } from "./common"

export type URLParamsI = {
  path:string;
  id?: PurePrimitiveI
  query?: Record<string, string>
  headers?:KeyStringPurePrimitiveI
}
export type APICallFnParamsI =URLParamsI & {
  body?: BodyInit
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
}
export type APICallFnResponseI ={
  status: number;
  json: any;
}