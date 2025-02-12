import styled from 'styled-components'

export const FormTitle = styled.div.attrs({
})`           
    color: ${props => props.theme.palette.primary.main}; 
    font-weight: bold;
    font-size: 20px; 
    margin: 50px 0 10px;
    text-align: center;

    @media (max-width: 768px) {
        width: 100%;
        margin: 30px 0 8px;
    }
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

    @media (max-width: 768px) {
        padding: 120px 16px 16px 16px;
        text-align: center;
    }
`;

export const FormContainer = styled.div.attrs({
})`
    width: 100%;
    max-width: 526px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;

    input, select {
        width: 100%;
        height: 48px;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 100px;
        padding: 0 24px;
        color: ${props => props.theme.palette.colors.white};
        font-size: 16px;

        &::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        &:focus {
            outline: none;
            border-color: ${props => props.theme.palette.colors.white};
        }
    }

    .MuiFormControl-root {
        width: 100%;
    }

    .MuiOutlinedInput-root {
        border-radius: 100px;
        background: transparent;
        color: ${props => props.theme.palette.colors.white};

        fieldset {
            border-color: rgba(255, 255, 255, 0.1);
        }

        &:hover fieldset {
            border-color: rgba(255, 255, 255, 0.2);
        }

        &.Mui-focused fieldset {
            border-color: ${props => props.theme.palette.colors.white};
        }
    }

    button {
        height: 48px;
        border-radius: 100px;
        font-weight: 500;
    }
`;

export const Title = styled.div.attrs({
})`
    text-align: center;
    width: 100%;
`;

export const StepsContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 32px;
    margin-bottom: 32px;

    @media(max-width: 767px) {
        gap: 24px;
        margin: 0 auto 32px;
    }
`;

export const Step = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${props => props.active ? props.theme.palette.colors.white : props.theme.palette.colors.gray};
    font-size: 14px;
    font-weight: 500;

    @media(max-width: 767px) {
        text-align: center;
    }
`;

export const StepNumber = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.active ? 'linear-gradient(90deg, #FF0000 0%, #FF0099 100%)' : 'transparent'};
    border: 1px solid ${props => props.active ? 'transparent' : props.theme.palette.colors.gray};
    color: ${props => props.active ? props.theme.palette.colors.white : props.theme.palette.colors.gray};
    font-size: 12px;
    font-weight: 500;
`;

