import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Ladder from "./components/Ladder";
import Profile from "./components/Profile";
import Header from "./components/Header";

function App() {
    return (
        <React.Fragment>
            <Router>
            <Header />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/ladder" exact component={Ladder} />
                    <Route path="/profile" exact component={Profile} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
