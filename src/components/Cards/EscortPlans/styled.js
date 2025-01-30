import styled from "styled-components";

export const EscortPlansContainer = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  width: 100%;
  max-width: calc(100% / 3 - 11px);
  border-radius: 40px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};


  @media(max-width: 767px){
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const TitleContainer = styled.div.attrs({})`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding:0 32px 0 32px;
`;

export const CardItem = styled.div.attrs({})`
  border-top: 1px solid ${p => p.theme.palette.borderBackground.main};
  padding-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  `;

export const Subtitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
`;
export const Text = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: ${p => p.theme.palette.colors.purple};
  max-width: 248px;
`;