import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Create from './Create';

function App() {
    
  return (
    <Router>
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/create">
                    <Create />
                </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
