export class VendorError extends Error {
  private _data:unknown;
  constructor(_data:unknown) {
    super()
    this._data=_data
  }
  get data():unknown{
    return this._data
  }
}