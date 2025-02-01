import { ConfigI } from "../types/config";
import { APICallFnParamsI, APICallFnResponseI, URLParamsI } from "../types/api";
import { KeyStringPurePrimitiveI } from "../types/common";
import VendorAuthError from "../classes/errors/VendorAuthError";
import VendorUnknownError from "../classes/errors/VendorUnknownError";
import VendorClientError from "../classes/errors/VendorClientError";
import VendorInternalServerError from "../classes/errors/VendorInternalServerError";
import VendorAPIError from "../classes/errors/VendorAPIError";
class Vendor<T extends ConfigI<T>> {
  private _maxRetryLimit: number = 2;
  protected _config: ConfigI<T>;
  protected _headers: KeyStringPurePrimitiveI = {};
  constructor(config: ConfigI<T>) {
    this._config = config;
  }
  /**
   * Override this function to set the key-value pairs to the header before making an API request 
   */
  protected _headersInjector() {

  }
  private _generateURL = (params: URLParamsI): string => {
    let fullURL = `${this._config.baseURL}${params.path}`
    if (params?.id !== undefined) {
      fullURL += `/${params.id}`
    }
    if (params?.query && Object.keys(params.query).length) {
      const query: string = new URLSearchParams(params.query).toString()
      fullURL += `?${query}`
    }
    return fullURL
  }
  private _generateRequestInit = (params: APICallFnParamsI): RequestInit => {
    const requestInit: RequestInit = {
      method: params.method,
    }
    if (params?.body && Object.keys(params?.body).length) {
      requestInit.body = params.body
    }
    return requestInit;
  }

  /**
   * Override this function if you need to regenerate the token from a login API (use _loginAPICall() function).
   ** After a new token is generated then update the header's key
   ** Ensure to call the vendor's login API using _loginAPICall() function 
   */
  protected _login = async () => {

  }
  /**
   * Override this function for one of the following reasons:
   ** If you want to throw custom errors according to your vendor
   ** If you want to modify the response's json before processing it further in the code
   * @param data 
   * @returns 
   */
  protected _responseHandler = async (data: Response | unknown): Promise<APICallFnResponseI> => {
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
  protected _loginAPICall = async (params: APICallFnParamsI): Promise<APICallFnResponseI> => {
    try {
      const response = await fetch(this._generateURL(params), this._generateRequestInit(params))
      return await this._responseHandler(response)
    } catch (error) {
      if (error instanceof ResponseError) {
        return await this._responseHandler(error.response)
      } else {
        return await this._responseHandler(error)
      }
    }
  }
  /**
   * Use this function to call the Vendor's API by passing the path, method & optional (path's id, query, payload)
   * @param params 
   * @returns 
   */
  protected _apiCall = async (params: APICallFnParamsI): Promise<APICallFnResponseI> => {
    let attempts: number = 0;
    while (attempts < this._maxRetryLimit) {
      attempts++
      try {
        const response = await fetch(this._generateURL(params), this._generateRequestInit(params))
        return await this._responseHandler(response)
      } catch (error) {
        if (error instanceof ResponseError) {
          const status = error.response.status;
          if (status === 401) {
            // If the status was unauthorized then we'll call the login API(If overriden) & attempt to call the requested API for specific no of times
            if (attempts < this._maxRetryLimit) {
              // If login succeeds then we'll attempt to call the requested API until the while's condition is fulfilled
              await this._login()
              continue;
            }
          }
          return await this._responseHandler(error.response)
        } else {
          return await this._responseHandler(error)
        }
      }
    }
    return await this._responseHandler(undefined)
  }

}

export default Vendor