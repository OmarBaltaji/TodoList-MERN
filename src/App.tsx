import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </div>
  );
}

export default App;
