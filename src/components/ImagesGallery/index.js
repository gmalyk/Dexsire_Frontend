import React, { useState, useEffect } from 'react'
import { ButtonContainer, Icon, Title } from 'ui/styled'
import { Image, ImageContainer, ImagesGalleryContainer, PlayButton, VideoPlayer } from './styled'
import Button from 'components/Form/Button'
import ImageView from 'components/ImageView';
import { parseStrapiImage } from 'utils';
import useI18n from 'hooks/useI18n';
import { GalleryContainer, GalleryContent, GalleryImage, GalleryImageContainer, GalleryTitle, MoreButton, DeleteButton } from './styled'
import { Update } from 'services/core'
import { toast } from 'react-toastify'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function ImagesGallery({ images, videos, noTitle, small, noMore, profile, onDeleteImage }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageItems, setImageItems] = useState([]);

  const { t } = useI18n();

  // Initialize imageItems when images prop changes
  useEffect(() => {
    if (images) {
      setImageItems(images.map((image, index) => ({ ...image, id: `image-${index}` })));
    }
  }, [images]);

  const content = videos && videos.length > 0 ? videos : imageItems;

  const openImage = (index) => {
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setCurrentIndex(null);
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  const showPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length);
  };

  const handleDeleteImage = async (index) => {
    if (loading) return;
    
    setLoading(true);
    try {
      // Filter out the image at the specified index
      const updatedPhotos = profile?.photos?.filter((_, i) => i !== index);
      
      // Update the profile with the new photos array
      await Update("models", { data: { photos: updatedPhotos } }, profile?.id);
      
      // Call the callback to refresh the UI
      if (onDeleteImage) {
        onDeleteImage(index);
      }
      
      toast.success(t("photo_deleted_successfully"));
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(t("error_deleting_photo"));
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    const items = Array.from(imageItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setImageItems(items);
    
    // Update the order in the backend
    if (profile) {
      setLoading(true);
      try {
        // Create a new array of photo IDs in the new order
        const reorderedPhotoIds = items.map((_, index) => {
          return profile.photos[index];
        });
        
        // Update the profile with the reordered photos
        await Update("models", { data: { photos: reorderedPhotoIds } }, profile?.id);
        toast.success(t("photos_reordered_successfully"));
      } catch (error) {
        console.error("Error reordering photos:", error);
        toast.error(t("error_reordering_photos"));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <GalleryContainer>
      {!noTitle && <GalleryTitle>{videos && videos.length > 0 ? t("gallery_video") : t("gallery_image")}</GalleryTitle>}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="photos" direction="horizontal">
          {(provided) => (
            <GalleryContent 
              small={small} 
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {imageItems.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided, snapshot) => (
                    <GalleryImageContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.7 : 1,
                      }}
                    >
                      <GalleryImage 
                        src={image?.url} 
                        alt={`gallery-${index}`} 
                        onClick={() => openImage(index)}
                      />
                      {profile && (
                        <DeleteButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(index);
                          }}
                        >
                          <img src="/icons/delete.svg" alt="delete" />
                        </DeleteButton>
                      )}
                    </GalleryImageContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {!noMore && (
                <MoreButton>
                  <Icon icon="plus" />
                </MoreButton>
              )}
            </GalleryContent>
          )}
        </Droppable>
      </DragDropContext>
      
      {currentIndex !== null && (
        <ImageView
          profile={profile}
          presrc={content?.[currentIndex-1]?.src || content?.[currentIndex-1]?.url}
          src={content?.[currentIndex]?.src || content?.[currentIndex]?.url}
          possrc={content?.[currentIndex+1]?.src || content?.[currentIndex+1]?.url}
          type={content[currentIndex].type || 'image'}
          showNext={showNext} showPrev={showPrev} closeImage={closeImage}
        />
      )}
    </GalleryContainer>
  );
}