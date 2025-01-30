import Appearance from 'components/Appearance'
import ImagesGallery from 'components/ImagesGallery'
import UploadAndPreview from 'components/UploadAndPreview'
import React, { useMemo, useState } from 'react'
import { Update } from 'services/core'
import { FormSpacer } from 'ui/styled'
import { parseStrapiImage } from 'utils'

export default function Photos({ profile, reload }) { 

  const [uploadedFile, setUploadedFile] = useState([])
	const [fetching, setFetching] = useState(null)

  
  const imageArray = useMemo(() => {
    return profile?.photos?.map(m => ({
      url: parseStrapiImage(m?.url)
    })) 
  }, [profile])

  const takePic = async (result) => { 
    setFetching(true)  
    if(result?.id){
      const photos = [
        ...(profile?.photos||[]),
        result?.id
      ]
      await Update("models", { data: { photos } }, profile?.id)
      await reload(profile?.id)
    } 
    setFetching(false) 
  }


  return (
    <>
      <ImagesGallery images={imageArray} noTitle small noMore profile={profile} />
      <FormSpacer />
      <UploadAndPreview video setUploadedFile={takePic}  />
    </>
  )
}
