import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import New from './New';
import PostsHome from './PostsHome';
import Update from './Update';
import Delete from './Delete';

function App() {
    
  return (
    <Router>
        <div className="App">
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/api/new">
                    <New />
                </Route>
                <Route exact path="/api/posts">
                    <PostsHome />
                </Route>
                <Route exact path="/api/update">
                    <Update />
                </Route>
                <Route exact path="/api/delete">
                    <Delete />
                </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
