import styled from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 0.75;
  border-radius: 24px;
  overflow: hidden;
  background: ${props => props.emphasis ? 'linear-gradient(135deg, #FF6B6B 0%, #4361EE 100%)' : 'transparent'};
  padding: ${props => props.emphasis ? '2px' : '0'};

  @media (max-width: 768px) {
    max-width: 100%;
    aspect-ratio: 0.8;
  }
`;

export const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 22px;
  overflow: hidden;
  background: #000;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
`;

export const CardTitle = styled.h3`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const LocationContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const LocationBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 100px;
  padding: 4px 12px;
  color: #fff;
  font-size: 14px;
`;

export const CardActions = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const EmphasisBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #FF6B6B 0%, #4361EE 100%);
  border-radius: 100px;
  padding: 4px 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

export const LogoOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: auto;
  opacity: 0.8;
  
  img {
    width: 100%;
    height: auto;
    filter: brightness(0) invert(1);
  }

  @media (max-width: 768px) {
    width: 100px;
    bottom: 12px;
  }
`; 