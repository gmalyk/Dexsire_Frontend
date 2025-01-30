import React from "react";
import { Image, ImageContainer } from "./styled";


export default function OverlappingImages({ images, overlap = '50px' }) {
  return (
    <ImageContainer>
      {images.map((src, index) => (
        <Image
          key={index}
          src={src?.src}
          offset={`${index * -25 + index * parseInt(overlap, 10)}px`}
          alt={`Image ${index + 1}`}
        />
      ))}

    </ImageContainer>
  );
}