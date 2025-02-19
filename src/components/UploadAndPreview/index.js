import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { AppearanceContainer, AppearanceText, AppearanceTitle, AppearanceTitleContainer, UploadFileContainer, UploadFileContent, UploadImageContainer } from './styled';
import { Container } from 'reactstrap';
import { Icon } from 'ui/styled';
import UploadFile from 'components/Form/UploadFile';
import PreviewCard from 'components/Cards/PreviewCard';
import useI18n from 'hooks/useI18n';

export default function UploadAndPreview({ setUploadedFile, preview = [] }) {
    const { t } = useI18n()

    const handleFileChange = (file) => {
        setUploadedFile(file);
    };

    const handleRemove = (name) => {
        const fileToRemove = preview.find(f => f.name === name);
        if (fileToRemove?.url) {
            URL.revokeObjectURL(fileToRemove.url);
        }
        setUploadedFile(preview.filter(f => f.name !== name));
    };

    const validateFile = (file) => {
        if (file.size > 8000000) {
            toast.error(t("the_image_is_too_big"));
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
                        <AppearanceText>{t("drag_image")}</AppearanceText>
                    </UploadFileContainer>
                </UploadFile>

                {preview.length > 0 && (
                    <UploadImageContainer>
                        {preview.map((fileData, k) => (
                            <PreviewCard
                                url={fileData?.url}
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