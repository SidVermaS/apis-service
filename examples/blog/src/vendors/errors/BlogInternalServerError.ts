import { VendorInternalServerError, } from "vendor-api";

export class BlogInternalServerError extends VendorInternalServerError{
  constructor(_status:number,_data:unknown | unknown[]) {
    super(_status,_data)
  }}