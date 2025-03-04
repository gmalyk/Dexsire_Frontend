import ContainerAuthenticated from 'containers/Authenticated'
import React, { useState } from 'react'
import { Background, BodyContainer, BodyContent, EditContainer } from './styled'
import Footer from 'components/Footer'
import Button from 'components/Form/Button'
import useI18n from 'hooks/useI18n'
import { Container } from 'reactstrap'
import { Icon } from 'ui/styled'
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
    ActionIcon,
    HeaderActions,
    ProfileAvatarSection,
    AgeDisplay,
    CityDisplay,
    ProfileNameWrapper,
    ProfileTopRow,
    ProfileBottomRow,
    RoundButton,
    WhatsappButton,
    AppearanceContainer,
    AppearanceTitleContainer,
    AppearanceTitle,
    AppearanceText,
    UploadFileContainer,
} from './styled'
import { useLocation, useParams } from 'react-router-dom'
import { parseStrapiImage } from 'utils'

export default function EscortProfile() {
  const { t } = useI18n()
  const [isEditing, setIsEditing] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const { id } = useParams()
  const location = useLocation()
  const profileData = location.state?.profileData

  const [currentProfile] = useState(profileData || {
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
  })

  const handleEdit = () => setIsEditing(true)
  const handleSave = () => {
    setIsEditing(false)
  }
  const handlePhotoClick = (index) => {
    console.log(`Photo clicked: ${index}`)
  }

  console.log('Profile ID:', id)
  console.log('Profile Data:', profileData)

  const handleFileUpload = (file) => {
    setUploadedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  return (
    <ContainerAuthenticated free>
      <BodyContainer>
        <Background />
        <BodyContent>
          <>
            
            <ProfileContainer>
                <ProfileHeader>
                    <ProfileTopRow>
                        <ProfileAvatar src={currentProfile.images[0]} />
                        <ProfileInfo>
                            <ProfileName>
                                <span>{currentProfile.name.split(' ')[0]}</span>
                                <span>{currentProfile.name.split(' ')[1]}</span>
                            </ProfileName>
                        </ProfileInfo>
                        <HeaderActions>
                            <ActionIcon icon="heart" />
                            <ActionIcon icon="message" />
                            <ActionIcon icon="bell" />
                        </HeaderActions>
                    </ProfileTopRow>
                    
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

                <ProfileDescription>{currentProfile.description}</ProfileDescription>

                <ProfileStats>
                    <StatItem>
                        <StatValue>{currentProfile.stats?.posts || currentProfile.posts}</StatValue>
                        <StatLabel>posts</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.stats?.videos || currentProfile.videos}</StatValue>
                        <StatLabel>videos</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.stats?.likes || currentProfile.likes}</StatValue>
                        <StatLabel>likes</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.stats?.comments || currentProfile.comments}</StatValue>
                        <StatLabel>comments</StatLabel>
                    </StatItem>
                </ProfileStats>

            
                

                <ActionButtons>
                    <FollowButton outlineGradient>
                        Follow
                    </FollowButton>
                    <WhatsappButton 
                        outlineGradient
                        onClick={() => window.open(`https://wa.me/${currentProfile.whatsapp}`)}
                    >
                        <img src="/icons/whatsapp.svg" alt="WhatsApp" />
                    </WhatsappButton>
                </ActionButtons>

                <NavigationBar>
                    
                    <Icon 
                        icon="photos" 
                        src="/icons/cam-white.svg" 
                    />
                    <Icon 
                        icon="profile" 
                        src="/icons/cabeca.svg" 
                    />
                    <Icon 
                        icon="videos" 
                        src="/icons/video.svg" 
                    />
                    
                    <Icon 
                        icon="star" 
                        src="/icons/star-outline-white.svg"
                    />
                    <Icon 
                        icon="hot" 
                        src="/icons/pimenta.svg" 

                    />
                </NavigationBar>

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

                
            </ProfileContainer>
          </>
        </BodyContent>
      </BodyContainer>
      <Footer />
    </ContainerAuthenticated>
  )
}
