import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Edit from "./Edit";
import Post from "./Post";
import { getUser, resetUser } from "../data/repository"; 

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  //Defining all session variables.
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getUser());
  const [date, setDate] = useState(getUser());

  const loginUser = (username) => {
    setUsername(username);
  }

  const loginEmail = (email) => {
    setEmail(email);
  }

  const registerDate = (date) => {
    setDate(date);
  }

  const logoutUser = () => {
    resetUser();
    setUsername(null);
  }

  return (
    <Router>
        <Header username={username} logoutUser={logoutUser}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/sign-up" render={props => (
              <Register {...props} loginUser={loginUser} loginEmail={loginEmail} registerDate={registerDate}/>
            )
          }>
          </Route>
          <Route exact path="/login" render={props => (
              <Login {...props} loginUser={loginUser} loginEmail={loginEmail} registerDate={registerDate}/>
          )}>
          </Route>
          <Route exact path="/profile" render={props => (
              <Profile {...props} username={username} email={email} date={date} logoutUser={logoutUser}/>
          )}>  
          </Route>
          <Route exact path="/edit" render={props => (
              <Edit {...props} loginUser={loginUser} loginEmail={loginEmail} registerDate={registerDate}/>
          )}>
          </Route>
          <Route exact path="create-post" render={props => (
              <Post {...props}/>
          )}>
          </Route>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;