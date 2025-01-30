import styled from "styled-components";

export const EscortControlContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 32px;
  width: 100%;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  gap: 8px;




  @media(max-width:767px){
    width: 100%;
    max-width: 100%; 
    overflow: auto;
  }
`;

export const Subtitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};

`;

export const RequestFooter = styled.div.attrs({
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

