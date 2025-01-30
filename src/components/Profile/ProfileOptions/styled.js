import styled from "styled-components";

export const OptionsContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;  
  flex-wrap: wrap;
  @media (max-width: 400px) {
    gap: 8px;
  }
  
  @media(max-width:767px){
    justify-content: center;
  }
`;

export const Option = styled.div.attrs({})`
  width: 57.95px;
  height: 57.95px;
  border-radius: 150.11px ;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${p => p.active ? `
    background: ${p.theme.palette.colors.orange};
    `: ``};
  &:hover {
    transition: all 0.3s ease;
    background: ${p => p.theme.palette.colors.orange};
  }
`;