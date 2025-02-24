import styled from "styled-components";

export const Decoration = styled.div.attrs({
})`
  background:  linear-gradient(394deg,${p => p.theme.palette.gradient.secondary}  0%, rgba(0, 0, 0, 0) 35%);
  position: absolute;
  inset: 0 0 0 0;

`;

export const CardBorderBackground = styled.div.attrs({
})`
  max-width: 380px;
  width: 100%;
  aspect-ratio: 380 / 580;
  position: relative;
  border-radius: 40px;
  align-items: flex-end;
  justify-content: center;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  padding: ${p => p.emphasis ? '6px' : '0'};
  background: ${p => p.emphasis ? `linear-gradient(
    22deg,
    ${p.theme.palette.gradient.primary} 30%,
    ${p.theme.palette.gradient.secondary} 90%
  )` : 'none'};

  @media (max-width: 768px) {
    max-width: 100%;
    aspect-ratio: 340 / 540;
  }

  @media (max-width: 480px) {
    aspect-ratio: 320 / 520;
  }
`;
export const CardContainer = styled.div.attrs({
})`
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(315deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.15) 70%),
    center / cover no-repeat url('${p => p.src}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${p => p.emphasis ? '38px' : '40px'};
  overflow: hidden;
  padding: 24px;
  display: flex;
  touch-action: pan-y pinch-zoom;
  transition: background-image 0.3s ease;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 12px;
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

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    
    img {
      width: 12px;
      height: 12px;
    }
  }

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
    
    img {
      width: 10px;
      height: 10px;
    }
  }
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

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 14px;
    padding: 4px 16px;
  }
`;

export const Content = styled.div.attrs({})``;

export const CardLogo = styled.img.attrs({
  src: '/icons/logo.svg'
})`
  filter: invert(0.2);
  opacity: 0.6;
  max-width: 120px;
  height: auto;
  
  @media (max-width: 768px) {
    max-width: 100px;
  }

  @media (max-width: 480px) {
    max-width: 80px;
  }
`;

export const HalfContent = styled.div.attrs({})`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  padding: 0 16px;
  z-index: 2;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    padding: 0 8px;
  }
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
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.position === 'left' ? 'left: 16px;' : 'right: 16px;'};
  z-index: 2;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: 0.5px solid rgba(255, 255, 255, 0.3);

    img {
      width: 12px;
      height: 12px;
    }
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    border-radius: 4px;

    img {
      width: 10px;
      height: 10px;
    }
  }
`;

export const CardTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  color: ${props => props.theme.palette.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    gap: 4px;
  }
`;

export const ButtonContainer = styled.div.attrs({})`
  display: flex;
  gap: 8px;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    gap: 4px;

    button {
      font-size: 10px !important;
      padding: 2px 8px !important;
      height: 22px !important;
      min-height: unset !important;
      line-height: 1 !important;
    }
  }

  @media (max-width: 480px) {
    gap: 3px;

    button {
      font-size: 9px !important;
      padding: 2px 6px !important;
      height: 20px !important;
      min-height: unset !important;
    }
  }
`;

export const EndContent = styled.div.attrs({})`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  margin-top: auto;
  padding-bottom: 8px;
  position: relative;
  gap: 16px;

  & > * {
    margin: 0;
    padding: 0;
  }

  & ${CardTitle} + ${ButtonContainer} {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    gap: 0;
    padding-bottom: 6px;
    & ${CardTitle} + ${ButtonContainer} {
      margin-top: -6px;
    }
  }

  @media (max-width: 480px) {
    padding-bottom: 4px;
    & ${CardTitle} + ${ButtonContainer} {
      margin-top: -5px;
    }
  }
`;