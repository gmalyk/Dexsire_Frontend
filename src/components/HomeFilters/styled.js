import styled from "styled-components";

export const FiltersContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  margin-top: 56px;
  gap: 16px;
  justify-content: center;
  width: 100%;
`;

export const FilterTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
  line-height: 29.05px;
  text-align: center;
  color: ${p => p.theme.palette.colors.white};

`;

export const FormContainer = styled.div.attrs({})`
`;