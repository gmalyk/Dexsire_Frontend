import React, { useState } from 'react'
import { ButtonContainer, Icon, Title } from 'ui/styled'
import { Image, ImageContainer, ImagesGalleryContainer, PlayButton, VideoPlayer } from './styled'
import Button from 'components/Form/Button'
import ImageView from 'components/ImageView';
import { parseStrapiImage } from 'utils';
import useI18n from 'hooks/useI18n';

export default function ImagesGalleryUn({ images, videos, noTitle, small, noMore, profile }) {
  const [currentIndex, setCurrentIndex] = useState(null);

  const { t } = useI18n()

  const content = videos && videos.length > 0 ? videos : images;

  const openImage = (index) => {
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setCurrentIndex(null);
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  const showPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length);
  };


  return (
    <>
      {noTitle ? null : <Title small>
        { videos && videos.length > 0 ? t("gallery_video") : t("gallery_image") }
      </Title>}
      <ImagesGalleryContainer >
        {
          content?.map((image, index) => (
            <ImageContainer key={index} onClick={() => openImage(index)} isVideo={(videos && videos.length > 0)} small={small}>
              {
                videos?.length ? 
                  <VideoPlayer>
                    <source src={ (image?.src) } type="video/mp4" />
                    <source src={ (image?.src) } type="video/mov" />
                    <source src={ (image?.src) } type="video/avi" />
                    <source src={ (image?.src) } type="video/quicktime" />
                    <source src={ (image?.src) } type="video/ogg" />
                  </VideoPlayer>
                 : 
                <Image src={image.url} alt={image.alt} />
              }
            </ImageContainer>
          ))
        }
      </ImagesGalleryContainer>
      {noMore ? null : <ButtonContainer center>
        <Button width={'179px'} outlineGradient>
          { t("gallery_load_more") }
        </Button>
      </ButtonContainer>}
      {currentIndex !== null && (
        <ImageView
          profile={profile}
          presrc={content?.[currentIndex-1]?.src || content?.[currentIndex-1]?.url}
          src={content?.[currentIndex]?.src || content?.[currentIndex]?.url}
          possrc={content?.[currentIndex+1]?.src || content?.[currentIndex+1]?.url}
          type={content[currentIndex].type || 'image'}
          showNext={showNext} showPrev={showPrev} closeImage={closeImage}
        />
      )}
    </>
  );
}