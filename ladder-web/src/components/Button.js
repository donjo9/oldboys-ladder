import styled, { css } from "styled-components";

export const ButtonBase = css`
    background-color: transparent;
    border: 1px solid var(--button-border);
    color: white;
    border-radius: 23px;
    font-size: 1.2rem;
    font-weight: 400;
    padding: 0.8rem 1.6rem;
    margin: 5px;
    text-decoration: none;
    line-height: 1.2rem;
    display: block;
    cursor: pointer;
    &:hover,
    &:active {
        background-color: var(--border-hightlight);
        border: 1px solid var(--border-hightlight);
        color: black;
        transition: background-color 250ms ease-in, color 250ms ease-in;
    }
`;

export const Button = styled.div`
    ${ButtonBase}
    font-size: 1rem;
    text-align: center;
`;
