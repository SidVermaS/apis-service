import Blog from "./vendors/Blog"

const main = async () => {
  const blog = new Blog({
    'baseURL': 'https://reqres.in/api',
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  })
  try {    
    const  loginResult=await blog.login()
    console.log(loginResult);
  } catch (_error) {
    console.error(_error);    
  }
  // try {    
  //   const listUsersResult=await blog.listUsers({page:1, per_page:10})
  //   // console.log(listUsersResult);
    
  // } catch (_error) {
  //   console.error(_error);
  // }
  try {    
    const getUserResult=await blog.getUser(2)
    console.log(getUserResult);
  } catch (_error) {
    console.error(_error);
  }
  try {
    const createUserResult= await blog.createUser({
        "name": "morpheus",
        "job": "leader"
      })
      console.log(createUserResult);
  } catch (_error) {
    console.error(_error);
  }
  // try {    
  //   const updateUserResult = await blog.updateUser({
  //   "id": 2, "name": "morpheus",
  //   "job": "zion resident"
  // })
  //   console.log(updateUserResult);
  // } catch (_error) {
  //   console.error(_error);
  // }
  // try {    
  //   await blog.deleteUser(2)
  // } catch (_error) {
  //   console.error(_error);
  // }
}
main()