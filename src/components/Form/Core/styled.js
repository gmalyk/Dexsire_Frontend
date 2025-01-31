import styled from 'styled-components';

export const Content = styled.div.attrs({
})`
`;

export const FormWrapper = styled.div`
    width: 100%;
    max-width: 526px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin: 0 auto;
`;

export const FormInput = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ${props => props.full && `
        width: 100%;
    `}
    ${props => props.half && `
        width: 48%;
    `}
    ${props => props.quarter && `
        width: 23%;
    `}
    ${props => props.twenty && `
        width: 20%;
    `}
    ${props => props.customer && `
        width: 31%;
    `}

    @media(max-width:991px){
        max-width:${props => props.full ? `` : `calc(calc(100% - 12px) / 2)`};
    }
        
    @media(max-width:767px){
        max-width: 100%;
    }

    input, select {
        width: 100%;
        text-align: left;
        
        &::placeholder {
            color: rgba(255, 255, 255, 0.7);
            opacity: 1;
            text-align: left;
        }

        &:focus {
            text-align: left;
            
            &::placeholder {
                opacity: 0;
                visibility: hidden;
            }
        }
    }

    /* For select elements */
    select {
        color: rgba(255, 255, 255, 0.7);
        
        &:focus {
            color: white;
        }
        
        option {
            color: black;
            background: white;
            text-align: left;
        }
    }

    /* Maintain disabled states */
    select:disabled,
    input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const FormSeparator = styled.div.attrs({
})`
    margin: 12px 0;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.palette.colors.shadow};
`;

export const ContentForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

export const ContentFormHeader = styled.div`
    ${p => p.active ? `
        font-size: 16px;
        color: ${p.theme.palette.colors.grey};
        padding: 8px 0 14px 8px;
        border-bottom: 1px solid ${p.theme.palette.colors.shadow};
        text-align: left;
    ` : ``}
`;

