import styled from 'styled-components';

export const UserInfoContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const UserDetailContainer = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  width: 100%;
  border-radius: 20px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  padding: 40px;
  @media(max-width: 767px){
    padding: 40px 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const ProfileImgContainer = styled.div.attrs({})`
  flex: 1;
  @media(max-width: 767px){
    display:flex;
    justify-content: center;
  }
`;

export const SampleImage = styled.div.attrs({
})`
    max-width: 520px;
    width: 100%;
    aspect-ratio: 1 / 1;
    background: url(${ p => p.url}) no-repeat center center / cover;
    max-height: 100%;
    margin: 12px auto;
    display: flex;
    justify-content: flex-end;
    padding: 12px;
`;

export const VerifyContent = styled.div.attrs({
})`
    display: flex;
    justify-content: flex-end;
`;
