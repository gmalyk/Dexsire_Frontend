import styled from "styled-components";

export const AccordionContent = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

`;

export const AccordionTitle = styled.div.attrs({
})`
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 32px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};
`;

export const ChevronIcon = styled.img.attrs({
})`
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    ${props => props.open ?
        `transform: rotate(0deg);`
        : `transform: rotate(90deg);`};
`;

export const AccordionContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-bottom: 1px solid ${props => props.theme.palette.borderBackground.main};
    padding: 20px 0;

`;

export const AccordionContentWrapper = styled.div.attrs({
})`
    overflow: hidden;
    max-height: ${({ open }) => (open ? '' : '0')};
    opacity: ${({ open }) => (open ? '1' : '0')};
    transition: max-height 0.4s ease, opacity 0.4s ease;
    padding-top: ${({ open }) => (open ? '32px' : '0')};
`;

export const AccordionText = styled.div.attrs({
})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;

    color: ${props => props.theme.palette.colors.purple};
`;