import React, { useContext, useEffect, useState } from 'react'
import { EscortsCardContainer, EscortsContainer, EscortsTitle } from './styled'
import EscortsCard from 'components/Cards/EscortsCard';
import Button from 'components/Form/Button';
import { Read } from 'services/core';
import { normalizeStrapiList, normalizeStrapiRegister, parseStrapiImage } from 'utils';
import { CoreContext } from 'context/CoreContext';
import moment from 'moment';
import useI18n from 'hooks/useI18n';

export default function Escorts() {
  
  const { filter, user, escorts, setEscorts } = useContext(CoreContext)

  const { t } = useI18n()
  
  const [page, setPage] = useState(1) 

  const sortBoost = (a,b) => {
    if(a?.boost?.spended && b?.boost?.spended){ 
      // sort by updatedAt
      return ((new Date(b?.boost?.updatedAt).getTime()) - (new Date(a?.boost?.updatedAt).getTime()));
      return 0
    }
    if(a?.boost?.spended){ return -1 ;}
    if(b?.boost?.spended){ return 1 ;}
    return 0
  }

  const init = async () => {
      const result = await Read(`models?filters[approved][$eq]=true&filters[user][id][$not][$null]=true`)
      const normalresult = normalizeStrapiList(result).map(m => ({ 
        ...m, 
        photos: normalizeStrapiList(m?.photos),
        user: normalizeStrapiRegister(m?.user),
        region: normalizeStrapiRegister(m?.region),
        boost: normalizeStrapiRegister(m?.boost),
        city: m?.city ? normalizeStrapiRegister(m?.city) : null,
      }))


      console.log("normalresult", normalresult)

      const next = normalresult?.filter(f => f?.user?.name)?.sort(sortBoost)?.map(m => ({
        name: m?.user?.name,
        emphasis: !!m?.boost?.spended,
        location: {
          city: m?.city?.title,
          state: m?.region?.title
        },
        urls: m?.photos?.map(m => parseStrapiImage(m?.url)),
        verified: m?.verified,
        profile: {
          id: m?.id,
          age: m?.age,
          posts: m?.posts,
          videos: m?.videos,
          likes: m?.likes,
          comments: m?.comments,
          ...m  // Include other profile data
        }
      }))


      console.log("setEscorts", next)

      setEscorts(next)
  }

  const filterFilter = item => { 
    return (
      (!filter?.price || item?.profile?.prices?.map(m => m?.text)?.includes(filter?.price) ) 
      
      && (!filter?.age || `${moment(item?.profile?.birthdate)?.fromNow()?.replace("ago", "")}` === `${filter?.age}` ) 
      && (!filter?.reviews || `${Math.round(item?.profile?.rate)}` === `${filter?.reviews}` ) 

      && (!filter?.nationality || `${item?.profile?.nationality}` === `${filter?.nationality}` ) 
      && (!filter?.languages || `${item?.profile?.language}` === `${filter?.languages}` ) 
      && (!filter?.appearance || `${item?.profile?.hair}` === `${filter?.appearance}` ) 
      && (!filter?.category || `${item?.profile?.category}` === `${filter?.category}` ) 

      && (!filter?.city || `${item?.profile?.city?.id}` === `${filter?.city}`) 
      && (!filter?.region || `${item?.profile?.region?.id}` === `${filter?.region}`) 
      && (!filter?.service || item?.profile?.services?.data?.map(m => `${m?.id}`)?.includes(`${filter?.service}`) ) 
    )
  }

  useEffect(() => { init() ;}, [])

  return (
    <>
      <EscortsContainer>
        <EscortsTitle>
          { t("discover_some_models_available_to_you") }
        </EscortsTitle>
        <EscortsCardContainer>
          {
            escorts?.filter(filterFilter)?.slice(0, ((page)*6)).map((m, k) => (
              <EscortsCard
                {...m}
                key={k}
                user={user}
                reload={init}
              />
            ))
          }
        </EscortsCardContainer>
        {
          !(escorts?.filter(filterFilter)?.length > ((page)*6)) ? null :
            <Button outlineGradient width={'179px'} nospace onClick={() => setPage(page + 1)}>
              { t("load_more") }
            </Button>
        }
      </EscortsContainer>
    </>
  )
}
