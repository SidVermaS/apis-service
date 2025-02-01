import { VendorAuthError, VendorClientError, } from "vendor-api";

export class BlogAuthError extends VendorAuthError{
  constructor(_status:number,_data:unknown | unknown[]) {
    super(_status,_data)
  }}