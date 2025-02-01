import Blog from "./vendors/Blog"

const main=async ()=>{
  const blog=new Blog({
    'baseURL':'https://reqres.in/api',
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  })
  
}
main()