import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import EditList from './components/lists/EditList';
import EditItem from './components/items/EditItem';
import ListDetails from './components/lists/ListDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/list/:id" component={ListDetails} />
        <Route exact path="/editlist/:id" component={EditList} />
        <Route exact path="/edititem/:id" component={EditItem} />
      </Router>
    </div>
  );
}

export default App;
