import styled from 'styled-components'

export const FormTitle = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: left;
    color: ${props => props.theme.palette.colors.orange};

    @media (max-width: 768px) {
        text-align: center;
    }
`;

export const FormText = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 32px;
    font-weight: 500;
    line-height: 38.73px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};

    @media (max-width: 768px) {
        font-size: 24px;
        line-height: 30px;
        text-align: center;
        white-space: normal;
        max-width: 300px;
        margin: 0 auto;
    }
`;

export const FormSpacer = styled.div.attrs({
})`           
`;

export const ForgotLink = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        text-align: center;
        width: 100%;
    }
`;

export const RegisterCall = styled.div.attrs({
})`           
    margin: 30px 0 0px;
    color: ${props => props.theme.palette.colors.grey};
    font-size: 15;
    font-weight: bold;
    text-align: left;
    
    @media (max-width: 768px) {
        text-align: center;
    }
`;

export const CardContainer = styled.div.attrs({
})` 
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 90px;
    width: 100%;
    gap: 20px;
    flex-wrap: wrap;
    z-index: 1;
`;

export const LoginContainer = styled.div.attrs({
})` 
    max-width: 526px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    border-radius: 16px;
    margin-left: 10%;
    
    @media (max-width: 991px) {
        margin-left: 0;
        align-items: center;
        padding: 20px;
    }
`;

export const LoginContent = styled.div.attrs({
})` 
    padding: 85px 70px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    position: relative;
    width: 100%;
    max-width: 100%;
    background: rgba(0, 0, 0, 0.3);

    @media(max-width: 991px){
        padding: 85px 20px 20px 20px;
        min-height: auto;
        padding-top: 120px;
        background: transparent;
        align-items: center;
        justify-content: center;
    }
`;

export const LoginText = styled.div.attrs({
})`
  color: ${props => props.theme.palette.colors.white};
  font-size: 24px;
  font-weight: 400;
  text-align: left;
  white-space: pre-line;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 20px; // Smaller text on mobile
    white-space: normal; // Allow text to wrap naturally
    text-align: center;
    
    // Force two-line display
    &:after {
      content: '';
      display: block;
      margin-top: 8px;
    }
  }
`;