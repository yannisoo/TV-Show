import React, { useState } from "react";
import LoginService from "../services/LoginServices";
import './login.css';



const Login: React.FC = () => {
  
  const [user, setUser] = useState({
        email: '',
        password: '',
        successMessage: null
      });


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload={
        "email":user.email,
        "password":user.password,
    };
    LoginService.login(payload).then(response => 
      localStorage.setItem('token', response.data.token)
      // redirect to home page
      ).then(() => {
        window.location.href = '/';
      })
}

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    console.log(e.target)
    setUser((prevState) => ({
      ...prevState,
      [id]: value
    }));

  };

  
  return (
    <div>
        <h2 className="login">Log in</h2>
            <form className="form-control" onSubmit={onSubmit}>
                <input 
                    id="email"
                    type="text"
                    placeholder="email"
                    className="form-input" 
                    value={user.email}
                    onChange={onChangeHandler}
                    required
                />
                <input 
                    id="password"
                    type="password" 
                    className="form-input" 
                    onChange={onChangeHandler}
                    value={user.password}
                    placeholder="password"
                    required
                />
                <button type="submit"
                    className="form-input" >
                    se connecter
                </button>
            </form>      
    
    </div>
  )
}


export default Login;

