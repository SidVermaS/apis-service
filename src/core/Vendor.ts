import { VendorConfigI } from "../types/config";
import { APICallFnParamsI, APICallFnResponseI, URLParamsI } from "../types/api";
import { KeyStringPurePrimitiveI, KeyStringStringI } from "../types/common";
import { ResponseError, VendorAPIError, VendorAuthError, VendorClientError, VendorInternalServerError, VendorUnknownError } from "../errors";

export class Vendor<T extends VendorConfigI<T>> {
  private _maxRetryLimit: number = 2;
  protected _config: VendorConfigI<T>;
  protected _headers: KeyStringPurePrimitiveI = {};
  constructor(config: VendorConfigI<T>) {
    this._config = config;    
  }
  /**
   * Override this function to set the key-value pairs to the header before making an API request 
   */
  protected async _headersInjector() {

  }
  private _generateURL (params: URLParamsI): string  {
    let fullURL = `${this._config.baseURL}${params.path}`
    if (params?.id !== undefined) {
      fullURL += `/${params.id}`
    }
    if (params?.query && Object.keys(params.query).length) {
      const queryParams:KeyStringStringI=Object.entries(params.query).reduce((acc, [key,value])=>{
        acc[key]=String(value)
        return acc
      },{} as KeyStringStringI)
      const query: string = new URLSearchParams(queryParams).toString()
      fullURL += `?${query}`
    }
    return fullURL
  }
  private _generateRequestInit  (params: APICallFnParamsI): RequestInit {
    const requestInit: RequestInit = {
      method: params.method,
    }
    let headers:KeyStringStringI={}
    if(this?._headers && Object.keys(this._headers).length) {
      headers=this._headers as KeyStringStringI
    }
    if(params?.headers && Object.keys(params?.headers).length) {
      headers={...headers,...params?.headers as KeyStringStringI}
    }
    if (Object.keys(headers).length) {
      requestInit.headers =headers;
    }
    if (params?.body && Object.keys(params?.body).length) {
      requestInit.body =JSON.stringify(params?.body)
    }
    return requestInit;
  }

  /**
   * Override this function if you need to regenerate the token from a login API (use _loginAPICall() function).
   ** After a new token is generated then update the header's key
   ** Ensure to call the vendor's login API using _loginAPICall() function 
   */
  public async login (...args: unknown[]):Promise<unknown> {
    return {} as unknown;
  }
  /**
   * Override this function for one of the following reasons:
   ** If you want to throw custom errors according to your vendor
   ** If you want to modify the response's json before processing it further in the code
   * @param data 
   * @returns 
   */
  protected async _responseHandler   (_params: APICallFnParamsI,data: Response | unknown): Promise<APICallFnResponseI>{    
    if (data instanceof Response) {
      const response: Response = data
      const status = response.status;
      const json = await response.json();
      if (status > 199 && status < 300) {
        return {
          status,
          json
        }
      }
      else if (status === 401) {
        throw new VendorAuthError(status, json)
      } else if (status > 399 && status < 500) {
        throw new VendorClientError(status, json)
      } else if (status > 499 && status < 600) {
        throw new VendorInternalServerError(status, json)
      } else {
        throw new VendorAPIError(status, json)
      }
    } else {
      throw new VendorUnknownError({ error: JSON.stringify(data) })
    }
  }
  /**
   * Use this function to call the Vendor's login API by passing the path, method & optional (path's id, query, payload)
   * @param params 
   * @returns 
   */
  protected async _loginAPICall<Res>  (params: APICallFnParamsI): Promise<Res>  {
      const response = await fetch(this._generateURL(params), this._generateRequestInit(params))
      const result=  await this._responseHandler(params,response)
      return result.json as Res
    }
  /**
   * Use this function to call the Vendor's API by passing the path, method & optional (path's id, query, payload)
   * @param params 
   * @returns 
   */
  protected async _apiCall<Res>(params: APICallFnParamsI): Promise<Res | void>  {
    await this._headersInjector()
    let attempts: number = 0;
    while (attempts < this._maxRetryLimit) {
      attempts++
      try {
        const url=this._generateURL(params);
        const response = await fetch(url, this._generateRequestInit(params))
        const result=  await this._responseHandler(params,response)
        return result.json as Res
      } catch (error) {
        if (error instanceof ResponseError) {
          const status = error.response.status;
          if (status === 401) {
            // If the status was unauthorized then we'll call the login API(If overriden) & attempt to call the requested API for specific no of times
            if (attempts < this._maxRetryLimit) {
              // If login succeeds then we'll attempt to call the requested API until the while's condition is fulfilled
              await this.login()
              continue;
            }
          }
          await this._responseHandler(params,error.response)
        } else {
          await this._responseHandler(params,error)
        }
      }
    }
    await this._responseHandler(params,undefined)
    return;
  }
  /**
   * Use this function in catch block to handle the error
   */
  protected _handleCatch(..._args:unknown[])  {

  }
}