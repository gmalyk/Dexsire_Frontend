import React, { useRef, useState } from 'react';
import { Icon } from 'ui/styled';
import useI18n from 'hooks/useI18n';
import {
    UploadContainer,
    PreviewContainer,
    PreviewItem,
    FileInfo,
    FileName,
    FileStatus,
    ProgressBar,
    DeleteButton,
    UploadText,
    UploadWrapper,
    FileInfoText,
    AppearanceTitleContainer,
    AppearanceInfoText
} from './styled';

export default function UploadFile({ 
    children, 
    onChange, 
    validate, 
    accept, 
    multiple = false,
    files = [],
    onRemove,
    uploading = false,
    dragText = "drag_the_video_here_or_click_here",
    supportedFiles = "",
    maxFileSize = ""
}) {
    const inputRef = useRef();
    const [uploadProgress, setUploadProgress] = useState({});
    const { t } = useI18n();

    const simulateUpload = (fileId) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(prev => ({
                ...prev,
                [fileId]: progress
            }));
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 200);
    };

    const handleChange = (e) => {
        const files = e.target.files;
        if (!files?.length) return;

        if (multiple) {
            const validFiles = Array.from(files).filter(file => !validate || validate(file));
            validFiles.forEach(file => {
                const fileId = Math.random().toString(36).substr(2, 9);
                simulateUpload(fileId);
                file.id = fileId;
            });
            onChange(validFiles);
        } else {
            const file = files[0];
            if (!validate || validate(file)) {
                const fileId = Math.random().toString(36).substr(2, 9);
                simulateUpload(fileId);
                file.id = fileId;
                onChange(file);
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (!files?.length) return;

        if (multiple) {
            const validFiles = Array.from(files).filter(file => !validate || validate(file));
            if (validFiles.length) {
                onChange(validFiles);
            }
        } else {
            const file = files[0];
            if (!validate || validate(file)) {
                onChange(file);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <UploadWrapper>
            <UploadContainer 
                onClick={() => inputRef.current?.click()}
                hasFiles={files.length > 0}
            >
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleChange}
                    accept={accept}
                    multiple={multiple}
                    style={{ display: 'none' }}
                />
                <div className="upload-icon">
                    <Icon icon="double-page" size={24} color="#000000" />
                </div>
                <UploadText>{t(dragText)}</UploadText>
            </UploadContainer>

            <AppearanceTitleContainer hasFiles={files.length > 0}>
                <AppearanceInfoText>{t("supported_files")}: {supportedFiles}</AppearanceInfoText>
                <AppearanceInfoText>{t("maximum_file_size")}: {maxFileSize}</AppearanceInfoText>
            </AppearanceTitleContainer>

            {files.length > 0 && (
                <PreviewContainer>
                    {files.map(file => (
                        <PreviewItem key={file.id}>
                            <img src={file.url} alt={file.name} />
                            <FileInfo>
                                <FileName>{file.name}</FileName>
                                <FileStatus>
                                    {(file.size / (1024 * 1024)).toFixed(2)}mb - Upload completed
                                </FileStatus>
                            </FileInfo>
                            <DeleteButton onClick={(e) => {
                                e.stopPropagation();
                                onRemove(file.id);
                            }}>
                                <Icon icon="trash" size={16} />
                            </DeleteButton>
                        </PreviewItem>
                    ))}
                </PreviewContainer>
            )}
        </UploadWrapper>
    );
} 