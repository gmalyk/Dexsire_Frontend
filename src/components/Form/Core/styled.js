import styled from 'styled-components';

export const Content = styled.div``;

export const FormWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px 0;
    @media(max-width:767px){
        flex-direction: column;
    }
`;

export const FormInput = styled.div`
    width: 100%;
    max-width: calc(calc(100% - 24px) / 3);
    
    ${props => props.full ? `max-width: 100%;` : ''}
    ${props => props.half ? `max-width: calc(calc(100% - 12px) / 2);` : ''}
    ${props => props.quarter ? `max-width: calc(calc(100% - 36px) / 4);` : ''}
    ${props => props.twenty ? `max-width: calc(calc(100% - 48px) / 5);` : ''}
    ${props => props.customer ? `max-width: calc(calc(100% - 60px) / 6);` : ''}

    @media(max-width:991px){
        max-width: ${props => props.full ? `100%` : `calc(calc(100% - 12px) / 2)`};
    }
        
    @media(max-width:767px){
        max-width: 100%;
    }

    input, select, .select-container {
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

    /* For select elements and custom select containers */
    select, .select-container {
        color: rgba(255, 255, 255, 0.7);
        
        &:focus {
            color: white;
        }
        
        option {
            color: black;
            background: white;
            text-align: left;
        }

        &:disabled, &[disabled], &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
            background-color: rgba(128, 128, 128, 0.2);
            border-color: rgba(128, 128, 128, 0.3);

            & * {
                pointer-events: none;
            }

            &:hover {
                background-color: rgba(128, 128, 128, 0.2);
                cursor: not-allowed;
            }
        }
    }
`;

export const FormSeparator = styled.div`
    margin: 12px 0;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.palette.colors.shadow};
`;

export const ContentForm = styled.div`
    ${p => p.active ? `
        padding: 12px;
        border: 1px solid ${p.theme.palette.colors.shadow};
        border-radius: 8px;
    ` : ''}
    width: 100%;
`;

export const ContentFormHeader = styled.div`
    ${p => p.active ? `
        font-size: 16px;
        color: ${p.theme.palette.colors.grey};
        padding: 8px 0 14px 8px;
        border-bottom: 1px solid ${p.theme.palette.colors.shadow};
    ` : ''}
`;