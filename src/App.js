import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParticleBackground from "./ParticleBackground";
import Login from "./components/login";
import Recover from "./components/login/recover";
import Home from './components/dashboard/home';
import Navbar from './components/dashboard/navbar';
import Sidebar from './components/dashboard/sidebar';
import Users from './components/dashboard/users';
import Entries from './components/dashboard/entries';

import "./App.css";

export const AuthContext = createContext();

function App() {

  const [token, setToken] = useState();
  useEffect(() => {
    try {
      const newToken = localStorage.getItem("devschooltoken");
      if (newToken) {
        setToken(newToken);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken: setToken }}>
    <div>
      <ParticleBackground />
      <div>
        <Router>
          <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Recover" exact component={Recover} />
            <div className="dashboard sideInactive">
              <Navbar  />
              <Sidebar />
              <Route path="/Dashboard" exact component={Home} />
              <Route path="/Users" exact component={Users} />
              <Route path="/Entries" exact component={Entries} />
              </div>
          </Switch>
        </Router>
      </div>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
