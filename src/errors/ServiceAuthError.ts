import ServiceAPIError from "./ServiceAPIError";

 class ServiceAuthError extends ServiceAPIError {
   constructor(_status:number,_data:unknown) {
        super(_status,_data)
      }
}

export default ServiceAuthError