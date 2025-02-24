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
    FollowButton,
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
    RoundButton,
    WhatsappButton
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
                    <FollowButton outlineGradient>
                        Follow
                    </FollowButton>
                    <WhatsappButton 
                        outlineGradient
                        onClick={() => window.open(`https://wa.me/${currentProfile.whatsapp}`)}
                    >
                        <img src="/images/whatsappLogo.png" alt="WhatsApp" />
                    </WhatsappButton>
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
