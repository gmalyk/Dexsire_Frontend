import styled from "styled-components";

export const CloseContainer = styled.div.attrs({})`           
  width: 100%; 
  display: flex;
  justify-content: ${p => p.logo ? 'space-between' : 'flex-end'};
`;

export const CloseIconContent = styled.div.attrs({})`           
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 100px;
  background: ${props => props.theme.palette.primary.main};
  cursor: pointer;
`;

export const CompanyDataContainer = styled.div.attrs({})`
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;
