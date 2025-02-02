import { APICallFnParamsI, APICallFnResponseI, KeyStringStringI, URLParamsI, Vendor } from 'vendor-api'
import type { BlogConfigI } from './types/BlogConfig'
import { LoginReqSchema } from './schemas/login/req'
import { LoginResI, LoginResSchema } from './schemas/login/res'
import { BlogReqDataError } from './errors/BlogReqDataError'
import { BlogResDataError } from './errors/BlogResDataError'
import { PaginationReqI, PaginationReqSchema } from './schemas/common/pagination/req'
import { ListUsersResI, ListUsersResSchema } from './schemas/listUsers/res'
import { GetUserResI, GetUserResSchema } from './schemas/getUser/res'
import { BlogClientError } from './errors/BlogClientError'
import { BlogUnknownError } from './errors/BlogUnknownError'
import { BlogAuthError } from './errors/BlogAuthError'
import { BlogInternalServerError } from './errors/BlogInternalServerError'
import { BlogAPIError } from './errors/BlogAPIError'
import { CreateUserReqI, CreateUserReqSchema } from './schemas/createUser/req'
import { CreateUserResI, CreateUserResSchema } from './schemas/createUser/res'
import { UpdateUserReqSchema } from './schemas/updateUser/req'
import { UpdateUserResI, UpdateUserResSchema } from './schemas/updateUser/res'
import { UpdateUserModuleReqI, UpdateUserModuleReqSchema } from './schemas/updateUser/moduleReq'

class Blog extends Vendor<BlogConfigI> {
  constructor(config: BlogConfigI) {
    super(config)
    // These headers will persist for all the API's requests
    this._headers['Content-Type'] = 'application/json'
    this._headers['Accept'] = 'application/json'

  }
  protected async _headersInjector(params: URLParamsI) {
    const headers: KeyStringStringI = {}
    // For /login, /register APIs, we won't pass token in the headers because we're suppose to receive the token from the /login API
    if (![params.path.includes('/login'),params.path.includes('/register')].includes(true)) {
      headers['Authorization'] = `Bearer ${this._config.token!}`
    }
    return headers;
  }
  public async login(): Promise<LoginResI> {
    try {
      const { data: reqData, error: reqError } = LoginReqSchema.safeParse({
        email: this._config.email,
        password: this._config.password,
      })
      if (reqError) {
        throw new BlogReqDataError(reqError.errors)
      }
      const response = await this._loginAPICall<LoginResI>({ method: 'POST', path: '/login', body: reqData })
      const { data: resData, error: resError } = LoginResSchema.safeParse(response)
      if (resError) {
        throw new BlogResDataError(resError.errors)
      }
      // We're setting the token in our config, so that it can be reused for the subsequent API calls
      this._config.token = resData.token
      return resData;
    } catch (error) {
      throw this._handleCatch(error)
    }
  }
  public async listUsers(params: PaginationReqI): Promise<ListUsersResI> {
    try {
      const { data: query, error: reqError } = PaginationReqSchema.safeParse(params)
      if (reqError) {
        throw new BlogReqDataError(reqError.errors)
      }
      const response = await this._apiCall<LoginResI>({ method: 'GET', path: '/users', query })
      const { data: resData, error: resError } = ListUsersResSchema.safeParse(response)
      if (resError) {
        throw new BlogResDataError(resError.errors)
      }
      return resData;
    } catch (error) {

      throw this._handleCatch(error)
    }
  }
  public async getUser(id: number): Promise<GetUserResI> {
    try {
      const response = await this._apiCall<GetUserResI>({ method: 'GET', path: '/users', id })
      const { data: resData, error: resError } = GetUserResSchema.safeParse(response)
      if (resError) {
        throw new BlogResDataError(resError.errors)
      }
      return resData;
    } catch (error) {
      throw this._handleCatch(error)
    }
  }
  public async createUser(params: CreateUserReqI): Promise<CreateUserResI> {
    try {
      const { data: reqData, error: reqError } = CreateUserReqSchema.safeParse(params)
      if (reqError) {
        throw new BlogReqDataError(reqError.errors)
      }
      const response = await this._apiCall<CreateUserResI>({ method: 'POST', path: '/users', body: reqData })
      const { data: resData, error: resError } = CreateUserResSchema.safeParse(response)
      if (resError) {
        throw new BlogResDataError(resError.errors)
      }
      return resData;
    } catch (error) {
      throw this._handleCatch(error)
    }
  }
  public async updateUser(params: UpdateUserModuleReqI): Promise<UpdateUserResI> {
    try {

      const { data: moduleReqData, error: moduleReqError } = UpdateUserModuleReqSchema.safeParse(params)
      if (moduleReqError) {
        throw new BlogReqDataError(moduleReqError.errors)
      }
      const { data: reqData, error: reqError } = UpdateUserReqSchema.safeParse(moduleReqData)
      if (reqError) {
        throw new BlogReqDataError(reqError.errors)
      }
      const response = await this._apiCall<UpdateUserResI>({
        method: 'PATCH', path: '/users', id: moduleReqData.id,
        body: reqData
      })
      const { data: resData, error: resError } = UpdateUserResSchema.safeParse(response)
      if (resError) {
        throw new BlogResDataError(resError.errors)
      }
      return resData;
    } catch (error) {
      throw this._handleCatch(error)
    }
  }
  public async deleteUser(id: number): Promise<void> {
    try {
      const _response = await this._apiCall<unknown>({ method: 'DELETE', path: '/users', id })
      return;
    } catch (error) {
      throw this._handleCatch(error)
    }
  }
  protected async _responseHandler(_params: APICallFnParamsI, data: Response | unknown): Promise<APICallFnResponseI> {
    if (data instanceof Response) {
      const response: Response = data
      const status = response.status;
      let json;
      if (status !== 204) {
        json = await response.json();
      }
      if (status > 199 && status < 300) {
        return {
          status,
          json
        }
      }
      else if (status === 401) {
        throw new BlogAuthError(status, json)
      } else if (status > 399 && status < 500) {
        throw new BlogClientError(status, json)
      } else if (status > 499 && status < 600) {
        throw new BlogInternalServerError(status, json)
      } else {
        throw new BlogAPIError(status, json)
      }
    } else {
      throw new BlogUnknownError({ error: JSON.stringify(data) })
    }
  }
  protected _handleCatch(error: unknown): void {
    if (error instanceof BlogClientError) {
      const e = error as BlogClientError
      throw new BlogClientError(e.status, e.data)
    } else if (error instanceof BlogAuthError) {
      const e = error as BlogAuthError
      throw new BlogAuthError(e.status, e.data)

    } else if (error instanceof BlogReqDataError) {
      throw new BlogReqDataError(error)

    } else if (error instanceof BlogResDataError) {
      throw new BlogResDataError(error)

    } else {
      throw new BlogUnknownError(error)
    }
  }
}

export default Blog