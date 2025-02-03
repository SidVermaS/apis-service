import ServiceAPIError from "./ServiceAPIError";

 class ServiceClientError  extends ServiceAPIError {
   constructor(_status:number,_data:unknown) {
        super(_status,_data)
      }}
      export default ServiceClientError