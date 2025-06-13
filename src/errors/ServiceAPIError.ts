import ServiceError from "./ServiceError";

 class ServiceAPIError extends ServiceError {
  private _status:number;

    constructor(_status:number,_data:unknown) {
      super(_data)
      this._status=_status
    }
    get status():number {
      return this._status
    }
}
export default ServiceAPIError