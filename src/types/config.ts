import { KeyStringPurePrimitiveI } from "./common";

export type VendorConfigI<T> = { [K in keyof T]: T[K] } & {
  baseURL: string;
  username?: string;
  token?: string;
  refreshToken?: string;
  headers?: KeyStringPurePrimitiveI
}