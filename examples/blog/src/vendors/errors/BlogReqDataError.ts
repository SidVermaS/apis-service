import {KeyStringUnknownComboI, VendorReqDataError} from "vendor-api";

export class BlogReqDataError extends VendorReqDataError{
      constructor(_data:unknown | unknown[]) {
        super(_data)
      }
}