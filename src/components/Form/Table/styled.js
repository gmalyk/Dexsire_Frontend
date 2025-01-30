import styled from "styled-components";

export const Image = styled.img.attrs({})`
  width: 49px;
  height: 49px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Ranking = styled.div.attrs({
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49px;
  height: 49px;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.palette.colors.orange};
  color: ${p => p.theme.palette.colors.white};
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 14.52px;
  text-align: left;
`;

export const TableContent = styled.div.attrs({
})`
  display: flex;
  align-items: center;
  gap: 16px;
`;