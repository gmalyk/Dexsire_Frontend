import React, { useContext, useEffect, useState } from 'react'
import { PreviewContainer, PreviewImg, UploadImgButton } from './styled'
import { Icon } from 'ui/styled'
import UploadFile from 'components/Form/UploadFile'
import { toast } from 'react-toastify';
import { CoreContext } from 'context/CoreContext';
import { parseStrapiImage } from 'utils';
import { UpdateMe } from 'services/me';
import useI18n from 'hooks/useI18n';

export default function ProfileImgPreview({ small, medium, noIcon, profile, reload, source }) {

  const { user } = useContext(CoreContext) 

  const [preview, setPreview] = useState(null)
  const [fetching, setFetching] = useState(false)

  const { t } = useI18n()

  const takePic = async (result) => { 
    setFetching(true)  
    console.log(result)
    if(result?.id){
        await UpdateMe({ image: result.id })
        setPreview( parseStrapiImage(result?.url) )
        await reload()
        toast.success(t("imagesuccessfully"));
    } 
    setFetching(false) 
  }   
  
  useEffect(() => {
    setPreview(profile?.user?.image?.url ? parseStrapiImage(profile?.user?.image?.url) : null)
  }, [profile])

  return (
    <>
      <PreviewContainer small={small} medium={medium}>
        <PreviewImg src={ source ? source : (preview ? preview : '/images/image.png')} /> 
        <UploadFile
          onChange={takePic}
          onPreview={(url) => setPreview(url)}
          accept="image/*"
        >
          { !(user?.id === profile?.user?.id) ? null : <UploadImgButton small={small} medium={medium}>
            <Icon icon={small ? 'cam-small' : 'cam'} />
          </UploadImgButton>}
        </UploadFile>
      </PreviewContainer>
    </>
  )
}
