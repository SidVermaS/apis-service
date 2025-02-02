import {VendorAPIError} from "./VendorAPIError";

export class VendorClientError  extends VendorAPIError {
   constructor(_status:number,_data:unknown) {
        super(_status,_data)
      }}