import styled from 'styled-components'

export const Container = styled.div.attrs({})`
  width: 100%;
  min-height: 100vh;

  background: ${p => p.theme?.palette?.colors?.black || '#000000'};
  
  @media(max-width:767px) {
    ${props => props.admin ? `
      background-image: url('/images/announcement.png') !important;
      background-size: 100% auto !important;
      background-position: top center !important;
      background-repeat: no-repeat !important;
      background-color: transparent !important;
      overflow-x: hidden !important;
      max-width: 100vw !important;
      width: 100vw !important;
      padding: 0 !important;
      margin: 0 !important;
    ` : ''}
  }
`;

export const Content = styled.div.attrs({})`
  width: 100%;
  min-height: 100vh;
  
  @media(max-width:767px) {
    ${props => props.admin ? `
      background-color: rgba(0, 0, 0, 0.7) !important;
      min-height: calc(100vh - 70px);
      width: 100vw !important;
      max-width: 100vw !important;
      overflow-x: hidden !important;
    ` : ''}
  }
`;

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