import CustomerReview from 'components/CustomerReview';
import EscortServices from 'components/EscortServices';
import ImagesGalleryUn from 'components/ImagesGalleryUn';
import AboutMe from 'components/Profile/AboutMe';
import ProfileOptions from 'components/Profile/ProfileOptions';
import React, { useMemo, useState } from 'react'
import { BodyContent } from './styled';
import { parseStrapiImage } from 'utils';
import useI18n from 'hooks/useI18n';

export default function EscortInfo({ profile, allservices }) {
  const [option, setOption] = useState('cam');

  const { t } = useI18n()

  const iconArray = useMemo(() => {
    return [
      { icon: 'cam', iconActive: 'cam-black' },
      { icon: 'doll', iconActive: 'doll-black' },
      !profile?.videos?.length ? null : { icon: 'video', iconActive: 'video-black' },
      { icon: 'star', iconActive: 'star-black' },
      { icon: 'chili', iconActive: 'chili-black' },
    ].filter(f => f)
  }, [profile]);

  const imageArray = useMemo(() => {
    return profile?.photos?.map(m => ({
      url: parseStrapiImage(m?.url)
    })) 
  }, [profile])

  const videoArray = useMemo(() => {
    return profile?.videos?.map(m => ({ 
      type: 'video',
      src: parseStrapiImage(m?.url)
    })) 
  }, [profile])
  
   
  return (
    <>
      <BodyContent>

        <ProfileOptions iconArray={iconArray} active={option} handleActive={setOption} />
        {
          option !== 'cam' ? null : (
            <ImagesGalleryUn images={imageArray} small noMore profile={profile} />
          )
        }
        {
          option !== 'doll' ? null : (
            <AboutMe profile={profile} setOption={setOption} />
          )
        }
        {
          option !== 'video' ? null : (
            <ImagesGalleryUn images={imageArray} videos={videoArray} profile={profile} />
          )
        }
        {
          option !== 'star' ? null : (
            <CustomerReview small profile={profile} title={ t("escortinfo_reviews") } />
          )
        }
        {
          option !== 'chili' ? null : (
            <EscortServices profile={profile} allservices={allservices} />
          )
        }
      </BodyContent>
    </>
  )
}
