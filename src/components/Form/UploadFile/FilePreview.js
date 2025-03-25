import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'ui/styled';
import { formatBytes, parseStrapiImage } from 'utils';

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: ${props => props.uploading ? props.theme.palette.colors.darkGrey : 'transparent'};
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid ${props => props.theme.palette.colors.darkGrey};
`;

const PreviewImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 12px;
`;

const FileInfo = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  color: ${props => props.theme.palette.colors.white};
  font-size: 14px;
  margin-bottom: 4px;
`;

const FileSize = styled.div`
  color: ${props => props.theme.palette.colors.grey};
  font-size: 12px;
`;

const ProgressBar = styled.div`
  height: 2px;
  background: ${props => props.theme.palette.colors.orange};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.theme.palette.colors.white};
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const FilePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: ${props => props.theme.palette.colors.darkGrey};
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid ${props => props.theme.palette.colors.darkGrey};
`;

const FilePreviewContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const FilePreviewImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 12px;
`;

const FilePreviewInfo = styled.div`
  flex: 1;
`;

const FilePreviewName = styled.div`
  color: ${props => props.theme.palette.colors.white};
  font-size: 14px;
  margin-bottom: 4px;
`;

const FilePreviewSize = styled.div`
  color: ${props => props.theme.palette.colors.grey};
  font-size: 12px;
`;

const FilePreviewRemove = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.theme.palette.colors.white};
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

export default function FilePreview({ file, onRemove, uploading = false, progress = 0 }) {
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        let url = '';
        
        try {
            // Handle different types of file URLs
            if (file.url) {
                // For blob URLs or complete URLs, use directly
                if (file.url.startsWith('blob:') || file.url.startsWith('http')) {
                    url = file.url;
                } 
                // For relative paths, use parseStrapiImage
                else {
                    url = parseStrapiImage(file.url);
                }
            } 
            // If it's a File object, create an object URL
            else if (file instanceof File) {
                url = URL.createObjectURL(file);
            }
            
            setPreviewUrl(url);
            setError(false);
        } catch (err) {
            console.error('Error creating preview URL:', err);
            setError(true);
        }
        
        // Cleanup function to revoke object URLs
        return () => {
            if (url && url.startsWith('blob:') && file instanceof File) {
                URL.revokeObjectURL(url);
            }
        };
    }, [file]);

    const handleImageError = () => {
        console.error('Error loading image preview:', previewUrl);
        setError(true);
    };

    const getFileIcon = () => {
        const fileType = file.type || '';
        
        if (fileType.startsWith('image/')) {
            return 'image';
        } else if (fileType.startsWith('video/')) {
            return 'video';
        } else if (fileType.startsWith('audio/')) {
            return 'audio';
        } else if (fileType.includes('pdf')) {
            return 'pdf';
        } else if (fileType.includes('word') || fileType.includes('document')) {
            return 'document';
        } else if (fileType.includes('excel') || fileType.includes('sheet')) {
            return 'spreadsheet';
        } else {
            return 'file';
        }
    };

    const fileSize = (file.size / (1024 * 1024)).toFixed(2);
    
    return (
        <FilePreviewContainer>
            <FilePreviewContent>
                {!error && file.type && file.type.startsWith('image/') ? (
                    <FilePreviewImage 
                        src={previewUrl} 
                        alt={file.name} 
                        onError={handleImageError}
                    />
                ) : (
                    <Icon icon={getFileIcon()} size={24} />
                )}
                <FilePreviewInfo>
                    <FilePreviewName>{file.name}</FilePreviewName>
                    <FilePreviewSize>{formatBytes(file.size)}</FilePreviewSize>
                </FilePreviewInfo>
            </FilePreviewContent>
            {onRemove && (
                <FilePreviewRemove onClick={() => onRemove(file.name || file.id)}>
                    <Icon icon="trash" size={16} />
                </FilePreviewRemove>
            )}
        </FilePreviewContainer>
    );
} 