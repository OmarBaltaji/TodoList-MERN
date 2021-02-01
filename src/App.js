import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import EditTodoList from './components/EditTodoList';
import EditItem from './components/EditItem';
import OneList from './components/OneList';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/list/:id" component={OneList} />
        <Route exact path="/editlist/:id" component={EditTodoList} />
        <Route exact path="/edititem/:id" component={EditItem} />
      </Router>
    </div>
  );
}

export default App;
