import styled from "styled-components";

export const ReportsContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const BarChartContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  width: 100%;
  @media(max-width:767px){
    flex-wrap: wrap;
  }
`;

export const HomeHeaderContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  flex-direction: column;
  max-width: 309px;
  @media(max-width:767px){
    width: 100%;
    max-width: 100%; 
    align-items: center;
    padding: 0 0 24px 0;
  }
`;

export const IconContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  cursor: pointer;
`;