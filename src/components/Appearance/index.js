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
import PreviewCard from 'components/Cards/PreviewCard';

export default function Appearance({ uploadedFile, setUploadedFile }) {
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const { t } = useI18n();

  useEffect(() => {
    if (uploadedFile) {
      setFiles([uploadedFile]);
      setPreview(uploadedFile.url);
    } else {
      setFiles([]);
      setPreview(null);
    }
  }, [uploadedFile]);

  const handlePreview = (url) => {
    setPreview(url);
  };

  const handleFileChange = (file) => {
    setUploadError(null);
    if (file && file.type && !file.type.startsWith('video/')) {
      toast.error(t("only_video_files_allowed"));
      return;
    }
    
    try {
      // Create a local preview while uploading
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        
        // Set the uploaded file with temporary URL for preview
        const tempFile = {
          ...file,
          id: `temp-${Date.now()}`,
          url: objectUrl,
          mime: file.type
        };
        
        setUploadedFile(tempFile);
      }
    } catch (error) {
      console.error('Error handling file:', error);
      setUploadError(t("error_processing_video"));
      toast.error(t("error_processing_video"));
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPreview(null);
    setUploadError(null);
  };

  const validateFile = (file) => { 
    if (file.size > 50000000) {
      toast.error(t("the_file_is_too_long"));
      return false;
    }
    if (!file.type.startsWith('video/')) {
      toast.error(t("only_video_files_allowed"));
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
          accept="video/mp4,video/mov,video/avi,video/quicktime,video/ogg"
          onRemove={handleRemoveFile}
        >
          <UploadFileContainer>
          {
            !uploadedFile ? (
              <>
                <Container />
                <Icon icon="double-page" />
                <AppearanceText>
                  {uploadError ? uploadError : t("drag_video")}
                </AppearanceText>
              </>
            ) : null
          }
          </UploadFileContainer>
        </UploadFile>
        
        {uploadedFile && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon icon="video" />
                <span style={{ color: 'white', fontSize: '14px' }}>
                  {uploadedFile.name}
                </span>
              </div>
              <div 
                onClick={handleRemoveFile}
                style={{ cursor: 'pointer', color: 'white' }}
              >
                <Icon icon="trash" />
              </div>
            </div>
            <video 
              controls 
              style={{ 
                width: '100%', 
                borderRadius: '8px',
                backgroundColor: '#1a1a1a',
                maxHeight: '300px'
              }}
            >
              <source src={parseStrapiImage(uploadedFile.url)} type={uploadedFile.mime || 'video/mp4'} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <AppearanceTitleContainer>
          <AppearanceText>{ t("supported_video") }</AppearanceText>
          <AppearanceText>{ t('maximum_video') }</AppearanceText>
        </AppearanceTitleContainer>
      </AppearanceContainer>
    </>
  );
};
