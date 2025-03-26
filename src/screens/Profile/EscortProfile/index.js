import ContainerAuthenticated from 'containers/Authenticated'
import React, { useState, useContext } from 'react'
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
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { parseStrapiImage } from 'utils'
import { toast } from 'react-toastify'
import { CoreContext } from 'context/CoreContext'

export default function EscortProfile() {
  const { t } = useI18n()
  const { user } = useContext(CoreContext)
  const history = useHistory()
  const navigate = (to) => history.push(`/${to}`)
  const [isEditing, setIsEditing] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const { id } = useParams()
  const location = useLocation()
  const profileData = location.state?.profileData
  
  // Add state to track active navigation tab
  const [activeTab, setActiveTab] = useState('photos')

  // Add state to track following, liked, and notification status
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isNotified, setIsNotified] = useState(false)

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

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  // Handle follow/unfollow
  const handleFollowToggle = () => {
    // Check if user is logged in
    if (!user?.email) {
      // Redirect to login page
      window.location.href = '/login';
      toast.info('Please login to follow this profile')
      return
    }
    
    // If user is logged in, proceed with follow/unfollow
    setIsFollowing(!isFollowing)
    // Here you would typically make an API call to update the follow status
  }

  // Handle like/unlike
  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
    // Here you would typically make an API call to update the like status
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites')
  }

  // Handle notification toggle
  const handleNotificationToggle = () => {
    setIsNotified(!isNotified)
    // Here you would typically make an API call to update the notification status
    toast.success(isNotified ? 'Notifications turned off' : 'Notifications turned on')
  }

  // Handle message
  const handleMessage = () => {
    // Here you would typically navigate to a chat screen or open a chat modal
    toast.info('Message feature coming soon')
  }

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
              {currentProfile.description}
            </ProfileDescription>
          </div>
        );
      case 'videos':
        return (
          <div>
            <GalleryTitle>Video gallery</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
              No videos available
            </div>
          </div>
        );
      case 'star':
        return (
          <div>
            <GalleryTitle>What some customers are saying:</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
              No reviews yet
            </div>
          </div>
        );
      case 'hot':
        return (
          <div>
            <GalleryTitle>Services that the escort offers:</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
              {currentProfile.services.map((service, index) => (
                <div key={index} style={{margin: '10px 0'}}>{service}</div>
              ))}
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
                            <ProfileName style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                                {currentProfile.name}
                            </ProfileName>
                            <HeaderActions>
                                <NavIcon 
                                    icon="heart" 
                                    src={isLiked ? "/icons/heart-white.svg" : "/icons/heart.svg"} 
                                    active={isLiked}
                                    onClick={handleLikeToggle}
                                    style={{
                                        backgroundColor: isLiked ? '#FF4D4F' : 'rgba(0, 0, 0, 0.3)',
                                        border: isLiked ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                                        width: '32px',
                                        height: '32px'
                                    }}
                                />
                                <NavIcon 
                                    icon="bell" 
                                    src={isNotified ? "/icons/bell-white.svg" : "/icons/bell.svg"} 
                                    active={isNotified}
                                    onClick={handleNotificationToggle}
                                    style={{
                                        backgroundColor: isNotified ? '#FF4D4F' : 'rgba(0, 0, 0, 0.3)',
                                        border: isNotified ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                                        width: '32px',
                                        height: '32px'
                                    }}
                                />
                            </HeaderActions>
                        </ProfileInfo>
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

                <ProfileStats style={{ borderColor: 'white' }}>
                    <StatItem style={{ borderColor: 'white' }}>
                        <StatValue>{currentProfile.stats?.posts || currentProfile.posts}</StatValue>
                        <StatLabel>posts</StatLabel>
                    </StatItem>
                    <StatItem style={{ borderColor: 'white' }}>
                        <StatValue>{currentProfile.stats?.videos || currentProfile.videos}</StatValue>
                        <StatLabel>videos</StatLabel>
                    </StatItem>
                    <StatItem style={{ borderColor: 'white' }}>
                        <StatValue>{currentProfile.stats?.likes || currentProfile.likes}</StatValue>
                        <StatLabel>likes</StatLabel>
                    </StatItem>
                    <StatItem style={{ borderColor: 'white' }}>
                        <StatValue>{currentProfile.stats?.comments || currentProfile.comments}</StatValue>
                        <StatLabel>comments</StatLabel>
                    </StatItem>
                </ProfileStats>

                <ActionButtons>
                    <FollowButton 
                        outlineGradient={!isFollowing}
                        color={isFollowing ? 'white' : undefined}
                        onClick={handleFollowToggle}
                        disabled={!user?.email}
                    >
                        {isFollowing ? 'Followed' : 'Follow'}
                    </FollowButton>
                    
                    {/* Always show WhatsApp button, but handle the case when no number is available */}
                    <WhatsappButton 
                        outlineGradient
                        onClick={() => {
                            const whatsappNumber = currentProfile.whatsapp || currentProfile.phone;
                            if (whatsappNumber) {
                                // Format the number properly for WhatsApp
                                const formattedNumber = whatsappNumber.replace(/\D/g, '');
                                window.open(`https://wa.me/${formattedNumber}`);
                            } else {
                                // Show a message if no WhatsApp number is available
                                toast.info('No WhatsApp number available');
                            }
                        }}
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