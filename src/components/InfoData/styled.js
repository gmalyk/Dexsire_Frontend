import styled from "styled-components";
import { Icon } from "ui/styled";

export const InfoDataContainer = styled.div.attrs({
})`
    display: flex;
    gap: 40px 20px;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    justify-content: center;

    @media(max-width: 492px){
      flex-wrap: nowrap;
      overflow-x: auto;
      justify-content: flex-start;
      gap: 12px;
    }
`;

export const InfoDataContent = styled.div.attrs({
})`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 4px solid ${p => p.theme.palette.borderBackground.main};
    color: ${p => p.theme.palette.colors.white};
    font-size: 16px;
    font-weight: 800;
    font-family: Inter;
    ${p => p.active ? `
        background: ${p.theme.palette.colors.orange};
        border: 4px solid ${p.theme.palette.colors.orange};
        color: ${p.theme.palette.colors.black};
    ` : ``
  };
`;

export const InfoDataItem = styled.div.attrs({
})`
    display: flex;
    gap: 14px;
    align-items: center;
    flex-direction: column;

    @media(max-width: 492px){
      min-width: auto;
      gap: 8px;
    }
`;
export const InfoTitle = styled.div.attrs({
})`
  display: none;
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  line-height: 16.94px;
  text-align: center;
  color: ${p => p.active ? p.theme.palette.colors.white : p.theme.palette.colors.purple};

  @media(min-width: 492px){
    display: block;
  }
`;

export const NextIcon = styled(Icon).attrs({
})`
  @media(max-width: 1160px){
    width: 16px;
  }
  align-self: flex-start;
  margin-top: 12px;
`;