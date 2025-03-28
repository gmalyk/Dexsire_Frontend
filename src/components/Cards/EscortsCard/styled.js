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
  align-items: center;
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
  margin: 0 auto;
  
  /* Modified pseudo-element to ensure border is visible on all sides */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 40px;
    padding: ${p => p.emphasis ? '6px' : '0'};
    background: ${p => p.emphasis ? `linear-gradient(
      22deg,
      ${p.theme.palette.gradient.primary} 30%,
      ${p.theme.palette.gradient.secondary} 90%
    )` : 'none'};
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    /* Ensure top and bottom borders are visible */
    z-index: 1;
  }

  /* Add explicit border for mobile devices */
  @media (max-width: 768px) {
    max-width: 340px;
    aspect-ratio: 340 / 540;
    border-radius: 30px;
    
    &:before {
      border-radius: 30px;
      /* Ensure the mask doesn't clip borders on iOS */
      -webkit-mask-position: 0 0, 0 0;
      -webkit-mask-size: 100% 100%, 100% 100%;
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    aspect-ratio: 320 / 520;
    border-radius: 24px;
    
    &:before {
      border-radius: 24px;
      /* Additional fix for smaller screens */
      -webkit-mask-position: 0 0, 0 0;
      -webkit-mask-size: 100% 100%, 100% 100%;
    }
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
  border-radius: ${p => p.emphasis ? '34px' : '36px'}; /* Adjusted to ensure gap between content and border */
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
    border-radius: ${p => p.emphasis ? '24px' : '26px'}; /* Adjusted for mobile */
  }

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: ${p => p.emphasis ? '18px' : '20px'}; /* Adjusted for smaller screens */
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

export const CardLogo = styled.div.attrs({
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
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
  justify-content: center;
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
  justify-content: center;

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
  width: 100%;
  text-align: center;

  & > * {
    margin: 0;
    padding: 0;
  }

  & ${CardTitle} + ${ButtonContainer} {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    gap: 8px;
    padding-bottom: 6px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    padding-bottom: 4px;
  }
`;

export const LocationContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const LocationBadge = styled.div`
  background-color: white;
  color: black;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;