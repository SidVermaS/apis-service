import { ServiceInternalServerError, } from "service-api";

export class BlogInternalServerError extends ServiceInternalServerError{
  constructor(_status:number,_data:unknown | unknown[]) {
    super(_status,_data)
  }}