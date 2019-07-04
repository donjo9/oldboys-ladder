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



const Main = () => {
    return (
        <MainContainer>
        </MainContainer>
    );
};

export default Main;
