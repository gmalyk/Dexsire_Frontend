import styled from "styled-components";

export const EscortControlContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 32px 29px;
  width: 100%;
  max-width: 265px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  gap: 8px;
  height: 100%;

  @media(max-width:767px){
    width: 100%;
    max-width: 100%; 
  }
`;

export const Subtitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};

`;

export const RequestFooter = styled.div.attrs({
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const ProfileImgContainer = styled.div.attrs({})`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
  justify-content: space-between;
`;

export const ProfileName = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 14.52px;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
`;

export const Image = styled.img.attrs({})`
  width: 49px;
  height: 49px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Ranking = styled.div.attrs({
})`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 49px;
  height: 49px;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.palette.colors.orange};
  color: ${p => p.theme.palette.colors.white};
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 14.52px;
  text-align: left;
`;

export const EscortsContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 11px;
`;