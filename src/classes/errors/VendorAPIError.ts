import { KeyStringUnknownI } from "../../types/common";
import VendorError from "./VendorError";

class VendorAPIError extends VendorError {
  private _status:number;

    constructor(_status:number,_data:KeyStringUnknownI) {
      super(_data)
      this._status=_status
    }
}

export default VendorAPIError