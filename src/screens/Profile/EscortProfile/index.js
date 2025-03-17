import ContainerAuthenticated from 'containers/Authenticated'
import React, { useState, useContext, useEffect } from 'react'
import { Background, BodyContainer, BodyContent, EditContainer } from './styled'
import Footer from 'components/Footer'
import Button from 'components/Form/Button'
import useI18n from 'hooks/useI18n'
import { Container } from 'reactstrap'
import { Icon } from 'ui/styled'
import { CoreContext } from 'context/CoreContext'
import { ReadOne } from 'services/core'
import { toast } from 'react-toastify'
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
    LoadingContainer
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
  const { user, model } = useContext(CoreContext)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
  
  // Add state to track active navigation tab
  const [activeTab, setActiveTab] = useState('photos')

  // Add this state to track following status
  const [isFollowing, setIsFollowing] = useState(false)

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        // If we have a model ID from context, use it
        if (model?.id) {
          const response = await ReadOne('models', model.id)
          if (response && response.data) {
            setUserProfile(response.data)
          }
        } else if (id) {
          // If we have an ID from params, use it
          const response = await ReadOne('models', id)
          if (response && response.data) {
            setUserProfile(response.data)
          }
        } else if (profileData) {
          // If we have profile data from location state, use it
          setUserProfile(profileData)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast.error(t('error_loading_profile'))
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [model, id, profileData])

  // Prepare profile data with fallbacks
  const currentProfile = userProfile || {
    id: user?.id || 1,
    name: user?.name || "Guest User",
    age: user?.age || 25,
    location: {
      city: user?.city || "Unknown",
      state: user?.region || "Unknown"
    },
    description: user?.description || user?.about_me || "No description available",
    images: user?.photos?.map(photo => parseStrapiImage(photo)) || ["/images/profile.png"],
    services: user?.services || [],
    prices: user?.prices || [],
    phone: user?.phone || user?.telegram || "",
    whatsapp: user?.whatsapp || "",
    verified: user?.verified || false,
    posts: user?.posts?.length || 0,
    videos: user?.videos?.length || 0,
    likes: user?.likes || 0,
    comments: user?.comments || 0
  }

  const handleEdit = () => setIsEditing(true)
  const handleSave = () => {
    setIsEditing(false)
  }
  const handlePhotoClick = (index) => {
    console.log(`Photo clicked: ${index}`)
  }

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
    setIsFollowing(!isFollowing)
    // Here you would typically make an API call to update the follow status
  }

  // Add this after the handleTabClick function
  const renderTabContent = () => {
    switch(activeTab) {
      case 'photos':
        return (
          <PhotoGallery>
            <GalleryTitle>{t('photo_gallery')}</GalleryTitle>
            <GalleryGrid>
              {currentProfile.images && currentProfile.images.length > 1 ? 
                currentProfile.images.slice(1).map((photo, index) => (
                  <GalleryItem key={index} onClick={() => handlePhotoClick(index)}>
                    <img src={photo} alt="" />
                  </GalleryItem>
                )) : 
                <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
                  {t('no_photos_available')}
                </div>
              }
            </GalleryGrid>
          </PhotoGallery>
        );
      case 'profile':
        return (
          <div>
            <GalleryTitle>{t('profile_information')}</GalleryTitle>
            <ProfileDescription>
              {currentProfile.description || t('no_description_available')}
            </ProfileDescription>
          </div>
        );
      case 'videos':
        return (
          <div>
            <GalleryTitle>{t('video_gallery')}</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
              {t('no_videos_available')}
            </div>
          </div>
        );
      case 'star':
        return (
          <div>
            <GalleryTitle>{t('customer_reviews')}</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
              {t('no_reviews_available')}
            </div>
          </div>
        );
      case 'hot':
        return (
          <div>
            <GalleryTitle>{t('services_offered')}</GalleryTitle>
            <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
              {currentProfile.services && currentProfile.services.length > 0 ? 
                currentProfile.services.map((service, index) => (
                  <div key={index}>{service.title || service}</div>
                )) : 
                t('no_services_available')
              }
            </div>
          </div>
        );
      default:
        return (
          <PhotoGallery>
            <GalleryTitle>{t('photo_gallery')}</GalleryTitle>
            <GalleryGrid>
              {currentProfile.images && currentProfile.images.length > 1 ? 
                currentProfile.images.slice(1).map((photo, index) => (
                  <GalleryItem key={index} onClick={() => handlePhotoClick(index)}>
                    <img src={photo} alt="" />
                  </GalleryItem>
                )) : 
                <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
                  {t('no_photos_available')}
                </div>
              }
            </GalleryGrid>
          </PhotoGallery>
        );
    }
  };

  if (loading) {
    return (
      <ContainerAuthenticated free>
        <LoadingContainer>
          <div>{t('loading_profile')}</div>
        </LoadingContainer>
      </ContainerAuthenticated>
    );
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
                        <ProfileAvatar 
                          src={currentProfile.images && currentProfile.images.length > 0 
                            ? currentProfile.images[0] 
                            : "/images/profile-placeholder.png"} 
                        />
                        <ProfileInfo>
                            <ProfileName>
                                {currentProfile.name && currentProfile.name.split(' ').length > 1 ? (
                                  <>
                                    <span>{currentProfile.name.split(' ')[0]}</span>
                                    <span>{currentProfile.name.split(' ').slice(1).join(' ')}</span>
                                  </>
                                ) : (
                                  <span>{currentProfile.name}</span>
                                )}
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
                            <label>{t('age')}</label>
                            <span>{currentProfile.age} {t('years')}</span>
                        </AgeDisplay>
                        <CityDisplay>
                            <label>{t('city_state')}</label>
                            <span>
                              {currentProfile.location.city || t('unknown')}/
                              {currentProfile.location.state || t('unknown')}
                            </span>
                        </CityDisplay>
                    </ProfileBottomRow>
                </ProfileHeader>

                <ProfileDescription>
                  {currentProfile.description || t('no_description_available')}
                </ProfileDescription>

                <ProfileStats>
                    <StatItem>
                        <StatValue>{currentProfile.posts}</StatValue>
                        <StatLabel>{t('posts')}</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.videos}</StatValue>
                        <StatLabel>{t('videos')}</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.likes}</StatValue>
                        <StatLabel>{t('likes')}</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>{currentProfile.comments}</StatValue>
                        <StatLabel>{t('comments')}</StatLabel>
                    </StatItem>
                </ProfileStats>

                <ActionButtons>
                    <FollowButton 
                        outlineGradient={!isFollowing}
                        color={isFollowing ? 'white' : undefined}
                        onClick={handleFollowToggle}
                    >
                        {isFollowing ? t('followed') : t('follow')}
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
                                toast.info(t('no_whatsapp_number_available'));
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