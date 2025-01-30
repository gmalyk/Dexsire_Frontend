import styled from 'styled-components'

export const FormTitle = styled.div.attrs({
})`           
    color: ${props => props.theme.palette.primary.main}; 
    font-weight: bold;
    font-size: 20px; 

    margin: 50px 0 10px;
`;
export const FormText = styled.div.attrs({
})`           
    font-size: 15px; 
    color: ${props => props.theme.palette.colors.grey};

    max-width: 240px;
    margin-bottom: 30px;
`;

export const FormSpacer = styled.div.attrs({
})`           
    margin-top: 40px;
`;

export const RegisterCall = styled.div.attrs({
})`           
    margin: 30px 0 0px;
    color: ${props => props.theme.palette.colors.grey};
    font-size: 15;
    font-weight: bold;
`;



export const BodyContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background: ${p => p.theme.palette.colors.black};
    padding-bottom: 80px;
`;

export const Background = styled.div.attrs({
})`
    background: center / cover no-repeat url('/images/success.png');
    width: 100%;
    height: 333px;
    position: absolute;
    top: 0;
    z-index: 0;
`;
export const BodyContent = styled.div.attrs({
})`
    z-index: 1;
    width: 100%;
    padding: 142px 72px 0px 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 56px;

    @media (max-width: 1440px) {
        height: auto;
    };

    @media (max-width: 991px) {
        padding: 142px 20px 20px 20px;
    };
`;

export const ButtonContent = styled.div.attrs({
})`
    width: ${p => p.width};
    @media (max-width: 768px) {
        width: 100%;
    };
`;

export const Content = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 100%;
`;





export const VerificationUploadContainer = styled.div.attrs({
})`
    width: 80%;
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: center;
    padding: 48px 0;
`;

export const VerificationUpload = styled.div.attrs({
})`
    width: 80%;
    display: flex;
    gap: 24px;
`;

export const SampleContent = styled.div.attrs({
})`
    max-width: 234px;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
`;

export const SampleTitle = styled.div.attrs({
})`
    padding: 0px 12px;
    background: ${ p => p.theme.palette.orange.main };
    text-align: center;
    
    color: ${ p => p.theme.palette.colors.white };
    
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    
`;

export const SampleImage = styled.div.attrs({
})`
    width: 100%;
    aspect-ratio: 1 / 1;
    background: url(${ p => p.url}) no-repeat center center / cover;
    max-height: 100%;
`;




export const AppearanceTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px; 
  color: ${props => props.theme.palette.colors.white};
  width: 80%;
  padding-top: 24px;
`;


export const UploadFileContainer = styled.div.attrs({
})`
    width: 100%;
    height: 284px;
    border: 1px dashed ${props => props.theme.palette.borderBackground.main};
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 24px;
`;

export const UploadFileContent = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
`;

export const UploadImageContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 284px;
  overflow: auto;
  width: 100%;
`;


export const AppearanceText = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  color: ${props => props.theme.palette.colors.purple};
  display: flex;
  align-items: center;
  gap: 8px;
  ${
    p => p.full ? `
        width: 80%;
    ` : ``
  }
`; 