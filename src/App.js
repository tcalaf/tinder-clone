import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Login } from './Login';
import { AppContext } from "./libs/contextLib";
import {SignUp} from './SignUp';
import {Error} from './Error'
import {ChatPerson} from './ChatPerson'
import {ChatsPage} from './ChatsPage'
import {HomePage} from './HomePage'
import {PrivateRoute} from './PrivateRoute'

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
    
  return (
    <div className="App">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Router>
          <Switch>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>    
            <PrivateRoute authed={isAuthenticated} exact path ="/chat/:person" component={ChatPerson}/>
            <PrivateRoute authed={isAuthenticated} exact path ="/chat" component={ChatsPage} />
            <PrivateRoute authed={isAuthenticated} exact path ="/" component={HomePage}/>
            <Route component={Error} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;