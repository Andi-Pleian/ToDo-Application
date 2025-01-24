import React, {useState} from 'react'
import styles from './Login.module.css'
import login from '../../assets/login.png'
import {Button, Input} from 'antd'
import { Link } from 'react-router'
import AuthServices from '../../services/authServices'

function Login() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ()=> {
    console.log("Login");

    try {
      setLoading(true); //loading while waiting for response
      let data = {
          username,
          password
      }
      const response = await AuthServices.loginUser(data);
      console.log(response.data);
      setLoading(false); // exit loading after getting response
    }catch(err) {
      console.log(err);
      setLoading(false); // or exit loading after getting an error
    }
  }

  return (
    <div className={styles.login__card}>
      <img src={login} alt=".."/>

      <h2>Login</h2>

      <div className={styles.input__wrapper}>
        <Input 
        placeholder="Username" 
        value={username} 
        onChange={(e)=>setUsername(e.target.value)}/>

        <Input.Password
        placeholder="Password" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
      </div>

      <div className={styles.input__info}>
        New Use? <Link to="/register"> Register </Link>
      </div>

      <Button loading={loading} type="primary" size="large" disabled={!username || !password} onClick={handleSubmit}>Login</Button>
    </div>
  )
}

// button disabled option tells the button when it should be disabled (line 33)

export default Login