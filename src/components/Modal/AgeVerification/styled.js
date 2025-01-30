import styled from "styled-components";
import { Icon } from "ui/styled";

export const AgeVerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
`;

export const VerificationBox = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  color: white;
`;

export const Title = styled.h1`
  color: ${p => p.theme.palette.colors.red};
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Text = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 30px;
  line-height: 1.6;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
`;

export const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  
  a {
    color: white;
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 1;
    }
  }
`;

export const AgeVerification = styled.div.attrs({
})`
    display: flex;
    max-width: 457px;
    background: ${props => props.theme.palette.colors.black};
    border-radius: 40px;
    padding: 48px;
    gap: 33px;
    flex-direction: column;
    align-items: center;
    margin: auto;
`;

export const CompanyButtonContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    gap: 16px;
`;

export const CloseContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

export const Logo = styled(Icon).attrs({})`
    width: 155px;
    height: 32px;    
`;

export const ModalTitle = styled.div.attrs({})`
    font-family: Inter;
    font-size: 24px;
    font-weight: 500;
    line-height: 29.05px;
    text-align: center;
    color: ${p => p.theme.palette.error.main}
`;

export const ModalText = styled.div.attrs({})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: ${p => p.white ? p.theme.palette.colors.white : p.theme.palette.colors.purple};
    ${p => p.big ? `
        font-size: 24px;
        ` : ''};
    ${p => p.link ? `
        &:hover{
            text-decoration: underline;
            cursor: pointer;
        }
        ` : ``};
    
`;


export const TermContainer = styled.div.attrs({})`
        display: flex;
        flex-direction: column;
        gap: 6px;
`;

export const TermLink = styled.div.attrs({})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;

`;