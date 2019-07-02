import React, { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import { Link } from "react-router-dom";
import { ButtonBase } from "./Button";
import Modal from "./Modal";

const MainContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
`;

const ButtonContainer = styled.div`
    width: 100%;
    background: var(--background);
    height: 15vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const LinkButton = styled(Link)`
    ${ButtonBase}
`;
const Button = styled.button`
    ${ButtonBase}
`;

const Main = () => {
    const [login, setLogin] = useState(false);
    return (
        <MainContainer>
            <Modal visable={login} dismiss={() => setLogin(false)}>
                <Login />
            </Modal>
            <ButtonContainer>
                <LinkButton to="/ladder">Enter</LinkButton>
                <Button onClick={() => setLogin(true)}>Login</Button>
            </ButtonContainer>
        </MainContainer>
    );
};

export default Main;
