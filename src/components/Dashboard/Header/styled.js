import styled from 'styled-components'
import { Icon } from 'ui/styled';

export const DashboardHeaderContainer = styled.div.attrs({
})`           
    height: 42px;
    background: transparent;
    width: 100%;
    padding: 0 72px;
    z-index: 2;
    position: absolute;
    top: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 991px ) {
        padding: 0 20px
    }
`;

export const AppLogo = styled(Icon).attrs({
})`            
    width: 138px;
    height: 27.33px;
`;

export const MenuIcon = styled.img.attrs({
})`           
    cursor: pointer;
`;

export const MenuItemsContainer = styled.div.attrs({})`
    display: flex;
    align-items: center;
    gap: 16px;
    
    @media (max-width: 777px) {
        gap: 12px; /* Reduce gap on mobile */
    }
`;

export const MenuButtonContainer = styled.div.attrs({})`
    display: flex;
    gap: 16px;
    @media (max-width: 777px) {
        display: none;
    }
`;

export const SearchButtonStyled = styled.button`
    background: #000000;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 0;
    overflow: hidden;
    
    &:hover {
        background-color: #333333;
        transform: scale(1.05);
    }
    
    img {
        width: 18px;
        height: 18px;
    }
    
    @media (max-width: 777px) {
        width: 36px;
        height: 36px;
        min-width: 36px;
        min-height: 36px;
        max-width: 36px;
        max-height: 36px;
    }
`;