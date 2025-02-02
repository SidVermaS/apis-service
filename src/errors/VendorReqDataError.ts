import {VendorError} from "./VendorError";

export class VendorReqDataError extends VendorError {
    constructor(_data:unknown) {
      super(_data)
    }
}
