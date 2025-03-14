import styled from "styled-components";

export const ImagesGalleryContainer = styled.div.attrs({
  className: "images-gallery-container",
})`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ImageContainer = styled.div.attrs({
  className: "image-container",
})`
  width: 411px;
  height: 308px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  position: relative;

  ${p => p.small ? `
    width: 306px;
    height: 240px;
    ` : ``}

  ${p => p.isVideo ? `
    width: calc(100% / 2 - 12px);
    // min-width: 480px;
    height: 355.5px;
    @media (max-width: 768px) {
    width: 100%;
    height: 100%;
     }
  ` : ``}

  &:hover {
    transform: scale(1.03);
  }
`;

export const Image = styled.img.attrs({
  className: "image",
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px; 
`;

export const PlayButton = styled.div.attrs({
  className: "play-button",
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
`;

export const VideoPlayer = styled.video.attrs({
  autoPlay: false,
  muted:true,
  loop:true,
  controls: true
})`
  width: 100%;
  aspect-ratio: 4 / 3;
`;

export const GalleryContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const GalleryTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  line-height: 29.05px;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
`;

export const GalleryContent = styled.div.attrs({})`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  
  @media(max-width: 767px){
    gap: 12px;
  }
`;

export const GalleryImageContainer = styled.div.attrs({})`
  position: relative;
  width: ${p => p.small ? '200px' : '300px'};
  height: ${p => p.small ? '200px' : '300px'};
  border-radius: 16px;
  overflow: hidden;
  cursor: move;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    cursor: grabbing;
    transform: scale(1.02);
  }
  
  @media(max-width: 767px){
    width: calc(50% - 6px);
    height: 150px;
  }
`;

export const GalleryImage = styled.img.attrs({})`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DeleteButton = styled.div.attrs({})`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const MoreButton = styled.div.attrs({})`
  width: 300px;
  height: 300px;
  border-radius: 16px;
  border: 1px dashed ${p => p.theme.palette.colors.grey};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  @media(max-width: 767px){
    width: calc(50% - 6px);
    height: 150px;
  }
`;