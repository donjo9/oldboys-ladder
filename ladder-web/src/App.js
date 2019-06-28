import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Ladder from "./components/Ladder";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/ladder" exact component={Ladder} />
            </Switch>
        </Router>
    );
}

export default App;
