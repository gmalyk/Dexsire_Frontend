import styled from "styled-components";

export const AboutMeContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1075px;
  padding: 48px 60px 48px 60px;
  border-radius: 40px;
  border: 1px solid ${p => p.theme.palette.colors.orange};
  gap: 16px;
  @media (max-width: 768px) {
    padding: 24px 16px 24px 16px;
  }
`;

export const AboutMeInfoContainer = styled.div.attrs({
})`
  display: flex;
  width: 100%;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;

  justify-content: center;
`;

export const AboutMeInfoContent = styled.div.attrs({
})`
  display: flex;
  padding: 16px 24px;
  border-radius: 20px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

export const AboutMetTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  text-align: ${p => p.center ? 'center' : 'left'};
  color: ${p => p.theme.palette.colors.white};
  ${p => p.text ? `
    font-weight: 500;
    color: ${p.theme.palette.colors.purple};
    `: ``};
`;

export const ContactContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const ButtonContent = styled.div.attrs({
})`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin: 16px 0;
    flex-wrap: wrap;
`;