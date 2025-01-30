import React, { useState } from 'react'
import { Icon } from 'ui/styled'
import Button from 'components/Form/Button';
import { ButtonContainer, ButtonEditing, ButtonNextAndPrev, CardContainer, CardContent, CardHeaderContent, CardLogo, CardTitle, Content, EndContent, EscortsInfoEmphasis, HalfContent, IconContent, IconsContainer } from './styled';

export default function AdvertsCard({ escort, handleAdClick }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false)


  const nextImage = () => {
    if (currentImageIndex < escort?.urls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleEdit = () => {
    setIsEditing(prev => !prev)
    handleAdClick(escort?.id)
  }

  return (
    <>
      <CardContent>
        <CardContainer src={escort?.urls?.[currentImageIndex]}>
          <ButtonEditing onClick={handleEdit}>
            <Icon icon={isEditing ? 'save' : 'pencil'} />
          </ButtonEditing>
          <CardHeaderContent>
            <Content>
              {!escort?.emphasis ? null : <EscortsInfoEmphasis>Emphasis</EscortsInfoEmphasis>}
            </Content>
          </CardHeaderContent>
          <HalfContent>
            <ButtonNextAndPrev onClick={prevImage}>
              <Icon icon="arrow-left" />
            </ButtonNextAndPrev>
            <CardLogo />
            <ButtonNextAndPrev onClick={nextImage}>
              <Icon icon="arrow-right" />
            </ButtonNextAndPrev>
          </HalfContent>
          <EndContent>
            <CardTitle>
              {escort?.name}
              <IconContent active>
                <Icon icon="verification" nomargin />
              </IconContent>
            </CardTitle>
            <ButtonContainer>
              {
                !escort?.location.city ? null : 
                <Button small outline width={"fit-content"}>
                  {escort?.location.city}
                </Button>
              }
              {
                !escort?.location.state ? null :
                <Button small outline width={"fit-content"}>
                  {escort?.location.state}
                </Button>
              }
            </ButtonContainer>
          </EndContent>
        </CardContainer>
      </CardContent>
    </>
  )
}