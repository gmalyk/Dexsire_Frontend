import React, { useContext, useEffect, useMemo, useState } from 'react'

import { useHistory } from 'react-router-dom';

import AdvertsCard from 'components/Cards/AdvertsCard';
import { AdvertsCardContainer, AdvertsCardContent } from './styled';
import DashboardCard from 'components/Cards/DashboardCard';
import AdvertsDetails from '../AdvertsDetails';
import { CoreContext } from 'context/CoreContext';
import { exposeStrapiError, parseStrapiImage } from 'utils';
import { Create, Delete } from 'services/core';
import { toast } from 'react-toastify';

export default function Adverts() {
  const [adId, setAdId] = useState(null);

  const history = useHistory(); 
  const navigate = to => history.push(`/${ to }`); 
  
  const { user, reloadMe } = useContext(CoreContext)

  const [loading, setLoading] = useState(false)

  const escort = useMemo(() => ({
    id: 1,
    name: user?.name,
    emphasis: true,
    location: {
      city: user?.model?.city?.title,
      state: user?.model?.region?.title
    },
    urls: user?.model?.photos?.map(m => m?.url ? parseStrapiImage(m?.url) : null)?.filter(f => f)
  }), [user]) 

  const dashboardData = useMemo(() => {

    const boosted = user?.boost

    const playButton = {
      title: 'Ad status'
    }

    const pauseButton = {
      icon: 'megaphone',
      title: 'Do you want to pause this ad?',
      subtitle: 'When you pause an ad, its credits are also paused.',
    }

    return [
      boosted ? {
        ...playButton,
        icon: 'check-success',
        subtitle: 'Active'
      } : {
        ...playButton,
        icon: 'check',
        subtitle: 'Inactive',
        buttonText: 'Start ad',
        buttonAction: () => startAd(),
      },
      !boosted ? {
        ...pauseButton
      } : {
        ...pauseButton,
        buttonText: 'Pause ad',
        buttonAction: () => pauseAd(),
      }
    ];
  }, [ user, loading ]);

  const startAd = async () => {
    if(loading) return;
    setLoading(true)

    const payload = {
      user: user?.id,
      model: user?.model?.id,
      spended: 1
    }

    const result = await Create('boosts', {
      data: { ...payload }
    })

    if(result && !exposeStrapiError(result)){
      await reloadMe()
      toast.success("Ad started successfully")
    }

    setLoading(false)

  }

  const pauseAd = async () => {
    if(loading) return;
    setLoading(true)

    const result = await Delete('boosts', user?.boost?.id)

    if(result && !exposeStrapiError(result)){
      await reloadMe()
      toast.success("Ad paused successfully")
    }

    setLoading(false)

  }

  const handleAdClick = (id) => {
     navigate('admin/escort/about-me')
    // setAdId(id);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [adId])

  return (
    <>
      <AdvertsCardContainer>
        {adId ? null :
          <>
            <AdvertsCard escort={escort} handleAdClick={handleAdClick} />
            <AdvertsCardContent>
              {dashboardData?.map((item, index) => (
                <DashboardCard
                  key={index}
                  full
                  {...item}
                />
              ))}
            </AdvertsCardContent>
          </>
        }
        {
          !adId ? null : <AdvertsDetails onSave={handleAdClick} />
        }
      </AdvertsCardContainer>
    </>
  )
}