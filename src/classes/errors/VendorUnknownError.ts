import { KeyStringUnknownI } from "../../types/common";
import VendorError from "./VendorError";

class VendorUnknownError extends VendorError {
    constructor(_data:KeyStringUnknownI) {
      super(_data)
    }
}

export default VendorUnknownError