import { ServiceClientError, } from "service-api";

export class BlogClientError extends ServiceClientError {
  constructor(_status: number, _data: unknown | unknown[]) {
    super(_status, _data)
  }
}