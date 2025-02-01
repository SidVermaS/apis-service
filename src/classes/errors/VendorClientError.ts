import { KeyStringUnknownI } from "../../types/common";
import VendorAPIError from "./VendorAPIError";

class VendorClientError  extends VendorAPIError {
   constructor(_status:number,_data:KeyStringUnknownI) {
        super(_status,_data)
      }}

export default VendorClientError