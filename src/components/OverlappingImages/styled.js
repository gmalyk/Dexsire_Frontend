import styled from 'styled-components';

export const ImageContainer = styled.div.attrs({})`
  position: relative;
  flex: 1;
`;

export const Image = styled.img.attrs({})`
  position: absolute;
  width: 49px;
  height: 49px;
  border-radius: 50%;
  object-fit: cover;
  left: ${({ offset }) => offset || '0px'};
  transform: translateY(-50%);
`;