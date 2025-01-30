import styled from "styled-components";

export const AnnouncementTop = styled.div.attrs({})`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 372px;
  background: center / cover no-repeat url('/images/background.jpeg');
`;

export const Subtitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  color: ${p => p.theme.palette.colors.purple};
  max-width: 517px;
`;

export const AnnouncementContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1) 100% ),
             center / cover no-repeat url('/images/announcement.png');
`;

export const AnnouncementSpace = styled.div.attrs({})`
  width: 100%;
  height: 88px;
  background:${p => p.theme.palette.colors.black};
`;

export const TitleContent = styled.div.attrs({})`
  max-width: 510px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnnouncementContent = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 176px;
  width: 100%;
  max-width: 1073px;
  @media (max-width: 991px) {
    padding: 40px;
    gap: 80px;
  }
  
  @media (max-width: 535px) {
    padding: 16px;
}
`;

export const AnnouncementItem = styled.div.attrs({})`
  display: flex;
  gap: 37px;
  align-items: center;
  ${p => p.reverse ? `flex-direction: row-reverse;` : `flex-direction: row;`}
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export const AnnouncementImage = styled.div.attrs({})`
  background: center / cover no-repeat url(${p => p.image});
  width: 623px;
  height: 480px;
  aspect-ratio: 623 / 480;
  border-radius: 40px;
  @media (max-width: 991px) {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
  }
`;

export const AnnouncementTitle = styled.div.attrs({})`
  max-width: 413px;
`;

export const AnnouncementDescription = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};
`;