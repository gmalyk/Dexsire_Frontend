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
    justify-content: ${props => props.expanded ? 'space-between' : 'center'};
    width: ${props => props.expanded ? '300px' : '40px'};
    height: 40px;
    min-width: ${props => props.expanded ? '300px' : '40px'};
    min-height: 40px;
    max-width: ${props => props.expanded ? '300px' : '40px'};
    max-height: 40px;
    border-radius: ${props => props.expanded ? '20px' : '50%'};
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: ${props => props.expanded ? '0 8px 0 0' : '0'};
    overflow: hidden;
    
    &:hover {
        background-color: #333333;
        transform: scale(1.05);
    }
    
    @media (max-width: 777px) {
        width: ${props => props.expanded ? '90%' : '36px'};
        height: 36px;
        min-width: ${props => props.expanded ? '200px' : '36px'};
        min-height: 36px;
        max-width: ${props => props.expanded ? 'none' : '36px'};
        max-height: 36px;
        position: ${props => props.expanded ? 'absolute' : 'relative'};
        right: ${props => props.expanded ? '20px' : 'auto'};
        top: ${props => props.expanded ? '100px' : 'auto'};
    }
`;

export const SearchIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    
    img {
        width: 18px;
        height: 18px;
    }
    
    @media (max-width: 777px) {
        width: 36px;
        height: 36px;
    }
`;

export const SearchInputContainer = styled.div`
    flex: 1;
    height: 100%;
    animation: expandWidth 0.3s ease-in-out;
    
    @keyframes expandWidth {
        from { width: 0; opacity: 0; }
        to { width: 100%; opacity: 1; }
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    color: white;
    padding: 0 8px;
    font-size: 16px;
    outline: none;
    
    &::placeholder {
        color: #666;
    }
`;