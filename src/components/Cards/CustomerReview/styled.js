import styled from "styled-components";

export const CardContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  flex:1;
  max-width: 624px;
  width: 100%;
  gap: 21px;
  border-radius: 20px;
  padding: 24px 24px 40px 24px;
  background: ${p => p.theme.palette.bgReview.main};
  ${p => p.small ? `
    padding: 16px;
    max-width: 513px;
    ` : ``};

  @media (max-width: 480px) {
    padding: 15px;
    gap: 15px;
    min-width: 100%;
  }
`;

export const CustomerReviewInfo = styled.div.attrs({
})`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const CustomerImgContainer = styled.div.attrs({
})`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  padding: 4px;
  background: linear-gradient(140deg, ${p => p.theme.palette.gradient.primary} 0%, ${p => p.theme.palette.gradient.secondary} 90%);
  
  `;

export const CustomerImg = styled.img.attrs({
})`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const CustomerName = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  max-width: 99px;

  color: ${p => p.theme.palette.white.main};
`;

export const CardTextTemp = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${p => p.theme.palette.colors.orange};
  margin-top: 8px;
`;

export const RatingsContainer = styled.div.attrs({})`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  ${p => p.small ? `
    gap: 8px;
    ` : ``};
`;

export const RatingItem = styled.div.attrs({})`
  display: flex;
  gap: 8px;
  flex-direction: column;
  border-right: 1px solid ${p => p.theme.palette.colors.grey};
  padding-right: 16px;
  &:last-child {
    border-right: none;
    padding-right: 0;
  }
  &:first-child {
    padding-left: 0;
  }
  ${p => p.small ? `
    padding-right: 8px;
    ` : ``};
`;

export const RatingCategory = styled.span.attrs({})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
    color: ${p => p.theme.palette.white.main};
`;

export const Stars = styled.div.attrs({})`
  display: flex;
  gap: 3px;
`;

export const ButtonTrash = styled.div.attrs({
})`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.palette.colors.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const CardHeader = styled.div.attrs({
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;