import React from 'react';
import './App.css';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons"
import Chats from './Chats'
import ChatScreen from './ChatScreen'
import { Login } from './Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path ="/chat/:person">
            <Header backButton="/chat"/>
            <ChatScreen></ChatScreen>
          </Route>
          <Route path ="/chat">
            <Header backButton="/"/>
            <Chats></Chats>
          </Route>
          <Route path ="/">
            <Header />
            <TinderCards />
            <SwipeButtons />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;