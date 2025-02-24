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

    @media (max-width: 768px) {
        ${p => ['Profile', 'Appearance', 'Services offered'].includes(p.infoOption) && `
            &::before {
                content: '';
                position: fixed;
                top: 300px;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('/images/announcement.png');
                background-size: cover;
                background-position: top center;
                background-repeat: no-repeat;
                z-index: 0;
                mask-image: linear-gradient(to bottom, transparent 0%, black 50px);
                -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 50px);
            }
            position: relative;
            z-index: 1;
        `}
    }
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
    z-index: 2;
    width: 100%;
    padding: 142px 72px 0px 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 56px;
    position: relative;

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





export const VerificationUploadContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const VerificationUpload = styled.div`
    display: flex;
    gap: 24px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        align-items: center;
    }
`;

export const SampleContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 200px;

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 16px;
    }
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




export const AppearanceTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: ${props => props.theme.palette.colors.white};
    margin-bottom: 24px;

    @media (max-width: 768px) {
        text-align: center;
        margin-bottom: 16px;
    }
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

export const AppearanceContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1075px;

    @media (max-width: 768px) {
        margin-bottom: 24px;
        background: ${props => props.theme.palette.colors.black};
        border-radius: 12px;
        padding: 16px;
    }
`; 