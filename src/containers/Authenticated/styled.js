import styled from 'styled-components'

export const DashboardPage = styled.div.attrs({
})`      

    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    `;

export const DashboardBody = styled.div.attrs({
})`   
`;

export const DashboardBodyContent = styled.div.attrs({
})`            
    width: 100%;
`;

export const Content = styled.div.attrs({
})`           
    min-height: 100vh;
    background: ${p => p.theme.palette.colors.black};
`;