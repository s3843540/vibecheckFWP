import React, { useState } from "react";
import { getUser, verifyUser } from "../data/repository";
import "./Login.css"

function Login(props) {
  const [fields, setFields] = useState({email: "", password: ""})
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    //Setting inputted values to fields.
    const temp = { email: fields.email, password: fields.password };

    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //Checks if user exists in local storage.
    const verified = verifyUser(fields.email, fields.password);

    //When true, sets session variables and redirects user to profile page.
    if(verified === true) {
      const user = JSON.parse(getUser());
      props.loginUser(user[0].username);
      props.loginEmail(user[0].email);
      props.registerDate(user[0].date);
      props.history.push("/profile");
      return;
    }

    //When verified is false, gives error message and resets password field.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);

    setErrorMessage("Email and/or password is invalid, please try again.");
  }

  return (
    <form class="login-form" onSubmit={handleSubmit}>
        <div class="login-container">
            <h1 class="text-center">Login</h1>
            <hr/>
            <input type="text" placeholder="Enter email..." name="email" id="email" value={fields.email} onChange={handleInputChange} required/>
            <input type="password" placeholder="Enter password..." name="password" id="password" value={fields.password} onChange={handleInputChange} required/>
            <hr/>
            <button type="submit" class="loginbtn">Login</button>
            {errorMessage !== null &&
              <div class="error-text">
                <span class="text-danger ">{errorMessage}</span>
              </div>
            }
        </div>
    </form>
  );
}
export default Login;