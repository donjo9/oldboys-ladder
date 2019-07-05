import styled, { css } from "styled-components";
import {Link} from "react-router-dom";

export const ButtonBase = css`
    background-color: transparent;
    border: 1px solid var(--button-border);
    color: white;
    border-radius: 23px;
    font-weight: 400;
    padding: 0.8rem 1.6rem;
    margin: 5px;
    text-decoration: none;
    line-height: 1.2rem;
    display: block;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    &:hover,
    &:active {
        background-color: var(--common-highlight);
        border: 1px solid var(--common-highlight);
        color: black;
        transition: background-color 250ms ease-in, color 250ms ease-in;
    }
`;

export const Button = styled.button`
    ${ButtonBase}
`;

export const ButtonLink = styled(Link)`
${ButtonBase}
`
