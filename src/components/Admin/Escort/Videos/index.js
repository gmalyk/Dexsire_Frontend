import Appearance from 'components/Appearance'
import ImagesGallery from 'components/ImagesGallery'
import UploadAndPreview from 'components/UploadAndPreview'
import React, { useMemo, useState } from 'react'
import { Update } from 'services/core'
import { FormSpacer } from 'ui/styled'
import { parseStrapiImage } from 'utils'

export default function Videos({ profile, reload }) { 

  const [uploadedFile, setUploadedFile] = useState([])
	const [fetching, setFetching] = useState(null)

  const videoArray = useMemo(() => {
    return profile?.videos?.map(m => ({ 
      type: 'video',
      src: parseStrapiImage(m?.url)
    })) 
  }, [profile])

  const takePic = async (result) => { 
    setFetching(true)  
    if(result?.id){
      const videos = [
        ...(profile?.videos||[]),
        result?.id
      ]
      await Update("models", { data: { videos } }, profile?.id)
      await reload(profile?.id)
    } 
    setFetching(false) 
  }

  return (
    <>
      <ImagesGallery videos={videoArray} noTitle small noMore profile={profile} />
      <FormSpacer />
      { !profile?.id ? null : <UploadAndPreview video setUploadedFile={takePic} />}
    </>
  )
}
