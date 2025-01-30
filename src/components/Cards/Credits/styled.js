import styled from "styled-components";

export const AdvertsCardContent = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: calc(100% / 3 - 11px);
  height: 427px;
  min-width: 340px;
  border-radius: 20px;
  padding: 32px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  flex-direction: column;
  background-color: ${p => p.light ? p.theme.palette.colors.white : ''
  };

  @media(max-width: 767px){
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const CreditsSubTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${p => p.light ? p.theme.palette.colors.black : p.theme.palette.colors.purple};
`;

export const CreditsOption = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${p => p.grey ? p.theme.palette.colors.lightgrey : p.theme.palette.borderBackground.main};
  padding: 16px 0;
  &:last-child {
     border-bottom: 1px solid ${p => p.grey ? p.theme.palette.colors.lightgrey : p.theme.palette.borderBackground.main};
  }
  
`;

export const OptionsTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: ${props => props.white ?
    props.theme.palette.colors.white :
    props.light ? props.theme.palette.colors.black
      : props.theme.palette.colors.purple};
`;