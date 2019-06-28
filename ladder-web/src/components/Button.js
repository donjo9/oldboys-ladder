import { css } from "styled-components";


export const ButtonBase = css`
    background-color: var(--button-background);
    border: 2px solid var(--button-border);
    color: white;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 400;
    padding: 0.8rem 1.6rem;
    margin: 0 1.5rem;
    box-shadow: 0 0 8px 2px var(--button-border);
    text-decoration: none;
    line-height: 1.2rem;
    display: block;
    cursor: pointer;
    &:hover,
    &:active {
        border: 2px solid var(--button-border);
        box-shadow: 0 0 8px 2px var(--border-hightlight);
    }
`;

