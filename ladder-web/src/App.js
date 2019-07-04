import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Main from "./components/Main";
import Ladder from "./components/Ladder";
import Profile from "./components/Profile";
import Header from "./components/Header";
import { LoginProvider } from "./components/context";

const ContentContainer = styled.section`
    background-color: var(--background);
    flex-grow: 1;
    width: 100%;
    max-width: 700px;
    align-self: center;
    padding: 15px;
`;

function App() {
    return (
        <React.Fragment>
            <LoginProvider>
                <Router>
                    <Header />
                    <ContentContainer>
                        <Switch>
                            <Route path="/" exact component={Main} />
                            <Route path="/ladder" exact component={Ladder} />
                            <Route path="/profile" exact component={Profile} />
                        </Switch>
                    </ContentContainer>
                </Router>
            </LoginProvider>
        </React.Fragment>
    );
}

export default App;
