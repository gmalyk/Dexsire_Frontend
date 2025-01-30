import React from 'react'
import { EscortProfileHeaderContainer } from './styled'
import ProfileImgPreview from 'components/Profile/ProfileImgPreview'
import InfoProfileHeader from '../InfoProfileHeader'

export default function EscortProfileHeader({ profile, reload }) {
  return (
    <>
      <EscortProfileHeaderContainer>
        <ProfileImgPreview profile={profile} reload={reload} />
        <InfoProfileHeader profile={profile} reload={reload} />
      </EscortProfileHeaderContainer>
    </>
  )
}
