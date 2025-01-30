import React from 'react';
import { AdvertsCardContent, CreditsSubTitle, CreditsOption, OptionsTitle } from './styled';
import { FormTitle, Icon } from 'ui/styled';
import { Container } from 'reactstrap';
import Button from 'components/Form/Button';

export default function CreditsCard({ title, subtitle, type, list, options, buttonText, infoFooter, light }) {

  const renderContent = () => {
    switch (type) {
      case 'button':
        return (
          <Button white outline color={'borderBackground'} nospace onClick={() => null}>
            {buttonText}
          </Button>
        );
      case 'list':
        return list.map((item, index) => (
          <CreditsOption key={index} white outline color={'borderBackground'} nospace onClick={() => null}>
            <OptionsTitle>{item.title}</OptionsTitle>
            <OptionsTitle white>{item.value}</OptionsTitle>
          </CreditsOption>
        ));
      case 'purchase':
        return options.map((item, index) => (
          <CreditsOption key={index} white outline color={'borderBackground'} nospace onClick={() => null} grey>
            <OptionsTitle>{item.title}</OptionsTitle>
            <OptionsTitle light>{item.value}</OptionsTitle>
            <Button width={'fit-content'} small nospace outline primary onClick={item.action} >
              Select
            </Button>
          </CreditsOption>
        ));
      default:
        return null;
    }
  };

  return (
    <AdvertsCardContent light={light}>
      <Icon icon="coins" width={24} nomargin />
      <FormTitle small left nomargin white={!light} light={light}>{title}</FormTitle>
      <CreditsSubTitle light={light}>{subtitle}</CreditsSubTitle>
      <Container className='noPadding'>
        {renderContent()}
      </Container>
      <CreditsSubTitle>{infoFooter}</CreditsSubTitle>
    </AdvertsCardContent>
  );
}