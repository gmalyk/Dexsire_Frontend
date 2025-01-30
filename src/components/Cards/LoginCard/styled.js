import styled from "styled-components";

export const LoginCardContainer = styled.div.attrs({
})` 
    background: ${props => props.theme.palette.colors.black};
    width: 100%;
    max-width: 363px;
    padding: 40px 32px;
    border-radius: 40px;
    height: 432px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const LoginImage = styled.img.attrs({
})` 
    width: 141px;
    height: 141px;
    margin: 0 auto;
`;
export const CardTitle = styled.div.attrs({
})` 
    font-family: Inter;
    font-size: 24px;
    font-weight: 500;
    line-height: 29.05px;
    text-align: center;
    color: ${props => props.theme.palette.colors.white};
    margin-bottom: 23px;

`;
export const BodyCard = styled.div.attrs({
})` 
    display: flex;
    flex-direction: column;
`;