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

