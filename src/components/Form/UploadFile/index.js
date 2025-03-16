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
import { Upload } from 'services/core';

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

    const handleChange = async (e) => {
        const files = e.target.files;
        if (!files?.length) return;

        try {
            if (multiple) {
                const validFiles = Array.from(files).filter(file => !validate || validate(file));
                
                // Create local preview URLs immediately for better UX
                const localPreviews = validFiles.map(file => ({
                    id: `temp-${Math.random().toString(36).substr(2, 9)}`,
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploading: true,
                    originalFile: file // Store the original file for later upload
                }));
                
                // Show local previews immediately
                onChange(localPreviews);
                
                // Then start the actual upload
                const uploadPromises = validFiles.map(async (file, index) => {
                    const formData = new FormData();
                    formData.append('files', file);
                    
                    const tempId = localPreviews[index].id;
                    simulateUpload(tempId);
                    
                    try {
                        const response = await Upload(formData);
                        console.log('Upload response for file:', file.name, response);
                        
                        if (response && response.length > 0) {
                            // Get the full URL including domain
                            const fileUrl = response[0].url.startsWith('http') 
                                ? response[0].url 
                                : `${process.env.REACT_APP_API_URL}${response[0].url}`;
                                
                            return {
                                ...response[0],
                                id: response[0].id,
                                name: file.name,
                                size: file.size,
                                url: fileUrl,
                                uploading: false
                            };
                        }
                        return null;
                    } catch (err) {
                        console.error('Error uploading individual file:', file.name, err);
                        return null;
                    }
                });
                
                const uploadedFiles = await Promise.all(uploadPromises);
                const successfulUploads = uploadedFiles.filter(Boolean);
                
                if (successfulUploads.length > 0) {
                    // Replace the temporary previews with the actual uploaded files
                    onChange(successfulUploads);
                }
            } else {
                // Single file upload
                const file = files[0];
                
                if (validate && !validate(file)) {
                    return;
                }
                
                // Create local preview immediately for better UX
                const tempId = `temp-${Math.random().toString(36).substr(2, 9)}`;
                const localPreview = {
                    id: tempId,
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploading: true,
                    originalFile: file // Store the original file for later upload
                };
                
                // Show local preview immediately
                onChange(localPreview);
                
                // Then start the actual upload
                simulateUpload(tempId);
                
                try {
                    const formData = new FormData();
                    formData.append('files', file);
                    
                    const response = await Upload(formData);
                    console.log('Upload response for single file:', file.name, response);
                    
                    if (response && response.length > 0) {
                        // Get the full URL including domain
                        const fileUrl = response[0].url.startsWith('http') 
                            ? response[0].url 
                            : `${process.env.REACT_APP_API_URL}${response[0].url}`;
                            
                        const uploadedFile = {
                            ...response[0],
                            id: response[0].id,
                            name: file.name,
                            size: file.size,
                            url: fileUrl,
                            uploading: false
                        };
                        
                        onChange(uploadedFile);
                    }
                } catch (err) {
                    console.error('Error uploading single file:', file.name, err);
                }
            }
        } catch (error) {
            console.error('Error in file upload process:', error);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (!files?.length) return;

        try {
            if (multiple) {
                const validFiles = Array.from(files).filter(file => !validate || validate(file));
                
                // Create local preview URLs immediately for better UX
                const localPreviews = validFiles.map(file => ({
                    id: `temp-${Math.random().toString(36).substr(2, 9)}`,
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploading: true
                }));
                
                // Show local previews immediately
                onChange(localPreviews);
                
                // Then start the actual upload
                const uploadPromises = validFiles.map(async (file, index) => {
                    const formData = new FormData();
                    formData.append('files', file);
                    
                    const tempId = localPreviews[index].id;
                    simulateUpload(tempId);
                    
                    try {
                        const response = await Upload(formData);
                        console.log('Upload response for file (drop):', file.name, response);
                        
                        if (response && response.length > 0) {
                            // Get the full URL including domain
                            const fileUrl = response[0].url.startsWith('http') 
                                ? response[0].url 
                                : `${process.env.REACT_APP_API_URL}${response[0].url}`;
                                
                            return {
                                ...response[0],
                                id: response[0].id,
                                name: file.name,
                                size: file.size,
                                url: fileUrl,
                                uploading: false
                            };
                        }
                        return null;
                    } catch (err) {
                        console.error('Error uploading individual file (drop):', file.name, err);
                        return null;
                    }
                });
                
                const uploadedFiles = await Promise.all(uploadPromises);
                const successfulUploads = uploadedFiles.filter(Boolean);
                
                if (successfulUploads.length > 0) {
                    // Replace the temporary previews with the actual uploaded files
                    onChange(successfulUploads);
                }
            } else {
                const file = files[0];
                if (!validate || validate(file)) {
                    const formData = new FormData();
                    formData.append('files', file);
                    
                    simulateUpload(Math.random().toString(36).substr(2, 9));
                    
                    const response = await Upload(formData);
                    
                    if (response && response.length > 0) {
                        const uploadedFile = {
                            ...response[0],
                            id: response[0].id,
                            name: file.name,
                            size: file.size,
                            url: response[0].url || URL.createObjectURL(file)
                        };
                        onChange(uploadedFile);
                    }
                }
            }
        } catch (error) {
            console.error('Error in file upload process (drop):', error);
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
                            {file.url && (
                                <img 
                                    src={file.url} 
                                    alt={file.name} 
                                    onError={(e) => {
                                        console.error('Error loading image preview:', file.url);
                                        e.target.src = '/icons/file-placeholder.svg'; // Fallback image
                                    }} 
                                />
                            )}
                            <FileInfo>
                                <FileName>{file.name}</FileName>
                                <FileStatus>
                                    {(file.size / (1024 * 1024)).toFixed(2)}mb - 
                                    {file.uploading ? 'Uploading...' : 'Upload completed'}
                                </FileStatus>
                                {file.uploading && (
                                    <ProgressBar progress={uploadProgress[file.id] || 0} />
                                )}
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