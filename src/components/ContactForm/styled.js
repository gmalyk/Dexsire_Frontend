import styled from "styled-components";

export const FormContainer = styled.div.attrs({})`
  display: flex;
  width: 100%;
  max-width: 524px;
  flex-direction: column;
  gap: 16px;

  @media(max-width: 767px){
    background: black;
    padding: 36px 12px 12px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    align-items: center;
  }
`;
