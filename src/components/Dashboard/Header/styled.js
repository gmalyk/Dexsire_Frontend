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
    gap: 70px;
`;

export const MenuButtonContainer = styled.div.attrs({})`
    display: flex;
    gap: 16px;
    @media (max-width: 777px) {
        display: none;
    }
`;