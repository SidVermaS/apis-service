import { KeyStringPurePrimitiveI } from "./common";

export type ServiceConfigI<T> = { [K in keyof T]: T[K] } & {
  baseURL: string;
  username?: string;
  token?: string;
  refreshToken?: string;
  headers?: KeyStringPurePrimitiveI
  // This function can be called for saving the newly generated token in to a file/database/storage  
  saveDataFn?:(...args: unknown[])=>void
}