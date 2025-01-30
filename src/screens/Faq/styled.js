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

export const AnnouncementContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 80px 0;
  min-height: 80vh;
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 100% ),
             center / cover no-repeat url('/images/announcement.png');
`;

export const AnnouncementSpace = styled.div.attrs({})`
  width: 100%;
  height: 88px;
  background:${p => p.theme.palette.colors.black};
`;

export const TitleContent = styled.div.attrs({})`
  max-width: 559px;
  display: flex;  
  justify-content: center;
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

export const FaqContent = styled.div.attrs({})`
  display: flex;
  flex-direction: column;

  padding: 0 47px;
  width: 100%;
  max-width: 614px;
`;