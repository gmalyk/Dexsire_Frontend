import styled from 'styled-components';

export const ServiceInfoCardContainer = styled.div.attrs({
})`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;

`;

export const AvailabilityCard = styled.div.attrs({
})` 
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  padding: 32px;
  border-radius: 20px;
  width: 100%;
  max-width: calc(100% / 3 - 11px);
  min-width: 300px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  min-height: 240px;
  position: relative;

  @media(max-width:767px){
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const SectionTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};

`;

export const CardSection = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardText = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};
`;

export const IconContainer = styled.div.attrs({
})`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ButtonEditing = styled.div.attrs({
})`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid ${p => p.theme.palette.colors.grey};
    cursor: pointer; 
    ${
       p => p.abs ? ` 
        position: absolute;
        top: 16px;
        right: 16px;
      ` : ``
    }
`;
