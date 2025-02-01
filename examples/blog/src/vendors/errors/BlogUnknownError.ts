import {KeyStringUnknownComboI, VendorReqDataError, VendorUnknownError} from "vendor-api";

export class BlogUnknownError extends VendorUnknownError{
      constructor(_data:unknown | unknown[]) {
        super(_data)
      }
}