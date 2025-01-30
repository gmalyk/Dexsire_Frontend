import styled from 'styled-components'


export const DashboardMenuContainer = styled.div.attrs({
})`           
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    background: ${props => props.theme.palette.colors.shadow};
`;

export const DashboardMenu = styled.div.attrs({
    className: 'menu-contant'
})`           
    background: center / cover no-repeat url('/images/background.jpeg');
    width: 100%;

    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 48px;

`;

export const DashboardMenuHeader = styled.div.attrs({
})`           
    width: 100%; 
    display: flex;
    justify-content: flex-end;
`;

export const DashboardMenuHeaderIcon = styled.img.attrs({
})`           
    cursor: pointer;
`;

export const MenuIconContent = styled.div.attrs({
})`           
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    border-radius: 100px;
    background: ${props => props.theme.palette.primary.main};
    cursor: pointer;
`;

export const DashboardMenuHeaderUserContent = styled.div.attrs({
})`           
    padding: 27px 25px;
    margin-bottom: 28px;
    background: ${props => props.theme.palette.primary.main} ;
`;

export const DashboardMenuHeaderUserImage = styled.div.attrs({
})`           
    width: 160px;
    height: 160px; 
    border-radius: 80px; 
    background: ${props => props.theme.palette.colors.grey} url(/logo1024.png) no-repeat center center / cover;
    margin: 0 auto 12px;
    overflow: hidden;
`;

export const DashboardMenuHeaderUserText = styled.div.attrs({
})`           
    font-size: 15px;
    font-weight: bold;
    color: ${props => props.theme.palette.colors.grey};
    margin-bottom: 12px; 
`;

export const DashboardMenuOption = styled.div.attrs({
})`           

    font-family: Inter;
    font-size: 32px;
    font-weight: 500;
    line-height: 38.73px;
    text-align: center;
    width: fit-content;
    color: ${props => props.theme.palette.colors.white};
    cursor: pointer; 
    &:hover {
        color: ${p => p.theme.palette.colors.orange};
    }
    
`;

export const DashboardMenuContent = styled.div.attrs({
})` 
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 33px;
    margin-top: 32px;
`;

export const DashboardMenuFooter = styled.div.attrs({
})`
    padding: 20px;
`;

export const DashboardVersionContent = styled.div.attrs({
})` 
    margin: 24px 0;
`;

export const DashboardVersionText = styled.div.attrs({
})`
    font-size: 15px;
    font-weight: bold;
    color: ${props => props.theme.palette.colors.grey};
    text-align: center; 
`;


export const Social = styled.div.attrs({})`
  display: flex;
  gap: 16px;
`;

export const SocialIconContainer = styled.div.attrs({})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background: ${p => p.theme.palette.colors.black};
`;