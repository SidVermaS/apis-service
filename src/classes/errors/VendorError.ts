import { KeyStringUnknownI } from "../../types/common"

class VendorError extends Error {
  private _data:KeyStringUnknownI;
  constructor(_data:KeyStringUnknownI) {
    super()
    this._data=_data
  }
  get data():KeyStringUnknownI{
    return this._data
  }
}
export default VendorError