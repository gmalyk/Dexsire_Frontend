import styled from "styled-components";

// Desktop view container (only visible on desktop)
export const DesktopView = styled.div`
  display: none;
  
  @media(min-width: 768px) {
    display: block;
  }
`;

// Mobile view container (only visible on mobile)
export const MobileView = styled.div`
  display: block;
  
  @media(min-width: 768px) {
    display: none;
  }
`;

// Base styles for both views
export const AdminContainer = styled.div.attrs({})`
  display: flex;
  width: 100%;
  padding-left: 0;
  margin-left: 0;
`;

// Different styles for desktop and mobile
export const BodyContainer = styled.div.attrs({})`
  margin-top: 130px;
  min-height: 100%;
  width: 100%;
  background: linear-gradient(to left, ${p => p.theme.palette.gradient.secondary} 0%, ${p => p.theme.palette.gradient.primary} 100%);
  padding-top: 1px;

  // Desktop-specific styles
  ${DesktopView} & {
    margin-right: 40px;
    margin-left: 0;
    padding-left: 0;
  }
  
  // Mobile-specific styles
  ${MobileView} & {
    margin-right: 0px;
    margin-left: 0;
    padding-left: 0;
    max-width: calc(100% - 60px);
  }
  
  @media(max-width: 767px) {
    margin-right: 0px;
    margin-left: 0;
    padding-left: 0;
    max-width: calc(100% - 60px);
  }
`;

export const BodyContent = styled.div.attrs({})`
  width: 100%;
  height: 100%;
  background: ${p => p.theme.palette.colors.black};
  
  // Desktop-specific styles
  ${DesktopView} & {
    padding: 37px 0 62px 0;
  }
  
  // Mobile-specific styles
  ${MobileView} & {
    padding: 12px 12px 12px 0;
  }
  
  @media(max-width: 767px) {
    padding: 12px 12px 12px 0;
  }
`;