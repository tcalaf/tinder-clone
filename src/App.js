import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Login } from './pages/Login';
import {SignUp} from './pages/SignUp';
import {Error} from './pages/Error'
import {ChatPerson} from './pages/ChatPerson'
import {ChatsPage} from './pages/ChatsPage'
import {HomePage} from './pages/HomePage'
import {PrivateRoute} from './context/PrivateRoute'
import {AuthProvider} from './context/auth'
import {ProfilePage} from './pages/ProfilePage'
import {CreateProfile} from './pages/CreateProfile'

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>    
            <PrivateRoute exact path ="/chat/:id" component={ChatPerson}/>
            <PrivateRoute exact path ="/chat" component={ChatsPage} />
            <PrivateRoute exact path ="/profile" component={ProfilePage}/>
            <Route exact path ="/createProfile" render={(props) => <CreateProfile {...props}/>}/>
            <PrivateRoute exact path ="/" component={HomePage}/>
            <Route component={Error} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;