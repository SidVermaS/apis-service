import ServiceError from "./ServiceError";

 class ServiceResDataError extends ServiceError {
    constructor(_data:unknown) {
      super(_data)
    }
}

export default ServiceResDataError