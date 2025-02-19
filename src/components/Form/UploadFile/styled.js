import styled from 'styled-components'

export const UploadFileContent = styled.div.attrs(props => ({
}))`   
    width: 100%;
`;


export const UploadFileDemo = styled.div.attrs({
})`            
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: #ababab ${props => props.image ? `url(${props.image}) no-repeat center center / cover` : ''};
`;

export const UploadSection = styled.div`
    display: flex;
    gap: 24px;
    width: 100%;
`;

export const PreviewSection = styled.div`
    flex: 1;
    max-width: 400px;
`;

export const UploadContainer = styled.div`
    width: ${props => props.hasFiles ? '50%' : '100%'};
    height: 284px;
    border: 1px dashed ${props => props.theme.palette.colors.orange};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    background: rgba(0, 0, 0, 0.2);
    transition: width 0.3s ease;
    
    .upload-icon {
        width: 48px;
        height: 48px;
        background: ${props => props.theme.palette.colors.orange};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const PreviewContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: calc(50% - 16px);
    max-height: 284px;
    overflow-y: auto;
    background: transparent;
    margin-left: 16px;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.palette.colors.darkGrey};
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        position: static;
        left: auto;
        width: 100%;
        margin-top: 16px;
        margin-left: 0;
        max-height: none;
        overflow-y: visible;
    }
`;

export const PreviewItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    background: ${props => props.theme.palette.colors.darkGrey};
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 72px;

    @media (max-width: 768px) {
        background: ${props => props.theme.palette.colors.black};
    }

    img {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        object-fit: cover;
    }
`;

export const FileInfo = styled.div`
    flex: 1;
`;

export const FileName = styled.div`
    color: ${props => props.theme.palette.colors.white};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
`;

export const FileStatus = styled.div`
    color: ${props => props.theme.palette.colors.grey};
    font-size: 12px;
    opacity: 0.7;
`;

export const ProgressBar = styled.div`
    height: 2px;
    background: ${props => props.theme.palette.colors.orange};
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
    margin-top: 4px;
`;

export const DeleteButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.palette.colors.white};
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
    opacity: 0.7;

    &:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
    }

    svg {
        width: 16px;
        height: 16px;
        color: ${props => props.theme.palette.colors.white};
    }
`;

export const UploadText = styled.div`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    text-align: center;
    color: ${props => props.theme.palette.colors.grey};
`;

export const AppearanceTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: ${props => props.hasFiles ? '50%' : '100%'};
    transition: width 0.3s ease;
    margin-top: 12px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const AppearanceInfoText = styled.div`
    color: ${props => props.theme.palette.colors.grey};
    font-size: 12px;
    opacity: 0.7;
`;

export const UploadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;

    @media (max-width: 768px) {
        ${PreviewContainer} {
            order: 3;
        }
    }
`; 