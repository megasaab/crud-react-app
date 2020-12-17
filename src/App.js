import React from "react";
import Main from "./components/Main/Main";
import './App.css'
import Developers from "./components/Developers/Developers";
import Navigation from "./components/Navigation/Nav";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation/>
                  <Switch>
                      <Route path="/" exact component={Main}/>
                      <Route path="/main" component={Main}/>
                      <Route path="/developers" component={Developers}/>
                  </Switch>
            </div>
        </Router>
    );
}

export default App;
