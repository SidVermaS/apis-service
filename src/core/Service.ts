import { ServiceConfigI } from "../types/config";
import { APICallFnParamsI, APICallFnResponseI, URLParamsI } from "../types/api";
import { KeyStringPurePrimitiveI, KeyStringStringI } from "../types/common";
import { ResponseError, ServiceAPIError, ServiceAuthError, ServiceClientError, ServiceInternalServerError, ServiceUnknownError } from "../errors";

export default class Service<T extends ServiceConfigI<T>> {
  private _maxRetryLimit: number = 2;
  protected _config: ServiceConfigI<T>;
  protected _headers: KeyStringPurePrimitiveI = {};
  constructor(config: ServiceConfigI<T>) {
    this._config = config;    
  }
  /**
   * Override this function to set the key-value pairs to the header before making an API request 
   */
  protected async _headersInjector(_params: URLParamsI):Promise<KeyStringStringI> {
    return {}
  }
  private _generateURL (params: URLParamsI): string  {
    let fullURL = `${params?.baseURL?.length ? params.baseURL : this._config.baseURL}${params.path}`
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
   ** Ensure to call the service's login API using _loginAPICall() function 
   */
  public async login (...args: unknown[]):Promise<unknown> {
    return {} as unknown;
  }
  /**
   * Override this function for one of the following reasons:
   ** If you want to throw custom errors according to your service
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
        throw new ServiceAuthError(status, json)
      } else if (status > 399 && status < 500) {
        throw new ServiceClientError(status, json)
      } else if (status > 499 && status < 600) {
        throw new ServiceInternalServerError(status, json)
      } else {
        throw new ServiceAPIError(status, json)
      }
    } else {
      throw new ServiceUnknownError({ error: JSON.stringify(data) })
    }
  }
  /**
   * Use this function to call the Service's login API by passing the path, method & optional (path's id, query, payload)
   * @param params 
   * @returns 
   */
  protected async _loginAPICall<Res>  (params: APICallFnParamsI): Promise<Res>  {
      params.headers={...(await this._headersInjector(params)), ...params.headers as KeyStringStringI}
      const response = await fetch(this._generateURL(params), this._generateRequestInit(params))
      const result=  await this._responseHandler(params,response)
      return result.json as Res
    }
  /**
   * Use this function to call the Service's API by passing the path, method & optional (path's id, query, payload)
   * @param params 
   * @returns 
   */
  protected async _apiCall<Res>(params: APICallFnParamsI): Promise<Res | void>  {
   
    let attempts: number = 0;
    while (attempts < this._maxRetryLimit) {
      attempts++
      try { 
        params.headers={...(await this._headersInjector(params)), ...params.headers as KeyStringStringI}
        
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
          throw error
        } else {
          throw error
        }
      }
    }
    return;
  }
  /**
   * Use this function in catch block to handle the error
   */
  protected _handleCatch(..._args:unknown[])  {

  }
}