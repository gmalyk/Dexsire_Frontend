import React, { useContext, useEffect, useMemo, useState, useRef } from 'react'
import { ButtonContainer, ButtonNextAndPrev, CardBorderBackground, CardContainer, CardHeaderContent, CardLogo, CardTitle, Content, Decoration, EndContent, EscortsInfoEmphasis, HalfContent, IconContent, IconsContainer } from './styled'
import { Icon, Load } from 'ui/styled'
import Button from 'components/Form/Button';
import { Create, Delete, Read } from 'services/core';
import { normalizeStrapiList } from 'utils';
import { useHistory } from 'react-router-dom';
import { CoreContext } from 'context/CoreContext';

export default function EscortsCard({ emphasis, urls, name, location, verified, reload, profile, user }) {

  const history = useHistory(); 
  const { setModal } = useContext(CoreContext);
  const cardRef = useRef();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [likeing, setLikeing] = useState(false)
  const [isLike, setIsLike] = useState(null)
  const [belling, setBelling] = useState(false)
  const [isBell, setIsBell] = useState(null)

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage(new Event('swipe'));
    }
    if (isRightSwipe) {
      prevImage(new Event('swipe'));
    }
  };

  const handleClick = () => {
    history.push({
      pathname: `/profile/escort/${profile.id}`,
      state: { profileData: profile }
    });
  }

  const handleLike = async () => {
    setLikeing(true)
    if(isLike){
      await Delete('likes', isLike?.id)
      setIsLike(null)
    } else {
      await Create('likes', { data: { user:user?.id, model: profile?.id } })
    }
    reload()
  }

  const handleBell = async () => {
    setBelling(true)
    if(isBell){
      await Delete('bells', isBell?.id)
      setIsLike(null)
    } else {
      await Create('bells', { data: { user:user?.id, model: profile?.id } })
    }
    reload()
  }

  const icons = [
    {
      icon: "heart",
      iconActive: "heart-active",
      action: handleLike
    },
    
    {
      icon: "bell",
      iconActive: "bell-active",
      action: handleBell
    }
  ]

  const nextImage = (e) => {
    e.preventDefault();
    if (currentImageIndex < urls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
    return false;
  };

  const prevImage = (e) => {
    e.preventDefault();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
    return false;
  };

  const checkLike = async () => {
    if(user?.id && profile?.id){
      const result = await Read(`likes?filters[user]=${user?.id}&filters[model]=${profile?.id}`)
      const normalResult = normalizeStrapiList(result)
      normalResult?.forEach(item => {
        if(item?.model?.data?.id === profile?.id && item?.user?.data?.id === user?.id){
          setIsLike(item)
        }
      })
    }
    setLikeing(false)
  }

  const checkBell = async () => {
    if(user?.id && profile?.id){
      const result = await Read(`bells?filters[user]=${user?.id}&filters[model]=${profile?.id}`)
      const normalResult = normalizeStrapiList(result)
      normalResult?.forEach(item => {
        if(item?.model?.data?.id === profile?.id && item?.user?.data?.id === user?.id){
          setIsBell(item)
        }
      })
    }
    setBelling(false)
  }

  useEffect(() => {
    checkLike()
    checkBell()
  }, [user, profile])

  const handleArrowClick = (e, direction) => {
    e.stopPropagation(); // Prevent card click event from firing
    e.preventDefault(); // Prevent default behavior
    
    if (direction === 'next' && currentImageIndex < urls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <>
      <CardBorderBackground emphasis={emphasis} onClick={handleClick}>
        <CardContainer
          ref={cardRef}
          src={urls?.[currentImageIndex]}
          emphasis={emphasis}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <CardHeaderContent>
            <Content>
              {!emphasis ? null : <EscortsInfoEmphasis>Emphasis</EscortsInfoEmphasis>}
            </Content>
            <IconsContainer className='cant-openmodel'>
              {icons.map((m, k) => (
                ((likeing && k === 0)||(belling && k === (icons?.length-1))) ? <Load /> :
                  <IconContent
                    key={k}
                    onClick={m.action}
                    active={((isLike && k === 0) || (isBell && k === (icons?.length-1) ))}
                  >
                    <Icon icon={((isLike && k === 0) || (isBell && k === (icons?.length-1) )) ? m?.iconActive : m?.icon} nomargin />
                  </IconContent>
              ))}
            </IconsContainer>
          </CardHeaderContent>
          <HalfContent className='cant-openmodel'>
            <ButtonNextAndPrev 
              onClick={(e) => handleArrowClick(e, 'prev')}
              position="left"
              style={{ opacity: currentImageIndex === 0 ? 0.5 : 1 }}
            >
              <Icon icon="arrow-left" nomargin />
            </ButtonNextAndPrev>
            <CardLogo>
              <img 
                src="/icons/logo.svg" 
                alt="Logo" 
                style={{ 
                  filter: 'invert(0.2)', 
                  opacity: 0.6, 
                  maxWidth: '120px', 
                  height: 'auto' 
                }} 
              />
            </CardLogo>
            <ButtonNextAndPrev 
              onClick={(e) => handleArrowClick(e, 'next')}
              position="right"
              style={{ opacity: currentImageIndex >= (urls?.length - 1) ? 0.5 : 1 }}
            >
              <Icon icon="arrow-right" nomargin />
            </ButtonNextAndPrev>
          </HalfContent>
          <EndContent>
            <CardTitle>
              {name}
              {!verified ? null :
                <IconContent active>
                  <Icon icon="verification" nomargin />
                </IconContent>
              }
            </CardTitle>
            <ButtonContainer>
              {!location.city ? null :
                <Button small outline width={"fit-content"} >
                  {location.city}
                </Button>
              }
              {!location.state ? null :
                <Button small outline width={"fit-content"}>
                  {location.state}
                </Button>
              }
            </ButtonContainer>
          </EndContent>
          <Decoration />
        </CardContainer>
      </CardBorderBackground>
    </>
  )
}