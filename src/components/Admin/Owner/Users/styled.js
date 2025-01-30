import styled from 'styled-components';

export const HomeHeaderContainer = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  width: 100%;

  @media(max-width:767px){
    flex-wrap: wrap;
  }
`;

export const UserContent = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;