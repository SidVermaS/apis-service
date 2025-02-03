import {ServiceReqDataError} from "service-api";

export class BlogResDataError extends ServiceReqDataError{  
  constructor(_data:unknown | unknown[]) {
    super(_data)
  }
}