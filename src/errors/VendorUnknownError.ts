import {VendorError} from "./VendorError";

export class VendorUnknownError extends VendorError {
    constructor(_data:unknown) {
      super(_data)
    }
}