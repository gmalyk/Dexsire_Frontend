import styled from "styled-components";

export const AnnouncementFormContainer = styled.div.attrs({})`
  display: flex;
  gap: 32px;
  padding: 40px;
  width: 100%;
  max-width: 1296px;
  @media (max-width: 991px) {
    flex-direction: column;
  }
  
  @media (max-width: 535px) {
    padding: 0;
  }
  `;

export const AnnouncementFormInfos = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
  padding: 64px 40px;
  border-radius: 40px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  @media (max-width: 535px) {
    padding: 24px 16px;
  }
  `;

export const AnnouncementFormTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: center;
  color: ${p => p.theme.palette.colors.orange};
`;

export const AnnouncementTitleContainer = styled.div.attrs({})`
  max-width: 420px;

`

export const ForgotLink = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`;