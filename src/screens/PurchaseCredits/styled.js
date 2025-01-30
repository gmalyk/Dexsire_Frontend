import styled from "styled-components";

export const CreditsContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: center / cover no-repeat url('/images/success.png');

`
export const CreditsContent = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  padding-top: 140px;
  align-items: center;
  height: 100%;
  gap: 20px;
  width: 100%;
  padding: 140px 72px 60px 72px;
`

export const PurchaseDetails = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${p => p.theme.palette.colors.white};
  border-radius: 20px;
  padding: 32px;
  width: 100%;
`

export const TitleContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

export const SubTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  color: ${p => p.theme.palette.borderBackground.main};
`

export const CreditsOptions = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
  width: 100%;
`

export const CreditsOption = styled.div.attrs({})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${p => p.theme.palette.colors.shadow};


`
export const Credits = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${p => p.theme.palette.colors.lightgrey};
    filter: ${p => p.active ? `brightness(0.5)` : `brightness(1)`};
`

export const CreditsValue = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: left;
    filter: ${p => p.active ? `brightness(0.5)` : `brightness(1)`};
  color: ${p => p.theme.palette.colors.lightgrey};
`

export const ButtonContent = styled.div.attrs({})`
  width: 120px;
  display: flex;
  justify-content: flex-end;
`