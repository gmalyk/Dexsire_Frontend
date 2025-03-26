import styled from 'styled-components';

export const FileUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const FileUploadLabel = styled.label`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
    color: ${props => props.theme.palette.colors.white};
`;

export const FileUploadInput = styled.input`
    display: none;
`;

export const FileUploadButton = styled.button`
    background: ${props => props.theme.palette.colors.darkgrey};
    color: ${props => props.theme.palette.colors.white};
    border: 1px solid ${props => props.theme.palette.colors.grey};
    border-radius: 8px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.theme.palette.colors.grey};
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const FilePreviewContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

export const FilePreview = styled.div`
    position: relative;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${props => props.theme.palette.colors.grey};
`;

export const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const RemoveFileButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    font-size: 16px;
    line-height: 1;
    padding: 0;
    
    &:hover {
        background: rgba(255, 0, 0, 0.7);
    }
`; 