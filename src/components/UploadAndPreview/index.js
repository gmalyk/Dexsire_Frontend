import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { AppearanceContainer, AppearanceText, AppearanceTitle, AppearanceTitleContainer, UploadFileContainer, UploadFileContent, UploadImageContainer } from './styled';
import { Container } from 'reactstrap';
import { Icon } from 'ui/styled';
import UploadFile from 'components/Form/UploadFile';
import PreviewCard from 'components/Cards/PreviewCard';
import useI18n from 'hooks/useI18n';
import { parseStrapiImage } from 'utils';

export default function UploadAndPreview({ setUploadedFile, preview = [] }) {
    const { t } = useI18n();
    const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (file) => {
        setUploadError(null);
        
        try {
            // Check if file is already processed by the server
            if (file && file.id && file.url) {
                // File already has a URL from the server
                const updatedFiles = Array.isArray(preview) ? [...preview, file] : [file];
                setUploadedFile(updatedFiles);
            } 
            // Handle raw File object
            else if (file && file instanceof File) {
                const objectUrl = URL.createObjectURL(file);
                
                // Create a temporary file object with preview URL
                const tempFile = {
                    ...file,
                    id: `temp-${Date.now()}`,
                    url: objectUrl,
                    mime: file.type
                };
                
                // Add to existing files
                const updatedFiles = Array.isArray(preview) ? [...preview, tempFile] : [tempFile];
                setUploadedFile(updatedFiles);
            }
        } catch (error) {
            console.error('Error handling file:', error);
            setUploadError(t("error_processing_image"));
            toast.error(t("error_processing_image"));
        }
    };

    const handleRemove = (name) => {
        const fileToRemove = preview.find(f => f.name === name);
        if (fileToRemove?.url && fileToRemove.url.startsWith('blob:')) {
            URL.revokeObjectURL(fileToRemove.url);
        }
        setUploadedFile(preview.filter(f => f.name !== name));
    };

    const validateFile = (file) => {
        if (file.size > 8000000) {
            toast.error(t("the_image_is_too_big"));
            return false;
        }
        if (!file.type.startsWith('image/')) {
            toast.error(t("only_image_files_allowed"));
            return false;
        }
        return true;
    };

    return (
        <AppearanceContainer>
            <AppearanceTitle>
                {t("upload")}
            </AppearanceTitle>
            <UploadFileContent>
                <UploadFile
                    onChange={handleFileChange}
                    accept="image/*"
                    validate={validateFile}
                >
                    <UploadFileContainer>
                        <Container />
                        <Icon icon="double-page" />
                        <AppearanceText>
                            {uploadError ? uploadError : t("drag_image")}
                        </AppearanceText>
                    </UploadFileContainer>
                </UploadFile>

                {preview && preview.length > 0 && (
                    <UploadImageContainer>
                        {preview.map((fileData, k) => (
                            <PreviewCard
                                url={parseStrapiImage(fileData?.url)}
                                name={fileData?.name}
                                size={fileData?.size}
                                key={k}
                                onRemove={handleRemove}
                            />
                        ))}
                    </UploadImageContainer>
                )}
            </UploadFileContent>
            <AppearanceTitleContainer>
                <AppearanceText>{t("supported_image")}</AppearanceText>
                <AppearanceText>{t("maximum_image")}</AppearanceText>
            </AppearanceTitleContainer>
        </AppearanceContainer>
    )
}