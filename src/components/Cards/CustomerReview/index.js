import React from 'react'
import { CardContainer, CardTextTemp, CustomerImg, CustomerImgContainer, CustomerName, CustomerReviewInfo, RatingsContainer, RatingCategory, Stars, RatingItem, CardHeader, ButtonTrash } from './styled'
import { FormText, Icon } from 'ui/styled'
import { Container } from 'reactstrap'
import useI18n from 'hooks/useI18n';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <Icon key={index} icon="star-orange" nomargin />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Icon key={index} icon="star-grey" />
      ))}
    </>
  );
};

export default function CustomerReviewCard({ review, small, onTrash }) {
  const { reviewer, reviewText, date, ratings = {} } = review;

  const { t } = useI18n()

  return (
    <>
      <CardContainer small={small}>
        <CardHeader>
          <CustomerReviewInfo>
            <CustomerImgContainer>
              <CustomerImg src={reviewer.avatar} />
            </CustomerImgContainer>
            <CustomerName>{reviewer.name || t("annon")}</CustomerName>
          </CustomerReviewInfo>
          {!onTrash ? null : <ButtonTrash onClick={onTrash}>
            <Icon icon="trash-white" pointer nomargin />
          </ButtonTrash>}
        </CardHeader>
        <Container className='noPadding'>
          <FormText>
            {reviewText || t("nocomment")}
          </FormText>
          <CardTextTemp>
            {date || t("nodata")}
          </CardTextTemp>
        </Container>
        {Object.keys(ratings).length > 0 ? (
          <RatingsContainer small={small}>
            {Object.keys(ratings).map((category, index) => (
              <RatingItem key={index} small={small}>
                <RatingCategory>{t(category?.toLowerCase())}</RatingCategory>
                <Stars>{renderStars(ratings[category])}</Stars>
              </RatingItem>
            ))}
          </RatingsContainer>
        ) : (
          <FormText>{ t("noreview") }</FormText>
        )}
      </CardContainer>
    </>
  );
}