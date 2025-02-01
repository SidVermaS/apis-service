import { ConfigI } from "../types/config";
import { MethodI } from "../types/method";

class Vendor<T extends ConfigI<T>>  {
  private _maxRetryLimit:number=3
  protected _config:ConfigI<T>={};

  constructor(config: ConfigI<T>)  {
    this._config=config;
  }
  /**
   * Override this function to set the key-value pairs to the header before making an API  request 
   */
  protected _headersInjector()
  {

  }
  protected GET=async (url:string, {

  })=>{
    let retryAttempt:number=0
    while(retryAttempt<this._maxRetryLimit) {
      
    }
    const url:URL={}
    await fetch(this._config.baseURL,{method:'GET' as MethodI,})
  }

}

export default Vendor