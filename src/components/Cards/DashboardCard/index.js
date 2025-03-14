import Button from 'components/Form/Button';
import React from 'react';
import { Icon } from 'ui/styled';
import { Card, ImageInfo, ImagesContainer, Subtitle, TextContainer, Title, Value, HeaderContainer } from './styled';
import OverlappingImages from 'components/OverlappingImages';


const DashboardCard = ({ icon, title, subtitle, value, buttonText, white, full, secondary, images, legend, three, buttonAction }) => {
  return (
    <Card white={white} full={full} three={three}>
      <HeaderContainer>
        <Icon icon={icon} width={24} nomargin />
        {value && <Value>{value}</Value>}
      </HeaderContainer>
      <TextContainer>
        <Title white={white} orange={secondary}>{title}</Title>
        <Subtitle white={white}>{subtitle}</Subtitle>
        {!images ? null :
          <ImagesContainer>
            <OverlappingImages images={images} />
            <ImageInfo>
              {legend}
            </ImageInfo>
          </ImagesContainer>
        }
      </TextContainer>
      {
        buttonText ?
          <Button small nospace rightIcon={"chevron-right"} width={'fit-content'} outlineGradient onClick={buttonAction}
          >{buttonText}</Button>
          : null
      }
    </Card>
  );
};

export default DashboardCard;
