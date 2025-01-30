import styled from "styled-components";

export const AboutMeContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  padding: ${p => p.noPadding ? '0 60px' : '48px 60px'};
  border-radius: 40px;
  position: relative;
  background: ${p => p.theme.palette.colors.black};
  @media(max-width: 767px){
    padding: 48px 0 48px 12px;
  }
`;

export const EditingButton = styled.div.attrs({
})`
  position: absolute;
  top: 24px;
  right: 24px;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.palette.colors.grey};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

