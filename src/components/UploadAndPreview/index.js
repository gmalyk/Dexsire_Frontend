import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { AppearanceContainer, AppearanceText, AppearanceTitle, AppearanceTitleContainer, UploadFileContainer, UploadFileContent, UploadImageContainer } from './styled';
import { Container } from 'reactstrap';
import { Icon } from 'ui/styled';
import UploadFile from 'components/Form/UploadFile';
import PreviewCard from 'components/Cards/PreviewCard';
import useI18n from 'hooks/useI18n';

export default function UploadAndPreview({ setUploadedFile, video }) {
  const [previews, setPreviews] = useState([]);
  // const [uploadedFile, setUploadedFile] = useState(null);

  const { t } = useI18n()

  const handlePreview = (url, file) => {
    if(video) return;
    setPreviews(prev => [...prev, { url, name: file.path, size: file.size }]);
  };

  const handleFileChange = (file) => {
    if(video){
      setUploadedFile(file);
    }else{
      setUploadedFile(p => [...p, file]);
    }
  };

  const handleRemove = (name) => {
    setPreviews(prev => prev.filter(fileData => fileData.name !== name));
  };

  const validateFile = (file) => {

    if (!video && file.size > 8000000) {
      toast.error( t("the_image_is_too_big") );
      return false;
    }

    return true;
  };

  return (
    <>
      <AppearanceContainer>
        <AppearanceTitle>
          {t("upload")}
        </AppearanceTitle>
        <UploadFileContent>
          <UploadFile
            onChange={handleFileChange}
            onPreview={(url, file) => handlePreview(url, file)}
            accept="image/*"
            validate={validateFile}
          >
            <UploadFileContainer>
              <Container />
              <Icon icon="double-page" />
              <AppearanceText>{t("drag_image")}</AppearanceText>
            </UploadFileContainer>

          </UploadFile>

          {previews.length === 0 ? null : (
            <UploadImageContainer>
              {
                previews.map((fileData, k) => (
                  <PreviewCard
                    url={fileData?.url}
                    name={fileData?.name}
                    size={fileData?.size}
                    key={k}
                    onRemove={handleRemove}
                  />
                ))
              }
            </UploadImageContainer>
          )}
        </UploadFileContent>
        {
          video ? null : 
            <AppearanceTitleContainer>
              <AppearanceText>{t("supported_image")}</AppearanceText>
              <AppearanceText>{ t("maximum_image") }</AppearanceText>
            </AppearanceTitleContainer>
        }
      </AppearanceContainer>
    </>
  )
}