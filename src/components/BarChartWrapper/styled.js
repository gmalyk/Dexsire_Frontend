import styled from "styled-components";

export const WrapperContainer = styled.div.attrs({})`
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  border-radius: 20px;
  padding: 32px;
  gap: 39px;
  display: flex;
  flex-direction: column;
  flex:1;
  align-items: center;
  ${p => p.noBorder ? `border: none; ` : ``};
  ${p => p.noPadding ? `
    padding: 0;
    ` : ``};
`;

export const WrapperHeaderContainer = styled.div.attrs({})`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  ${p => p.reverse ? `flex-direction: row-reverse;` : ``};
`;

export const WrapperHeaderTitleContainer = styled.div.attrs({})`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
    ${p => p.reverse ? `flex-direction: row-reverse;` : ``};
`;

export const WrapperTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: ${p => p.theme.palette.colors.white};
`;

export const Option = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
  height: 31px;
  border-radius: 100px;
  padding: 8px 16px;
  ${p => p.active ? `
    background: ${p.theme.palette.colors.orange};
    color: ${p.theme.palette.colors.black};
    `: ``};

    transition: background 0.3s, color 0.3s;

    &:hover {
      background: ${p => p.theme.palette.colors.orange};
      color: ${p => p.theme.palette.colors.black};
      cursor: pointer;
    }
`;

export const WrapperValue = styled.div.attrs({})`
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  text-align: right;
  color: ${p => p.theme.palette.colors.white};
`;