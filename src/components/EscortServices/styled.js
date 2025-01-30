import styled from "styled-components";

export const ServicesContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 80px;
    width: 100%;
    max-width: 1074px;
    @media (max-width: 768px) {
        gap: 40px;
    }
`;

export const CheckContainer = styled.div.attrs({
})`

`;

export const ContactContainer = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 80px;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 768px) {
        gap: 16px;
    }
`;

export const ContactTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
  ${p => p.text ? `
    font-size: 14px;
    font-weight: 500;
    `: ``};
`;

export const ButtonContent = styled.div.attrs({
})`
    display: flex;
    gap: 16px;
`;
