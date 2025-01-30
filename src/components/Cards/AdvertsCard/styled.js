import styled from "styled-components";

export const CardContent = styled.div.attrs({
})`
  width: 100%;
  height: 514px;
  position: relative;
  border-radius: 40px;
  align-items: flex-end;
  justify-content: center;
  display: flex;
  overflow: hidden;
    max-width: 100%;
`;

export const CardContainer = styled.div.attrs({
})`
  width: 100%;
  height: 100%;
  ${p => p.emphasis ? `
      max-width: 391px;
      max-height: 504px;
    `: ``};
  background: center / cover no-repeat url('${p => p.src}');
  border-radius: 40px;
  overflow: hidden;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
    @media (max-width: 424px) {
      width: ${p => p.emphasis ? '94%' : '100%'};
  }
`;

export const CardHeaderContent = styled.div.attrs({})`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IconsContainer = styled.div.attrs({})`
  display: flex;
  gap: 8px;
`;

export const IconContent = styled.div.attrs({})`
  width: 28px;
  height: 28.24px;
  background: ${p => p.active ? p.theme.palette.colors.orange : p.theme.palette.colors.white};
  border-radius: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const EscortsInfoEmphasis = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  color: ${p => p.theme.palette.colors.white};
  background: linear-gradient(240deg, ${p => p.theme.palette.gradient.primary} 13%, ${p => p.theme.palette.gradient.secondary} 80%);
  padding: 6px 24px;
  border-radius: 100px;
`;

export const Content = styled.div.attrs({})``;

export const CardLogo = styled.img.attrs({
  src: '/icons/logo.svg'
})`
  filter: invert(0.2);
  opacity: 0.6;
`;

export const HalfContent = styled.div.attrs({})`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 24px;
  z-index: 1;
`;

export const ButtonNextAndPrev = styled.div.attrs({})`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  border: 1px solid ${p => p.theme.palette.colors.lightgrey};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const EndContent = styled.div.attrs({})`
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
  flex-direction: column;
  z-index: 1;
`;

export const CardTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
  line-height: 29.05px;
  text-align: center;
  color: ${props => props.theme.palette.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ButtonContainer = styled.div.attrs({})`
  display: flex;
  gap: 8px;


  @media(max-width:767px){
    flex-wrap: wrap;
  }
`;

export const ButtonEditing = styled.div.attrs({
})`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${p => p.theme.palette.colors.black};
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 31px;
`;