import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRouter from './components/auth/ProtectedRouter';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRouter path="/home">
          <Home />
        </ProtectedRouter>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
