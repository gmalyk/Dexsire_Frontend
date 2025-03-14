import Appearance from 'components/Appearance'
import ImagesGallery from 'components/ImagesGallery'
import UploadAndPreview from 'components/UploadAndPreview'
import React, { useMemo, useState } from 'react'
import { Update } from 'services/core'
import { FormSpacer, FormTitle } from 'ui/styled'
import { parseStrapiImage } from 'utils'
import useI18n from 'hooks/useI18n'

export default function Photos({ profile, reload }) { 
  const [uploadedFile, setUploadedFile] = useState([])
  const [fetching, setFetching] = useState(null)
  const { t } = useI18n()
  
  const imageArray = useMemo(() => {
    return profile?.photos?.map((m, index) => ({
      url: parseStrapiImage(m?.url),
      id: `image-${index}` // Add unique ID for drag and drop
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

  const handleImageDeleted = async () => {
    await reload(profile?.id)
  }

  return (
    <>
      <FormTitle left white>{t("admin_dashboard_photos_title")}</FormTitle>
      <FormSpacer />
      <ImagesGallery 
        images={imageArray} 
        noTitle 
        small 
        noMore 
        profile={profile} 
        onDeleteImage={handleImageDeleted} 
      />
      <FormSpacer />
      <UploadAndPreview video setUploadedFile={takePic} />
    </>
  )
}
