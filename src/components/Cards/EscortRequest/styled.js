import styled from "styled-components";

export const EscortRequestCardContainer = styled.div.attrs({
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  gap: 16px;

  &:hover {
    background-color: ${p => p.theme.palette.borderBackground.main};
    padding: 16px 36px;
    transition: padding 0.3s ease;
    cursor: pointer;
  }
  transition: padding 0.3s ease;




  @media(max-width:767px){
    flex-wrap: wrap;
  }
`;

export const ProfileImgContainer = styled.div.attrs({})`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
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

export const ButtonContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  width: 100%;
  
`;