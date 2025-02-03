import ServiceError from "./ServiceError";

 class ServiceReqDataError extends ServiceError {
    constructor(_data:unknown) {
      super(_data)
    }
}

export default ServiceReqDataError