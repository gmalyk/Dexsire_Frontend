import styled from "styled-components";
import { Icon as IconBase } from 'ui/styled';
import { Button } from 'components/Form/Button';


export const BodyContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background: ${p => p.theme.palette.colors.black};
    padding-bottom: 80px;
    min-height: 100vh;

    @media (max-width: 768px) {
        background: transparent;
        padding-top: 0;
    }
`;



export const BodyContent = styled.div.attrs({
})`
    z-index: 1;
    width: 100%;
    padding: 92px 72px 0px 72px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    @media (max-width: 991px) {
        padding: 92px 20px 0 20px;
    };
`;


export const Background = styled.div`
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
    center / cover no-repeat url('/images/backgroundG.png');
    width: 100%;
    height: 688px;
    position: absolute;
    top: 0;
    z-index: 0;

    @media (max-width: 768px) {
        position: fixed;
        width: 100vw;
        height: auto;
        aspect-ratio: 9/16; /* Adjust this ratio to match your background image */
        background: url('/images/bgprofile.png');
        background-position: top center;
        background-size: 100% auto;
        background-repeat: no-repeat;
        left: 0;
        right: 0;
        &:after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #000000 100%);
        }
    }
`;

export const EditContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  position: absolute;
  top: 100px;
  right: 72px;
  z-index: 2;

  @media (max-width: 991px) {
    right: 20px;
    top: 80px;
  }
`;

export const ProfileHeader = styled.div`
    padding: 24px;
    position: relative;
    
    @media (max-width: 768px) {
        padding: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }
`;

export const ProfileTopRow = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 16px;
    padding: 0 16px;
`;

export const ProfileBottomRow = styled.div`
    display: flex;
    width: 100%;
    gap: 24px;
    margin-top: 8px;
`;

export const HeaderActions = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    margin-left: auto;

    @media (max-width: 768px) {
        margin-left: auto;
    }
`;

export const ActionIcon = styled(IconBase)`
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 50%;
    background: white;
    color: ${props => props.theme.palette.colors.black};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.9);
    }
`;

export const ProfileInfo = styled.div`
    @media (max-width: 768px) {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
    }
`;

export const ProfileNameWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
`;

export const ProfileName = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
        color: ${props => props.theme.palette.colors.white};
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
    }

    @media (max-width: 768px) {
        span {
            font-size: 20px;
            line-height: 24px;
        }
    }
`;

export const ProfileAvatarSection = styled.div`
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
`;

export const AgeDisplay = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
        color: ${props => props.theme.palette.colors.orange};
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
    }

    span {
        color: ${props => props.theme.palette.colors.white};
        font-size: 16px;
        font-weight: 500;
    }
`;

export const CityDisplay = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
        color: ${props => props.theme.palette.colors.orange};
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
    }

    span {
        color: ${props => props.theme.palette.colors.white};
        font-size: 16px;
        font-weight: 500;
    }
`;

export const ProfileStats = styled.div`
    display: flex;
    gap: 24px;
    margin: 24px 0;

    @media (max-width: 768px) {
        gap: 16px;
        margin: 16px 0;
        justify-content: space-between;
    }
`;

export const StatItem = styled.div`
    text-align: center;
    background: rgba(0, 0, 0, 0.2);
    padding: 12px 24px;
    border-radius: 12px;
    min-width: 100px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 768px) {
        padding: 8px 16px;
        min-width: auto;
        flex: 1;
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    margin: 24px 0;
`;

export const FollowButton = styled(Button)`
    flex: 1;
    background: ${props => props.color === 'white' ? 'white' : 'transparent'};
    color: ${props => props.color === 'white' ? props.theme.palette.colors.black : props.theme.palette.colors.white};
    border: ${props => props.color === 'white' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
    
    &:hover {
        background: ${props => props.color === 'white' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
    }
`;

export const WhatsappButton = styled(Button)`
    width: 48px;
    height: 48px;
    min-width: 48px !important;
    padding: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    overflow: hidden;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        min-width: 40px !important;
    }
`;

export const RoundButton = styled.button`
    width: 48px;
    height: 48px;
    padding: 12px;
    border-radius: 24px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0; /* Prevents button from shrinking */

    svg {
        width: 24px;
        height: 24px;
        fill: white;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;

export const PhotoGallery = styled.div`
    margin-top: 32px;

    @media (max-width: 768px) {
        margin-top: 24px;
        padding: 0 16px;
    }
`;

export const GalleryTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.theme.palette.colors.white};
    margin-bottom: 16px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

export const GalleryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const GalleryItem = styled.div`
    aspect-ratio: 4/3;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        border-radius: 8px;
    }
`;

export const NavigationBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    position: static;
    background: transparent;
    border-top: none;
    gap: 16px;
    
    @media (max-width: 768px) {
        padding: 16px;
    }
`;

export const ProfileContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

export const ProfileAvatar = styled.img`
    width: 94px;
    height: 94px;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
`;

export const ProfileLocation = styled.div`
    display: flex;
    gap: 24px;
    margin-top: 24px;

    @media (max-width: 768px) {
        margin-top: 4px;
        gap: 16px;
    }
`;

export const LocationItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
        color: ${props => props.theme.palette.colors.orange};
        font-size: 14px;
        font-weight: 500;
    }

    span {
        color: ${props => props.theme.palette.colors.white};
        font-size: 16px;
        font-weight: 500;
    }
`;

export const ProfileDescription = styled.p`
    color: ${props => props.theme.palette.colors.white};
    font-size: 16px;
    line-height: 24px;
    margin: 16px 0;
    padding: 0 24px;

    @media (max-width: 768px) {
        padding: 0 16px;
        font-size: 14px;
        line-height: 20px;
    }
`;

export const StatValue = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.theme.palette.colors.white};
    margin-bottom: 4px;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const StatLabel = styled.div`
    font-size: 14px;
    color: ${props => props.theme.palette.colors.grey};

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const Icon = styled.div`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-image: ${props => props.src ? `url(${props.src})` : 'none'};
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    transition: opacity 0.2s;
    
    /* Camera icon gets orange background, others get black with border */
    background-color: ${props => props.icon === "photos" 
        ? props.theme.palette.colors.orange 
        : 'rgba(0, 0, 0, 0.3)'};
    border: ${props => props.icon === "photos" 
        ? 'none' 
        : '1px solid rgba(255, 255, 255, 0.2)'};

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        background-size: 20px;
    }
`;

export const AppearanceContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1075px;
    padding: 0 24px;

    @media (max-width: 768px) {
        padding: 0 16px;
    }
`;

export const AppearanceTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AppearanceTitle = styled.div`
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};
`;

export const AppearanceText = styled.div`
    font-family: Inter;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    text-align: left;
    color: ${props => props.theme.palette.colors.purple};
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const UploadFileContainer = styled.div`
    width: 100%;
    min-height: 284px;
    border: 1px dashed ${props => props.theme.palette.colors.orange};
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 24px;
`;

export const NavIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  /* Active state gets orange background, others get black with border */
  background-color: ${props => props.active 
      ? props.theme.palette.colors.orange 
      : 'rgba(0, 0, 0, 0.3)'};
  border: ${props => props.active 
      ? 'none' 
      : '1px solid rgba(255, 255, 255, 0.2)'};

  &:hover {
    opacity: 0.8;
    background-color: ${props => props.active 
      ? props.theme.palette.colors.orange 
      : 'rgba(255, 255, 255, 0.1)'};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    background-size: 20px;
  }
`;
