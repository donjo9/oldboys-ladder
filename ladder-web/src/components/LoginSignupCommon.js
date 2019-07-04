import styled from "styled-components";
export const StyledInput = styled.input`
    padding: 10px 10px;
    font-size: 1rem;

    border: none;
    box-shadow: 0 0 5px 0 var(--border-hightlight);
    margin: 10px;
    border-radius: 5px;
    color: var(--background);
    &::placeholder {
        color: var(--input-highlight);
    }
`;

export const LoginSignUpContainer = styled.div`
    width: 100%;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const Error = styled.div`
    color: #ffc71d;
    text-align: center;
`;
