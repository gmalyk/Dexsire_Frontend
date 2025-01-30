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