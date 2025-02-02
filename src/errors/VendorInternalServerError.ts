import {VendorAPIError} from "./VendorAPIError";

export class VendorInternalServerError  extends VendorAPIError {
   constructor(_status:number,_data:unknown) {
        super(_status,_data)
      }}
