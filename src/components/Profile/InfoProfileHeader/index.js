import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Icon, Load, Title } from 'ui/styled'
import { EscortAboutHeader, EscortButtonsContainer, EscortFeedBackContainer, EscortInfo, EscortProfileFeedBack, FeedBackText, HeaderProfileContainer, IconContent, IconsContainer, InfoContent, InfoProfileContainer, InfoProfileText } from './styled';
import Button from 'components/Form/Button';
import { CoreContext } from 'context/CoreContext';
import { Create, Delete, Read } from 'services/core';
import { normalizeStrapiList } from 'utils';
import useTracker from 'hooks/useTracker';
import moment from 'moment';

import VerifiedIcon from '@mui/icons-material/Verified';
import useI18n from 'hooks/useI18n';

export default function InfoProfileHeader({ profile, reload }) {

  const { user } = useContext(CoreContext) 

  const { track } = useTracker(true)

  const { t } = useI18n()

  const [loading, setLoading] = useState(false)
  const [isFollow, setIsFollow] = useState(null)
  const [likeing, setLikeing] = useState(false)
  const [isLike, setIsLike] = useState(null)
  const [belling, setBelling] = useState(false)
  const [isBell, setIsBell] = useState(null)

  const openWhatsapp = async () => {
    await track("whatsapp", { profile })
    window.open(`https://wa.me/${profile?.whatsapp?.replace(/\ |\(|\)|\-/g,"")}`)
  }
 
  const icons = useMemo(() => {
    return [
      {
        icon: "heart",
        iconActive: "heart-white",
        action: () => handleLike()
      },
      !profile?.whatsapp ? null : {
        icon: "message",
        iconActive: "message-white",
        action: () => openWhatsapp()
      },
      {
        icon: "bell",
        iconActive: "bell-white",
        action: () => handleBell()
      },
    ].filter(f => f)
  }, [user, profile, isLike, isBell])

  const escortInfo = useMemo(() => [
    !profile?.birthdate ? null : { title: t("age"), value: `${ moment(profile?.birthdate)?.fromNow()?.replace("ago", "") }` },
    { title: t("city_state"), value: `${profile?.region?.title||""}${ profile?.city?.title && profile?.region?.title ? " / " : "" }${profile?.city?.title||""}` },
  ].filter( f => f ), [profile])

  const escortFeedBack = useMemo(() => [
    { title: t("posts"), value: [...(profile?.photos||[]), ...(profile?.videos||[])]?.length },
    { title: t("videos"), value: profile?.videos?.length || "0" },
    { title: t("likes"), value: profile?.likes?.length || "0" },
    { title: t("comments"), value: profile?.comments?.length || "0" },
  ], [profile])


  const handleFollow = async () => {
    setLoading(true)
    if(isFollow){
      await Delete('follows', isFollow?.id)
      setIsFollow(null)
    } else {
      await Create('follows', { data: { user:user?.id, model: profile?.id } })
    }
    await checkFollow()
  }

  const checkFollow = async () => {
    if(user?.id && profile?.id){
      const result = await Read(`follows?filters[user]=${user?.id}&filters[model]=${profile?.id}`)
      const normalResult = normalizeStrapiList(result)
      normalResult?.forEach(item => {
        if(item?.model?.data?.id === profile?.id && item?.user?.data?.id === user?.id){
          setIsFollow(item)
        }
      })
    }
    setLoading(false)
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
    checkFollow()
    checkLike()
    checkBell()
  }, [user, profile])

  return (
    <>
      <InfoProfileContainer>

        <HeaderProfileContainer>
          <Title small nomargin>
            { profile?.user?.name }
            { profile?.verified ? <VerifiedIcon color='lightBlue' style={{ width: 36, height: 36 }} /> : null }
          </Title>

          <IconsContainer>
            {icons.map((m, k) => (
                ((likeing && k === 0)||(belling && k === (icons?.length-1) )) ? <Load /> :
                  <IconContent
                    key={k}
                    onClick={m.action}
                    active={((isLike && k === 0) || (isBell && k === (icons?.length-1) ))}
                  >
                    <Icon icon={((isLike && k === 0) || (isBell && k === (icons?.length-1) )) ? m?.iconActive : m?.icon} nomargin />
                  </IconContent>
            ))}
          </IconsContainer>
        </HeaderProfileContainer>
        <EscortInfo>
          {
            escortInfo.map((m, k) => (
              <InfoContent key={k}>
                <InfoProfileText>
                  {m.title}
                </InfoProfileText>
                <InfoProfileText value>
                  {m.value}
                </InfoProfileText>
              </InfoContent>
            ))
          }
        </EscortInfo>
        <EscortAboutHeader>
          { profile?.description }
        </EscortAboutHeader>
        <EscortFeedBackContainer>
          {
            escortFeedBack.map((m, k) => (
              <EscortProfileFeedBack key={k}>
                <FeedBackText>
                  {m?.value}
                </FeedBackText>
                <FeedBackText text>
                  {m?.title}
                </FeedBackText>
              </EscortProfileFeedBack>
            ))
          }
        </EscortFeedBackContainer>
        <EscortButtonsContainer>
          <Button
            width={'fit-content'}
            small
            nospace
            loading={loading}
            outlineGradient={!isFollow}
            leftIcon={!isFollow ? null : 'checked'}
            onClick={handleFollow}
          >
            {isFollow ? t("follower") : t("unfollow") }
          </Button>
          {
            !profile?.whatsapp ? null :
              <Button nospace width={'fit-content'} small outlineGradient leftIcon={'whatsapp'} onClick={() => openWhatsapp()}>
                { t("admin_dashboard_aboutme_whats") }
              </Button>
          }
          {
            !profile?.telegram ? null :
              <Button nospace width={'auto'} small outlineGradient leftIcon={'sent'} onClick={() => window.open(`https://t.me/${profile?.telegram?.replace(/\ |\(|\)|\-/g,"")}`)}>
                { t("admin_dashboard_aboutme_telegram") }
              </Button>
          }
        </EscortButtonsContainer>
      </InfoProfileContainer>
    </>
  )
}
