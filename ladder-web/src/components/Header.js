import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { AUTHTOKEN } from "../constants";

const HeaderContainer = styled.div`
    display: flex;
    background: var(--background);
    width: 100%;
`;

const HeadLine = styled.h1`
    height: 15vh;
    line-height: 15vh;
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 3rem;
    font-family: "Martel", serif;
    flex-basis: 2;
    flex-grow: 1;
`;

const NavBar = styled.nav`
    flex-basis: 1;
    flex-grow: 1;
    display: flex;
    align-items: center;
`;

const NavLink = styled(Link)`
    padding: 15px;
    font-size: 1.2rem;
`;

const Header = props => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const authtoken = localStorage.getItem(AUTHTOKEN);
        console.log(authtoken);
        if (authtoken !== null) {
            setLoggedIn(true);
        }
    }, []);
    return (
        <HeaderContainer>
            <HeadLine>Old Boys Liga!</HeadLine>
            <NavBar>
                <NavLink to="ladder">Ladder</NavLink>
                {loggedIn ? <NavLink to="profile">Profile</NavLink> : null}
            </NavBar>
        </HeaderContainer>
    );
};
export default withRouter(Header);
