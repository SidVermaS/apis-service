import { ServiceAuthError, ServiceClientError, } from "service-api";

export class BlogAuthError extends ServiceAuthError{
  constructor(_status:number,_data:unknown | unknown[]) {
    super(_status,_data)
  }}