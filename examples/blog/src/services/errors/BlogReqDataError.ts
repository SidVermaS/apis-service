import {KeyStringUnknownComboI, ServiceReqDataError} from "service-api";

export class BlogReqDataError extends ServiceReqDataError{
      constructor(_data:unknown | unknown[]) {
        super(_data)
      }
}