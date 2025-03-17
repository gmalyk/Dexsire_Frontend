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
    NavIcon,
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
  
  // Add state to track active navigation tab
  const [activeTab, setActiveTab] = useState('photos')

  // Add this state to track following status
  const [isFollowing, setIsFollowing] = useState(false);

  const [currentProfile, setCurrentProfile] = useState(null)


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

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  // Add this function to handle follow/unfollow
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // Here you would typically make an API call to update the follow status
  };

  // Add this after the handleTabClick function
  const renderTabContent = () => {
    switch(activeTab) {
      case 'photos':
        return (
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
        );
      case 'profile':
        return (
          <div>
            <GalleryTitle>Profile information</GalleryTitle>
            <ProfileDescription>
            </ProfileDescription>
          </div>
        );
      case 'videos':
        return (
          <div>
            <GalleryTitle>Video gallery</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
            </div>
          </div>
        );
      case 'star':
        return (
          <div>
            <GalleryTitle>What some customers are saying:</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
            </div>
          </div>
        );
      case 'hot':
        return (
          <div>
            <GalleryTitle>Services that the escort offers:</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
            </div>
          </div>
        );
      default:
        return (
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
        );
    }
  };

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
                            <NavIcon icon="heart" src="/icons/heart.svg" />
                            <NavIcon icon="message" src="/icons/message.svg" />
                            <NavIcon icon="bell" src="/icons/bell.svg" />
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
                    <FollowButton 
                        outlineGradient={!isFollowing}
                        color={isFollowing ? 'white' : undefined}
                        onClick={handleFollowToggle}
                    >
                        {isFollowing ? 'Followed' : 'Follow'}
                    </FollowButton>
                    <WhatsappButton 
                        outlineGradient
                        onClick={() => window.open(`https://wa.me/${currentProfile.whatsapp}`)}
                    >
                        <img src="/icons/whatsapp.svg" alt="WhatsApp" />
                    </WhatsappButton>
                </ActionButtons>

                <NavigationBar>
                    <NavIcon 
                        icon="photos" 
                        src="/icons/cam-white.svg"
                        active={activeTab === 'photos'}
                        onClick={() => handleTabClick('photos')}
                    />
                    <NavIcon 
                        icon="profile" 
                        src="/icons/cabeca.svg"
                        active={activeTab === 'profile'}
                        onClick={() => handleTabClick('profile')}
                    />
                    <NavIcon 
                        icon="videos" 
                        src="/icons/video.svg"
                        active={activeTab === 'videos'}
                        onClick={() => handleTabClick('videos')}
                    />
                    <NavIcon 
                        icon="star" 
                        src="/icons/star-outline-white.svg"
                        active={activeTab === 'star'}
                        onClick={() => handleTabClick('star')}
                    />
                    <NavIcon 
                        icon="hot" 
                        src="/icons/pimenta.svg"
                        active={activeTab === 'hot'}
                        onClick={() => handleTabClick('hot')}
                    />
                </NavigationBar>

                {renderTabContent()}

                
            </ProfileContainer>
          </>
        </BodyContent>
      </BodyContainer>
      <Footer />
    </ContainerAuthenticated>
  )
}
