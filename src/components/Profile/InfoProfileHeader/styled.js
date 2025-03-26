import styled from "styled-components";

export const IconsContainer = styled.div.attrs({})`
  display: flex;
  gap: 8px;
`;

export const IconContent = styled.div.attrs({})`
  width: 28px;
  height: 28.24px;
  background: ${p => p.active ? p.theme.palette.colors.orange : p.theme.palette.colors.white};
  border-radius: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderProfileContainer = styled.div.attrs({})`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media(max-width:767px){
    flex-direction: column;
  }
`;

export const InfoContent = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoProfileText = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: left;
  color: ${p => p.theme.palette.colors.orange};
  ${p => p.value ? `
    font-size: 14px;
    font-weight: 500;
    color: ${p.theme.palette.colors.white};
    `: ``};
`;

export const InfoProfileContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EscortInfo = styled.div.attrs({})`
  display: flex;
  gap: 40px;

  @media(max-width:767px){
    justify-content: center;
  }
`;
export const EscortAboutHeader = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};
  max-width: 411px;

  @media(max-width:767px){
    text-align: center;
  }
`;

export const EscortProfileFeedBack = styled.div.attrs({})`
  padding: 16px 21px;
  gap: 16px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};

`;

export const FeedBackText = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: ${p => p.theme.palette.colors.white};
  ${p => p.text ? `
    font-size: 14px;
    font-weight: 500;
    color: ${p.theme.palette.colors.purple};

    `: ``};
`;

export const EscortFeedBackContainer = styled.div.attrs({})`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media(max-width:767px){
    justify-content: center;
  }
`;
export const EscortButtonsContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;

  @media(max-width:767px){
    justify-content: center;
  }
`;

export const EscortFeedBack = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    
    span {
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 14.52px;
        text-align: center;
        color: ${p => p.theme.palette.colors.white};
    }
`;