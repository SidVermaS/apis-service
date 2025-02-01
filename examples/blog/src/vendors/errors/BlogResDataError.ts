import {VendorReqDataError} from "vendor-api";

export class BlogResDataError extends VendorReqDataError{  
  constructor(_data:unknown | unknown[]) {
    super(_data)
  }
}