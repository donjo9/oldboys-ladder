import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { ButtonBase } from "./Button";
import Modal from "./Modal";
import Login from "./Login";
import SignUp from "./SignUp";
import { LoginContext } from "./context";

const HeaderContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: transparent;
    width: 100%;
    justify-content: space-around;
    box-shadow: inset 0 0 15px 10px var(--background);
`;

const HeadLine = styled.h1`
    height: 10vh;
    line-height: 10vh;
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 3rem;
    font-family: "Martel", serif;
    a {
        color: white;
        text-decoration: none;
    }
`;

const NavBar = styled.nav`
    display: flex;
    align-items: center;
    text-transform: uppercase;
`;

const NavLink = styled(Link)`
    margin: 15px;
    text-decoration: none;
    font-size: 1.2rem;
    color: white;
    border-bottom: 1px solid white;
    &:hover {
        border-bottom: 1px solid var(--border-hightlight);
        transition: border-bottom 250ms ease-in;
    }
`;

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
`;

const Button = styled.button`
    ${ButtonBase};
`;


const Header = props => {
    const token = useContext(LoginContext);
    const [login, setLogin] = useState(false);
    const [signup, setsignup] = useState(false);

    return (
        <HeaderContainer>
            <Login show={login} hide={setLogin} />

            <Modal visable={signup} dismiss={() => setsignup(false)}>
                <SignUp />
            </Modal>
            <HeadLine>
                <Link to="/">OBL</Link>
            </HeadLine>

            <NavBar>
                <NavLink to="ladder">Ladder</NavLink>
                {token.token !== "" ? <NavLink to="profile">Profile</NavLink> : null}
            </NavBar>
            <ProfileContainer>
                <Button type="button" onClick={() => setLogin(true)}>
                    Login
                </Button>
                <Button type="button" onClick={() => setsignup(true)}>
                    Signup
                </Button>
            </ProfileContainer>
        </HeaderContainer>
    );
};
export default withRouter(Header);
