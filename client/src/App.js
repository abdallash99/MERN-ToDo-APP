import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/page/Home';
import TodoState from './context/todo/TodoState';
import Register from './components/auth/Register';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
if (localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {
  return (

    <AuthState>
      <AlertState>
        <TodoState>
          <Router>
            <div className="App">
              <Navbar />
              <Alert />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Router>
        </TodoState>
      </AlertState>
    </AuthState>
  );
}

export default App;
