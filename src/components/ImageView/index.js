import React, { useEffect } from 'react'
import { ButtonContent, CarouselContainer, CarouselContainerDecoration, CloseContainer, CloseIconContent, ContactContainer, ContactTitle, ModalImage, NavButton, Video, VideoContainer } from './styled'
import Button from 'components/Form/Button'
import { ButtonContainer, FormSpacer, Icon, ModalContainer, ModalContent, Overlay } from 'ui/styled'
import useTracker from 'hooks/useTracker'

export default function ImageView({ src, presrc, possrc, type = 'image', showNext, showPrev, closeImage, profile }) {

  const { track } = useTracker(true)

  const openWhatsapp = async () => {
    await track("whatsapp", { profile })
    window.open(`https://wa.me/${profile?.whatsapp?.replace(/\ |\(|\)|\-/g,"")}`)
  } 

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = (e) => {
    const mc = document.getElementById('modal-content');
    if (!mc?.contains(e?.target) && !(e?.target.tagName === 'LI')) {
      closeImage();
    }
  };


  return (
    <>
      <Overlay onClick={handleClose}>
        <ModalContainer>
          <ModalContent id="modal-content" center background={'/images/background2.png'} nojustify>
            <CloseContainer >
              <ContactContainer>
                <ContactTitle>
                  Contact me
                  <ContactTitle text>
                    I don't answer voice calls
                  </ContactTitle>
                </ContactTitle>
                <ButtonContent>
                  {
                    !profile?.phone ? null : 
                    <Button nospace width={'fit-content'} outline leftIcon={'phone-orange'}>
                      { profile?.phone }
                    </Button>
                  }
                  {
                    !profile?.whatsapp ? null : 
                    <Button nospace width={'fit-content'} outlineGradient leftIcon={'whatsapp'} onClick={() =>  openWhatsapp() }>
                      WhatsApp
                    </Button>
                  }
                </ButtonContent>
              </ContactContainer>
              <CloseIconContent onClick={closeImage}>
                <Icon icon="close-white" />
              </CloseIconContent>
            </CloseContainer>
            {/* <FormSpacer /> */}
            <CarouselContainer>
              <NavButton onClick={showPrev}>
                <Icon icon="arrow-left" />
              </NavButton>

              {type === 'video' ? (
                <VideoContainer>
                  <Video key={src} controls >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </Video>
                </VideoContainer>
              ) : (
                <>
                  <CarouselContainerDecoration src={presrc} />
                    <ModalImage src={src} alt="Image" />
                  <CarouselContainerDecoration ends src={possrc} />
                </>
              )}

              <NavButton onClick={showNext}>
                <Icon icon="arrow-right" />
              </NavButton>
            </CarouselContainer>
          </ModalContent>
        </ModalContainer>
      </Overlay>
    </>
  )
}