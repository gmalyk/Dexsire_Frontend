import styledCmp from 'styled-components'
import ReactLoading from 'react-loading'

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const Load = styledCmp(ReactLoading).attrs(props => ({
    type: 'spin',
    color: props.outline ?
        (
            props.primary ? props.theme.palette.primary.main :
                (props.secondary ? props.theme.palette.secondary.main : props.theme.palette.info.main)
        )
        : props.theme.palette.primary.contrastText,
    height: 20,
    width: 20
}))`          
`;

export const ColorButton = styled(Button)(({ theme, nospace, small, width, white }) => ({
    width: width ? width : '100%',
    height: small ? '40px' : '51px',
    marginTop: nospace ? '0px' : '16px',
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: small ? 12 : 16,
    borderRadius: 100,
    textTransform: 'none',
    color: white ? theme.palette.primary.contrastText : '',
    whiteSpace: 'nowrap',

    '& .MuiButton-label': {
        fontWeight: 700,
    }
}));

export const ButtonTextContainer = styledCmp.div.attrs({
})`
    display: flex;
    justify-content: center;
    align-items: center;
    ${p => p.start ? `justify-content: flex-start;` : ``}
    ${p => p.between ? `justify-content: space-between;` : ``}
    ${p => p.end ? `justify-content: flex-end;` : ``}
    width: 100%;
    gap: 12px;
    font-weight: 700;
`;

export const ButtonGradient = styledCmp.div`
    position: relative;
    width: ${props => props.width ? props.width : '100%'};
    margin-top: ${props => (props.nospace ? '0px' : '16px')};
    height: ${props => props.small ? '40px' : '51px'};
    z-index: 1;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 100px;
    line-height: 33px;
    padding: 2px;
    background: linear-gradient(
        to right,
        ${props => props.theme.palette.gradient.primary},
        ${props => props.theme.palette.gradient.secondary}
    );
    transition: transform 0.3s ease, background 0.3s ease;
    > div {
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.palette.gradient.background};
        border-radius: 98px; 
        display: flex;
        align-items: center;
        padding: 0 16px;
        font-family: Inter;
        white-space: nowrap;
    ${p => p.small ? `
        font-family: Inter;
        font-size: 12px;
        font-weight: 700;
        line-height: 16px;
        text-align: center;
        ` : ``}
        color: ${props => props.theme.palette.gradient.contrastText};
        transition: transform 0.3s ease;
    }
`;