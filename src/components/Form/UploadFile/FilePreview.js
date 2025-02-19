import React from 'react';
import styled from 'styled-components';
import { Icon } from 'ui/styled';

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

export default function FilePreview({ file, onRemove, uploading = false, progress = 0 }) {
    const fileSize = (file.size / (1024 * 1024)).toFixed(2);
    
    return (
        <PreviewContainer uploading={uploading}>
            <PreviewImage src={file.url} alt={file.name} />
            <FileInfo>
                <FileName>{file.name}</FileName>
                <FileSize>{fileSize}mb {uploading ? '- Upload in progress' : '- Upload completed'}</FileSize>
                {uploading && <ProgressBar progress={progress} />}
            </FileInfo>
            <DeleteButton onClick={() => onRemove(file.name)}>
                <Icon icon="trash" size={20} />
            </DeleteButton>
        </PreviewContainer>
    );
} 