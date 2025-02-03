import ServiceError from "./ServiceError";

class ServiceUnknownError extends ServiceError {
    constructor(_data:unknown) {
      super(_data)
    }
}
export default ServiceUnknownError