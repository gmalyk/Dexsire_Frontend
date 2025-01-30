import styled from "styled-components";
import { Icon } from "ui/styled";

export const SearchAdvancedContent = styled.div.attrs({
})`           
    display: flex;
    flex-direction: column;
    gap: 55px;
`;

export const SearchAdvancedTitle = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 56px;
    font-weight: 500;
    line-height: 56px;
    text-align: left;
    color: ${p => p.theme.palette.colors.white};
    max-width: 333px;
    margin-top: 100px;
`;

export const SearchAdvancedForm = styled.div.attrs({
})`           
    width: 100%;
    max-width: 737px;
`;