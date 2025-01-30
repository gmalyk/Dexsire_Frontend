import React from 'react'
import AboutMe from '../AboutMe'
import Accordion from 'components/Accordion'
import Photos from '../Photos'
import Videos from '../Videos'
import EscortServices from 'components/EscortServices'
import { ButtonContainer } from 'ui/styled'
import Button from 'components/Form/Button'

export default function AdvertsDetails({ onSave }) {
  return (
    <>
      <Accordion title={'About me'} noBorder>
        <AboutMe noPadding />
      </Accordion>
      <Accordion title={'Photo gallery'}>
        <Photos />
      </Accordion>
      <Accordion title={'Video gallery'}>
        <Videos />
      </Accordion>
      <Accordion title={'Services'}>
        <EscortServices noContact noteEditing />
      </Accordion>
      <ButtonContainer end>
        <Button rightIcon={'chevron-right'} onClick={() => onSave(null)}
          outlineGradient width={'fit-contents'}>Save editions</Button>
      </ButtonContainer>
    </>
  )
}
