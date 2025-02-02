# Vendor API 🚀
Do you want to interact with other microservices or third party APIs of applications such as Payment gateways, Analytics, Social media integration, Geolocation Services or any application seamlessly without having to worry about signing & the token being expired?
* Well, we can call any of the APIs by simply calling a function which will be calling the vendor's API under the hood. 😇
* This package will take care of injecting headers, throwing the errors, parsing the data by use of a simple function. 🙀


## Example
### Application of the Vendor class 🔥
Here's an application of the Vendor class in the client's code.<br/>
In this example, we will interact with the Blog Application.
<br/>
 In your application, you will have to create an instance of the Blog & you will be able to call all of it's APIs.

```typescript
   const blog = new Blog({
    'baseURL': 'https://reqres.in/api',
    "email": "eve.holt@reqres.in",
    "password": "cityslicka",
    saveDataFn: (..._args) => {
      // This function can be used for saving the newly generated token in to a file/database/storage  
    },
  })
```

We'll fetch a list of users with a function which will call the Blog's API under the hood.
Even if the token is expired or not passed, the function will regenerate on it's own and call the API on it's own

```typescript
try {    
   const getUserResult=await blog.getUser(2)
} catch (error) {
  if(error instanceof BlogClientError)  {
    // Write your code 
  } else if(error instanceof BlogInternalServerError)  {
    // Write your code 
  }
}
```

### Implementation of Vendor Class ⚙️
Now, we will see how can we create a Blog class and implement the Vendor class to call the APIs under the hood.
For better understanding, please refer to
[Blog.ts](./examples/blog/src/vendors/Blog.ts)

#### 1. Inheritance
We have inherited the Blog class from the Vendor class which will provide it's functionality by default
```typescript
class Blog extends Vendor<BlogConfigI> {

}
```

#### 2. Setting headers for authenticated APIs
Authenticated APIs require a token which you can include in the _headersInjector. Some APIs might not require a token then you can skip them with an if condition. _headersInjector() is optional because some APIs might not required tokens at all
```typescript
 protected async _headersInjector(params: URLParamsI) {
    const headers: KeyStringStringI = {}
    if (![params.path.includes('/login'),params.path.includes('/register')].includes(true)) {
      headers['Authorization'] = `Bearer ${this._config.token!}`
    }
    return headers;
  }
```

#### 3. GET Method's API Request
We are calling a get method's API, we're passing the method, path & id as arguments. Also, we have passed the response's interface as a generic type of the functions.
After we receive the response, we are validating the data with zod. (optional).
We will understand about the function in the catch block later on.
```typescript
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
```