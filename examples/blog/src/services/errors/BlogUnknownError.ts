import {KeyStringUnknownComboI, ServiceReqDataError, ServiceUnknownError} from "service-api";

export class BlogUnknownError extends ServiceUnknownError{
      constructor(_data:unknown | unknown[]) {
        super(_data)
      }
}