import React, { useState, useRef, useEffect } from 'react';
import { 
    FileUploadContainer, 
    FileUploadInput, 
    FileUploadLabel, 
    FileUploadButton, 
    FilePreviewContainer,
    FilePreview,
    PreviewImage,
    RemoveFileButton
} from './styled';
import useI18n from 'hooks/useI18n';

export default function FileUpload({ 
    accept = "image/*", 
    multiple = false, 
    onChange, 
    value,
    label,
    buttonText,
    previewSize = 100,
    maxFiles = 10,
    required = false
}) {
    const { t } = useI18n();
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const fileInputRef = useRef(null);

    // Initialize from value prop
    useEffect(() => {
        if (value) {
            const initialFiles = Array.isArray(value) ? value : [value];
            setFiles(initialFiles);
            
            // Generate previews for initial files
            const initialPreviews = initialFiles.map(file => {
                // If file already has a url property, use it
                if (file.url) {
                    return file.url;
                }
                
                // If file is a File object, create object URL
                if (file instanceof File) {
                    return URL.createObjectURL(file);
                }
                
                // If file has formats with thumbnail, use it
                if (file.formats && file.formats.thumbnail) {
                    return file.formats.thumbnail.url;
                }
                
                // Fallback to full URL if available
                return file.url || '';
            });
            
            setPreviews(initialPreviews);
        }
    }, [value]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        
        if (multiple) {
            // Check if adding these files would exceed the maximum
            if (files.length + selectedFiles.length > maxFiles) {
                console.warn(`Maximum ${maxFiles} files allowed`);
                return;
            }
        }
        
        // Generate previews immediately for better UX
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        
        if (multiple) {
            setPreviews([...previews, ...newPreviews]);
        } else {
            setPreviews(newPreviews);
        }
        
        // Update files state with the local files
        const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
        setFiles(newFiles);
        
        // Call onChange with the updated files
        if (onChange) {
            onChange(multiple ? newFiles : newFiles[0]);
        }
        
        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveFile = (index) => {
        // Create new arrays without the file at the specified index
        const newFiles = [...files];
        const newPreviews = [...previews];
        
        // Revoke object URL if it's a blob URL to prevent memory leaks
        if (previews[index] && previews[index].startsWith('blob:')) {
            URL.revokeObjectURL(previews[index]);
        }
        
        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);
        
        setFiles(newFiles);
        setPreviews(newPreviews);
        
        // Call onChange with the updated files
        if (onChange) {
            onChange(multiple ? newFiles : newFiles.length > 0 ? newFiles[0] : null);
        }
    };

    return (
        <FileUploadContainer>
            <FileUploadLabel>{label} {required && <span style={{ color: 'red' }}>*</span>}</FileUploadLabel>
            <FileUploadButton 
                onClick={() => fileInputRef.current.click()}
            >
                {buttonText || t('choose_files')}
            </FileUploadButton>
            
            <FileUploadInput
                type="file"
                ref={fileInputRef}
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
            />
            
            {previews.length > 0 && (
                <FilePreviewContainer>
                    {previews.map((preview, index) => (
                        <FilePreview key={index} size={previewSize}>
                            <PreviewImage 
                                src={preview} 
                                alt={`Preview ${index}`}
                            />
                            <RemoveFileButton 
                                onClick={() => handleRemoveFile(index)}
                                title={t('remove_file')}
                            >
                                ×
                            </RemoveFileButton>
                        </FilePreview>
                    ))}
                </FilePreviewContainer>
            )}
        </FileUploadContainer>
    );
} 