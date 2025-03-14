import styled from "styled-components";

export const AboutMeContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  padding: ${p => p.noPadding ? '0 60px' : '48px 60px'};
  border-radius: 40px;
  position: relative;
  background: ${p => p.theme.palette.colors.black};
  @media(max-width: 767px){
    padding: 48px 12px;
  }
`;

export const EditingButton = styled.div.attrs({
})`
  position: absolute;
  top: 24px;
  right: 24px;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.palette.colors.grey};
  background: ${p => p.active ? '#4CAF50' : 'transparent'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${p => p.active ? '#4CAF50' : p.theme.palette.colors.darkGrey};
  }
`;

export const FormWrapper = styled.div`
  position: relative;
  pointer-events: ${p => p.editing ? 'auto' : 'none'};
  opacity: ${p => p.editing ? '1' : '0.8'};
  
  /* Add a subtle visual indicator when form is not editable */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.05);
    pointer-events: none;
    opacity: ${p => p.editing ? '0' : '1'};
    transition: opacity 0.3s ease;
  }
`;

