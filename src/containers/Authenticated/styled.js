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
      background-repeat: repeat-y !important;
      background-color: transparent !important;
      overflow-x: hidden !important;
      max-width: 100vw !important;
    ` : ''}
  }
`;

export const Content = styled.div.attrs({})`
  width: 100%;
  min-height: 100vh;
  padding-left: ${props => props.admin ? '293px' : '0'};
  
  @media(max-width:767px) {
    padding-left: 0;
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