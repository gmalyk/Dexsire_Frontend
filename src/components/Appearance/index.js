import React, { useState, useEffect } from 'react';

import UploadFile from 'components/Form/UploadFile';
import { AppearanceContainer, AppearanceText, AppearanceTitle, AppearanceTitleContainer, UploadFileContainer } from './styled';
import { Icon } from 'ui/styled';
import { Container } from 'reactstrap';
import { toast } from 'react-toastify';
import UploadAndPreview from 'components/UploadAndPreview';
import { parseStrapiImage } from 'utils';
import useI18n from 'hooks/useI18n';
import { optionsAppearance } from 'utils/options';

export default function Appearance({ uploadedFile, setUploadedFile }) {
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState([]);
  const { t } = useI18n();

  useEffect(() => {
    if (uploadedFile) {
      setFiles([uploadedFile]);
    } else {
      setFiles([]);
    }
  }, [uploadedFile]);

  const handlePreview = (url) => {
    setPreview(url);
  };

  const handleFileChange = (file) => {
    if (file && file.type && !file.type.startsWith('video/')) {
      console.error('Only video files are allowed');
      return;
    }
    
    setUploadedFile(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const validateFile = (file) => { 
    if (file.size > 50000000) {
      toast.error( t("the_file_is_too_long") );
      return false;
    }
    return true;
  };

  return (
    <>
      <AppearanceContainer>
        <AppearanceTitleContainer>
          <AppearanceTitle>{ t("upload_a_360") }</AppearanceTitle>
          <AppearanceText> <Icon icon="doubt" /> {t("instruction_on_how")}</AppearanceText>
        </AppearanceTitleContainer>
        <UploadFile
          onChange={handleFileChange}
          onPreview={handlePreview} 
          validate={validateFile}
        >

          <UploadFileContainer>
          {
            preview ? 
              <video autoPlay={true} muted={true} loop={true} width="80%" style={{ aspectRatio:'4 / 2'}} controls>
                <source src={ parseStrapiImage(uploadedFile?.url) } type="video/mp4" />
                <source src={ parseStrapiImage(uploadedFile?.url) } type="video/mov" />
                <source src={ parseStrapiImage(uploadedFile?.url) } type="video/avi" />
                <source src={ parseStrapiImage(uploadedFile?.url) } type="video/quicktime" />
                <source src={ parseStrapiImage(uploadedFile?.url) } type="video/ogg" />
              </video>
            : <>
                <Container />
                <Icon icon="double-page" />
                <AppearanceText>{ t("drag_video") }</AppearanceText>
            </>
          }
          </UploadFileContainer>

        </UploadFile>
        <AppearanceTitleContainer>
          <AppearanceText>{ t("supported_video") }</AppearanceText>
          <AppearanceText>{ t('maximum_video') }</AppearanceText>
        </AppearanceTitleContainer>
      </AppearanceContainer>

    </>
  );
};
