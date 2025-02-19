import ContainerAuthenticated from 'containers/Authenticated'
import React, { useState } from 'react'
import { Background, BodyContainer, BodyContent, EditContainer } from './styled'
import Footer from 'components/Footer'
import Button from 'components/Form/Button'
import useI18n from 'hooks/useI18n'
import {
    ProfileContainer,
    ProfileHeader,
    ProfileAvatar,
    ProfileInfo,
    ProfileName,
    ProfileLocation,
    ProfileDescription,
    ProfileStats,
    StatItem,
    StatValue,
    StatLabel,
    ActionButtons,
    PhotoGallery,
    GalleryTitle,
    GalleryGrid,
    GalleryItem,
    NavigationBar,
    Icon,
    LocationItem,
    HeaderActions,
    ActionIcon,
    ProfileAvatarSection,
    AgeDisplay,
    CityDisplay,
    ProfileNameWrapper,
    ProfileTopRow,
    ProfileBottomRow,
    RoundButton
} from './styled'

export default function EscortProfile() {
  const { t } = useI18n()
  const [isEditing, setIsEditing] = useState(false)
  
  // Mock data for development
  const mockProfile = {
    id: 1,
    name: "Amanda Borges",
    age: 23,
    location: {
      city: "Florianópolis",
      state: "SC"
    },
    description: "I'm Amanda, I would be very happy to meet you in person and share my attractive and irresistible private content 💋",
    images: [
      "/images/profile.png",
      "/images/escort3.png",
      "/images/escort.jpeg",
      "/images/escort2.jpeg"
    ],
    services: ["Service 1", "Service 2"],
    prices: [
      { text: "1 hour - 300 CHF" },
      { text: "2 hours - 500 CHF" }
    ],
    phone: "+41 123 456 789",
    whatsapp: "+41123456789",
    verified: true,
    posts: 34,
    videos: 10,
    likes: 124,
    comments: 26
  }

  const [currentProfile] = useState(mockProfile)

  // Simplified handlers without API calls
  const handleEdit = () => setIsEditing(true)
  const handleSave = () => {
    setIsEditing(false)
    // Could add console.log here for debugging
  }
  const handlePhotoClick = (index) => {
    console.log(`Photo clicked: ${index}`)
  }

  return (
    <ContainerAuthenticated free>
      <BodyContainer>
        <Background />
        <BodyContent>
          <>
            
            <ProfileContainer>
                {/* Header Section */}
                <ProfileHeader>
                    <ProfileTopRow>
                        <ProfileAvatar src={currentProfile.images[0]} />
                        <ProfileInfo>
                            <ProfileName>
                                <span>Amanda</span>
                                <span>Borges</span>
                            </ProfileName>
                        </ProfileInfo>
                        <HeaderActions>
                            <ActionIcon icon="heart" />
                            <ActionIcon icon="message" />
                            <ActionIcon icon="bell" />
                        </HeaderActions>
                    </ProfileTopRow>
                    
                    {/* Age and Location Section */}
                    <ProfileBottomRow>
                        <AgeDisplay>
                            <label>Age</label>
                            <span>{currentProfile.age} years</span>
                        </AgeDisplay>
                        <CityDisplay>
                            <label>City State</label>
                            <span>{currentProfile.location.city}/{currentProfile.location.state}</span>
                        </CityDisplay>
                    </ProfileBottomRow>
                </ProfileHeader>

                {/* Description Section */}
                <ProfileDescription>{currentProfile.description}</ProfileDescription>

                {/* Stats Section */}
                <ProfileStats>
                    <StatItem>
                        <StatValue>{currentProfile.posts}</StatValue>
                        <StatLabel>posts</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.videos}</StatValue>
                        <StatLabel>videos</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.likes}</StatValue>
                        <StatLabel>likes</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.comments}</StatValue>
                        <StatLabel>comments</StatLabel>
                    </StatItem>
                </ProfileStats>

                {/* Action Buttons Section */}
                <ActionButtons>
                    <Button 
                        outlineGradient 
                        style={{ flex: 1 }}
                    >
                        Follow
                    </Button>
                    <RoundButton>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </RoundButton>
                </ActionButtons>

                <NavigationBar>
                    <Icon icon="camera" />
                    <Icon icon="chat" />
                    <Icon icon="video" />
                    <Icon icon="star" />
                    <Icon icon="share" />
                </NavigationBar>

                {/* Photo Gallery Section */}
                <PhotoGallery>
                    <GalleryTitle>Photo gallery</GalleryTitle>
                    <GalleryGrid>
                        {currentProfile.images.slice(1).map((photo, index) => (
                            <GalleryItem key={index} onClick={() => handlePhotoClick(index)}>
                                <img src={photo} alt="" />
                            </GalleryItem>
                        ))}
                    </GalleryGrid>
                </PhotoGallery>

                {/* Bottom Navigation Section */}
                
            </ProfileContainer>
          </>
        </BodyContent>
      </BodyContainer>
      <Footer />
    </ContainerAuthenticated>
  )
}
