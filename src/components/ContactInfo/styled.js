import styled from "styled-components";

export const ContactInfoContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 521px;
  min-height: 626px;
  background: ${p => p.theme.palette.colors.black};
  padding: 24px;
  border-radius: 40px;
  justify-content: center;
`;

export const ContactInfoContent = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  @media(max-width: 767px){
    flex-direction: column;
    align-items: center;
  }
`;
export const ContactInfoIconContainer = styled.div.attrs({})`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  max-width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${p => p.theme.palette.colors.orange};
`;

export const SubTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  max-width: 329px;
  color: ${p => p.theme.palette.colors.purple};

  @media(max-width: 767px){
    text-align: center;
  }
`;

export const ContactContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  @media(max-width: 767px){
    align-items: center;
  }
`;