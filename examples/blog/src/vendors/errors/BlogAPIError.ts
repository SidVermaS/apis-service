import { VendorClientError, } from "vendor-api";

export class BlogAPIError extends VendorClientError{
  constructor(_status:number,_data:unknown | unknown[]) {
    super(_status,_data)
  }}