import Login from './Login';
import Home from './Home';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

function App() {
  return (
      <>
      <Switch>
          <Route path="/" exact render={() => {
            return localStorage.getItem('accessToken') ? <Home /> : <Redirect to="/login" />
          }}>  
          
          </Route>
          <Route path="/login">
            <Login />
          </Route>
      </Switch>
      </>
  );
}

export default App;
