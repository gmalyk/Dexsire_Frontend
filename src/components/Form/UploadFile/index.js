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

    // Ensure files is always an array and filter out null/undefined items
    const safeFiles = Array.isArray(files) ? files.filter(Boolean) : (files ? [files].filter(Boolean) : []);

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
        e.preventDefault();
        const files = e.target.files;
        if (!files?.length) return;

        try {
            if (multiple) {
                const validFiles = Array.from(files).filter(file => !validate || validate(file));
                
                // Create temporary IDs for tracking uploads
                const tempPreviews = validFiles.map(file => ({
                    id: `temp-${Math.random().toString(36).substr(2, 9)}`,
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploading: true,
                    tempFile: true // Mark as temporary
                }));
                
                // Show temporary previews
                onChange(tempPreviews);
                
                const uploadPromises = validFiles.map(async (file, index) => {
                    const formData = new FormData();
                    formData.append('files', file);
                    
                    const tempId = tempPreviews[index].id;
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
                                uploading: false,
                                tempId: tempId // Keep track of which temp preview this replaces
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
                    // Replace temporary previews with actual uploaded files
                    onChange(prevFiles => {
                        // Filter out temporary files that have been replaced
                        const remainingFiles = prevFiles.filter(
                            file => !file.tempFile || 
                            !successfulUploads.some(upload => upload.tempId === file.id)
                        );
                        
                        // Add the new uploads
                        return [...remainingFiles, ...successfulUploads];
                    });
                }
            } else {
                // Single file upload
                if (!files[0]) return;
                
                const file = files[0];
                if (validate && !validate(file)) return;
                
                // Create temporary preview
                const tempPreview = {
                    id: `temp-${Math.random().toString(36).substr(2, 9)}`,
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploading: true,
                    tempFile: true
                };
                
                // Show temporary preview
                onChange(tempPreview);
                
                const formData = new FormData();
                formData.append('files', file);
                
                simulateUpload(tempPreview.id);
                
                try {
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
                        
                        // Replace temporary preview with actual uploaded file
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
                
                // Create temporary IDs for tracking uploads
                const tempPreviews = validFiles.map(file => ({
                    id: `temp-${Math.random().toString(36).substr(2, 9)}`,
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploading: true,
                    tempFile: true // Mark as temporary
                }));
                
                // Show temporary previews
                onChange(tempPreviews);
                
                const uploadPromises = validFiles.map(async (file, index) => {
                    const formData = new FormData();
                    formData.append('files', file);
                    
                    const tempId = tempPreviews[index].id;
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
                                uploading: false,
                                tempId: tempId // Keep track of which temp preview this replaces
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
                    // Replace temporary previews with actual uploaded files
                    onChange(prevFiles => {
                        // Filter out temporary files that have been replaced
                        const remainingFiles = prevFiles.filter(
                            file => !file.tempFile || 
                            !successfulUploads.some(upload => upload.tempId === file.id)
                        );
                        
                        // Add the new uploads
                        return [...remainingFiles, ...successfulUploads];
                    });
                }
            } else {
                // Single file upload
                if (!files[0]) return;
                
                const file = files[0];
                if (validate && !validate(file)) return;
                
                // Create temporary preview
                const tempPreview = {
                    id: `temp-${Math.random().toString(36).substr(2, 9)}`,
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploading: true,
                    tempFile: true
                };
                
                // Show temporary preview
                onChange(tempPreview);
                
                const formData = new FormData();
                formData.append('files', file);
                
                simulateUpload(tempPreview.id);
                
                try {
                    const response = await Upload(formData);
                    console.log('Upload response for single file (drop):', file.name, response);
                    
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
                        
                        // Replace temporary preview with actual uploaded file
                        onChange(uploadedFile);
                    }
                } catch (err) {
                    console.error('Error uploading single file (drop):', file.name, err);
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
                hasFiles={safeFiles.length > 0}
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

            <AppearanceTitleContainer hasFiles={safeFiles.length > 0}>
                <AppearanceInfoText>{t("supported_files")}: {supportedFiles}</AppearanceInfoText>
                <AppearanceInfoText>{t("maximum_file_size")}: {maxFileSize}</AppearanceInfoText>
            </AppearanceTitleContainer>

            {safeFiles.length > 0 && (
                <PreviewContainer>
                    {safeFiles.map(file => (
                        <PreviewItem key={file.id || `file-${Math.random()}`}>
                            {file.url && (
                                <img 
                                    src={file.url} 
                                    alt={file.name || 'File preview'} 
                                    onError={(e) => {
                                        console.error('Error loading image preview:', file.url);
                                        e.target.src = '/icons/file-placeholder.svg'; // Fallback image
                                    }} 
                                />
                            )}
                            <FileInfo>
                                <FileName>{file.name || 'Unnamed file'}</FileName>
                                <FileStatus>
                                    {file.size ? `${(file.size / (1024 * 1024)).toFixed(2)}mb - ` : ''}
                                    {file.uploading ? 'Uploading...' : 'Upload completed'}
                                </FileStatus>
                                {file.uploading && (
                                    <ProgressBar progress={uploadProgress[file.id] || 0} />
                                )}
                            </FileInfo>
                            <DeleteButton onClick={(e) => {
                                e.stopPropagation();
                                if (onRemove) onRemove(file.id);
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