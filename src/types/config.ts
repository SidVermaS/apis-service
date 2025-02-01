import { KeyStringPurePrimitiveI } from "./common";

export type ConfigI<T> = {
  baseURL:string;
  username?: string;
  token?: string;
  refreshToken?: string;
    headers?:KeyStringPurePrimitiveI
}