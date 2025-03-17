import styled from 'styled-components';

export const AdminContainer = styled.div`
  width: 100%;
`;

export const DashboardContainer = styled.div`
  width: 100%;
  padding: 0 24px 24px;
`;

export const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${p => p.theme.palette.background.paper || '#1E1E1E'};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  
  small {
    color: ${p => p.theme.palette.text.secondary || '#A0A0A0'};
    font-size: 14px;
  }
`;

export const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 77, 79, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.h4`
  margin: 0;
  color: ${p => p.theme.palette.text.secondary || '#A0A0A0'};
  font-size: 16px;
  font-weight: 500;
`;

export const CardValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${p => p.theme.palette.text.primary || '#FFFFFF'};
  margin: 4px 0;
`;

export const AdSection = styled.div`
  margin-bottom: 24px;
`;

export const AdCard = styled.div`
  background: ${p => p.theme.palette.background.paper || '#1E1E1E'};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const AdInfo = styled.div`
  h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 700;
    color: ${p => p.theme.palette.text.primary || '#FFFFFF'};
  }
  
  p {
    margin: 0;
    color: ${p => p.theme.palette.text.secondary || '#A0A0A0'};
  }
`;

export const AdActions = styled.div``;

export const ChartContainer = styled.div`
  background: ${p => p.theme.palette.background.paper || '#1E1E1E'};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
`;

export const ChartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: ${p => p.theme.palette.text.primary || '#FFFFFF'};
  }
  
  .time-filters {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    
    span {
      font-size: 14px;
      color: ${p => p.theme.palette.text.secondary || '#A0A0A0'};
      cursor: pointer;
      
      &.active {
        color: ${p => p.theme.palette.primary.main || '#4F46E5'};
        font-weight: 600;
      }
    }
  }
  
  .visits-count {
    font-size: 18px;
    font-weight: 700;
    color: ${p => p.theme.palette.text.primary || '#FFFFFF'};
  }
`;

export const VisitsChart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
  
  .chart-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .chart-bar {
    width: 24px;
    background: ${p => p.theme.palette.primary.main || '#4F46E5'};
    border-radius: 4px 4px 0 0;
    margin-bottom: 8px;
    
    &.highlight {
      background: ${p => p.theme.palette.error.main || '#FF4D4F'};
    }
  }
  
  .chart-label {
    font-size: 12px;
    color: ${p => p.theme.palette.text.secondary || '#A0A0A0'};
  }
`;

export const CreditsSection = styled.div`
  margin-bottom: 24px;
  
  h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 700;
    color: ${p => p.theme.palette.text.primary || '#FFFFFF'};
  }
`;

export const CreditsCard = styled.div`
  background: ${p => p.theme.palette.background.paper || '#1E1E1E'};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

export const CreditsInfo = styled.div`
  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 700;
    color: ${p => p.theme.palette.text.primary || '#FFFFFF'};
  }
  
  p {
    margin: 8px 0 0 0;
    color: ${p => p.theme.palette.text.secondary || '#A0A0A0'};
  }
`;

export const CreditsValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${p => p.theme.palette.text.primary || '#FFFFFF'};
`;

export const CreditsActions = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

export const MobileAdminView = styled.div`
  padding: 16px;
`; 