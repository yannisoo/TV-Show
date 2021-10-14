import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home  from "./components/home";
import Show from "./components/show";

function App() {
  return (
    <Router>
      <div className="Holder">
        <nav>
              <Link to="/">
                <img src="homie.png" alt="" className="home"/>
              </Link>
        </nav>

        <Switch>
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
