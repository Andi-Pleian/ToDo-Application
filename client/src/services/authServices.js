import axios from 'axios';


// we create in this file, when the domain changes (or any apy endpoint) we have to make updates only here
// not in all pages
const SERVER_URL = 'http://localhost:5000/api'; // this is my endpoint here; in production we will have a domain here

const registerUser = (data) => {
  return axios.post(SERVER_URL+'/register',data);
}

const loginUser = (data) => {
  return axios.post(SERVER_URL+'/login',data);
}

const AuthServices = {
  registerUser,
  loginUser
}

export default AuthServices;