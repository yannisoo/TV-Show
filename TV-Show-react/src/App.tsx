import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home  from "./components/home";
import Login from './components/login';
import Show from "./components/show";
import MyShows from "./components/myShows";

function App() {
  return (
    <Router>
      <div className="Holder">
        <nav>
              <Link to="/">
                <h5>Home</h5>
              </Link>
              <Link to="/myShows">
                <h5>My Shows</h5>
              </Link>
              <Link to="/login">
                <h5>login</h5>
              </Link>
        </nav>

        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/myShows" component={MyShows}/>
          <Route path="/show/:id" component={Show}/>
          <Route path="/" component={Home}/>
        </Switch>
        <footer>
          <span>
            Yannis Battiston
          </span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
