import ContainerAuthenticated from 'containers/Authenticated'
import React, { useState,useEffect, useContext } from 'react'
import { Background, BodyContainer, BodyContent, EditContainer } from './styled'
import Footer from 'components/Footer'
import Button from 'components/Form/Button'
import useI18n from 'hooks/useI18n'
import { Read, ReadOne } from 'services/core'
import { exposeStrapiError, normalizeStrapiList, normalizeStrapiRegister } from 'utils'
import useTracker from 'hooks/useTracker' 
import { Container } from 'reactstrap'
import VerifiedIcon from '@mui/icons-material/Verified';
import { useMemo } from 'react';

import ProfileImgPreview from 'components/Profile/ProfileImgPreview'
import { Icon } from 'ui/styled'
import {
    ProfileContainer,
    ProfileHeader,
    ProfileAvatar,
    ProfileInfo as ProfileInfoStyled,
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
    LoadingContainer,
} from './styled'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { parseStrapiImage } from 'utils'
import { toast } from 'react-toastify'
import { CoreContext } from 'context/CoreContext'
import EscortInfo from 'components/EscortInfo'

// Définition des composants manquants
const PhotosGrid = ({ photos, onPhotoClick }) => (
  <PhotoGallery>
    <GalleryTitle>Photo gallery</GalleryTitle>
    <GalleryGrid>
      {photos.map((photo, index) => (
        <GalleryItem key={index} onClick={() => onPhotoClick(index)}>
          <img src={typeof photo === 'string' ? photo : photo.url} alt="" />
        </GalleryItem>
      ))}
    </GalleryGrid>
  </PhotoGallery>
);

const ProfileDetails = ({ profile, services }) => (
  <div>
    <GalleryTitle>Profile information</GalleryTitle>
    <ProfileDescription>
      {profile.description}
    </ProfileDescription>
  </div>
);

const VideosGrid = ({ videos }) => (
  <div>
    <GalleryTitle>Video gallery</GalleryTitle>
    {videos && videos.length > 0 ? (
      <GalleryGrid>
        {videos.map((video, index) => (
          <GalleryItem key={index}>
            <video controls>
              <source src={video.url} type={video.mime || 'video/mp4'} />
              Your browser does not support the video tag.
            </video>
          </GalleryItem>
        ))}
      </GalleryGrid>
    ) : (
      <div style={{padding: '20px', textAlign: 'center', color: 'white'}}>
        No videos available
      </div>
    )}
  </div>
);

export default function EscortProfile() {
  const { id } = useParams()
  const { user } = useContext(CoreContext)

  const { track } = useTracker(true)

  const [loading, setLoading] = useState(true)
  const [currentProfile, setCurrentProfile] = useState(null)
  const [allservices, setAllservices] = useState([])

  const init = async () => {
    const searchableId = id ? id : user?.model?.id
    
    setLoading(true)
    const result = await ReadOne("models", searchableId)
    setLoading(false)

    if(result && !exposeStrapiError(result)){
      const normalResult = normalizeStrapiRegister(result)
      const user = await ReadOne("users", normalResult?.user?.id)
      const normalUser = normalizeStrapiRegister(user)
      const nextResult = { ...normalResult, user: normalUser }
      // console.log("model", nextResult)
      setCurrentProfile(nextResult)

      track("click", { model: searchableId })
    }

    const rs = await Read("services")
    const nrs = normalizeStrapiList(rs)
    setAllservices(nrs)

  }

  useEffect(() => { init() ;}, [id, user])
  const { t } = useI18n()
  const history = useHistory()
  const navigate = (to) => history.push(`/${to}`)
  const [isEditing, setIsEditing] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const location = useLocation()
  const profileData = location.state?.profileData
  
  // Add state to track active navigation tab
  const [activeTab, setActiveTab] = useState('photos')

  // Add state to track following, liked, and notification status
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isNotified, setIsNotified] = useState(false)

  

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

  const escortFeedBack = useMemo(() => [
    { title: t("posts"), value: [...(currentProfile?.images||[]), ...(currentProfile?.videos||[])]?.length },
    { title: t("videos"), value: currentProfile?.videos?.length || "0" },
    { title: t("likes"), value: currentProfile?.likes?.length || "0" },
    { title: t("comments"), value: currentProfile?.comments?.length || "0" },
  ], [currentProfile])

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
    if (!currentProfile) {
      return <LoadingContainer>Chargement du profil...</LoadingContainer>;
    }
    
    switch (activeTab) {
      case 'photos':
        return <PhotosGrid photos={currentProfile.images || []} onPhotoClick={handlePhotoClick} />;
      case 'profile':
        return <ProfileDetails profile={currentProfile} services={allservices} />;
      case 'videos':
        return <VideosGrid videos={currentProfile.videos || []} />;
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
              {currentProfile.services && Array.isArray(currentProfile.services) ? currentProfile.services.map((service, index) => (
                <div key={index} style={{margin: '10px 0'}}>{typeof service === 'string' ? service : (service.name || JSON.stringify(service))}</div>
              )) : <div>No services listed</div>}
            </div>
          </div>
        );
      default:
        return <PhotosGrid photos={currentProfile.images || []} onPhotoClick={handlePhotoClick} />;
    }
  };

  return (
    <ContainerAuthenticated free>
      <BodyContainer>
        <Background />
        <BodyContent>
          <>
            {loading ? (
              <LoadingContainer>Chargement du profil...</LoadingContainer>
            ) : !currentProfile ? (
              <LoadingContainer>Profil non trouvé</LoadingContainer>
            ) : (
            <ProfileContainer>
                <ProfileHeader>
                    <ProfileTopRow>
                        <ProfileImgPreview profile={currentProfile} reload={init} />

                        <ProfileInfoStyled>
                            <ProfileName style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                              { currentProfile?.user?.name }
                              { currentProfile?.verified ? <VerifiedIcon color='lightBlue' style={{ width: 36, height: 36 }} /> : null }
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
                        </ProfileInfoStyled>
                    </ProfileTopRow>
                    
                    <ProfileBottomRow>
                        <AgeDisplay>
                            <label>Age</label>
                            <span>{currentProfile.age || "N/A"} years</span>
                        </AgeDisplay>
                        <CityDisplay>
                            <label>City State</label>
                            <span>{currentProfile.location?.city || "Unknown"}/{currentProfile.location?.state || "Unknown"}</span>
                        </CityDisplay>
                    </ProfileBottomRow>
                </ProfileHeader>

                <ProfileDescription>{currentProfile.description || "No description available"}</ProfileDescription>

                <ProfileStats style={{ borderColor: 'white' }}>
                    { escortFeedBack.map((item, index) => (
                        <StatItem key={index} style={{ borderColor: 'white' }}>
                            <StatValue>{item.value}</StatValue>
                            <StatLabel>{item.title}</StatLabel>
                        </StatItem>
                    ))}
                    
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

                <EscortInfo profile={currentProfile} allservices={allservices} />
            </ProfileContainer>
            )}
          </>
        </BodyContent>
      </BodyContainer>
      <Footer />
    </ContainerAuthenticated>
  )
}