import {VendorError} from "./VendorError";

export class VendorResDataError extends VendorError {
    constructor(_data:unknown) {
      super(_data)
    }
}
