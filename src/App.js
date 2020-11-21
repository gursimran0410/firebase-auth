import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import {AuthProvider} from './Components/auth'
import PrivateRoute from './Components/PrivateRoute'
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
