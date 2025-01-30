import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ButtonContainer, ButtonNextAndPrev, CardBorderBackground, CardContainer, CardHeaderContent, CardLogo, CardTitle, Content, Decoration, EndContent, EscortsInfoEmphasis, HalfContent, IconContent, IconsContainer } from './styled'
import { Icon, Load } from 'ui/styled'
import Button from 'components/Form/Button';
import { Create, Delete, Read } from 'services/core';
import { normalizeStrapiList } from 'utils';
import { useHistory } from 'react-router-dom';
import { CoreContext } from 'context/CoreContext';

export default function EscortsCard({ emphasis, urls, name, location, verified, reload, profile, user }) {

  const history = useHistory(); 
  const navigate = to => history.push(`/${ to }`); 
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setFilter } = useContext(CoreContext)

  const [likeing, setLikeing] = useState(false)
  const [isLike, setIsLike] = useState(null)
  const [belling, setBelling] = useState(false)
  const [isBell, setIsBell] = useState(null)

  const openModel = (e) => { 
    if(!e.target.closest('.cant-openmodel')){
      setFilter(null)
      navigate(`profile/escort/${ profile?.id || "" }`) 
    }
  }

  const icons = useMemo(() => {
    return [
      !user ? null : {
        icon: "heart",
        iconActive: "heart-white",
        action: () => handleLike()
      },
      !profile?.whatsapp ? null : {
        icon: "message",
        iconActive: "message-white",
        action: () => window.open(`https://wa.me/${profile?.whatsapp?.replace(/\ |\(|\)|\-/g,"")}`)
      },
      !user ? null : {
        icon: "bell",
        iconActive: "bell-white",
        action: () => handleBell()
      },
    ].filter(f => f)
  }, [user, profile, isLike, isBell])


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

  return (
    <>
      <CardBorderBackground emphasis={emphasis} onClick={openModel}>
        <CardContainer src={urls?.[currentImageIndex]} emphasis={emphasis}>
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
            <ButtonNextAndPrev onClick={prevImage}>
              <Icon icon="arrow-left" />
            </ButtonNextAndPrev>
            <CardLogo />
            <ButtonNextAndPrev onClick={nextImage}>
              <Icon icon="arrow-right" />
            </ButtonNextAndPrev>
          </HalfContent>
          <EndContent>
            <CardTitle>
              {name}

              {
                !verified ? null :
                <IconContent active>
                  <Icon icon="verification" nomargin />
                </IconContent>
              } 
              
            </CardTitle>
            <ButtonContainer>
              {
               !location.city ? null :
                <Button small outline width={"fit-content"} >
                  {location.city}
                </Button>
              }
              {
               !location.state ? null :
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