import styled from "styled-components";

export const AnnouncementTopContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  border-radius: 40px;
  max-width: 1289px;
  width: 100%;
  background-color: ${p => p.theme.palette.colors.black};
  margin-bottom: 70px;
`;

export const Banner = styled.div.attrs({})`
  background: center / cover no-repeat url('/images/announcement1.png');
  width: 100%;
  border-radius: 40px;
  @media (max-width: 991px) {
    display: none;
  }
  `;

export const AnnouncementInfos = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  padding: 40px 16px;
  max-width: 521px;
  @media (max-width: 991px) {
      max-width: 100%;
  }
  `;

export const AnnouncementTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
`;

export const AnnouncementDescription = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;

  color: ${p => p.theme.palette.colors.purple};
`;

export const AnnouncementFeatures = styled.div.attrs({})`
  display: flex;
  gap: 22px;
  align-items: center;

  `;

export const AnnouncementIconContainer = styled.div.attrs({})`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  max-width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${p => p.theme.palette.colors.orange};
`;