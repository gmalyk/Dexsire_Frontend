import React from 'react'
import { InfoDataContainer, InfoDataContent, InfoDataItem, InfoTitle, NextIcon } from './styled'
import { Icon } from 'ui/styled'

export default function InfoData({ data, active }) {
  return (
    <>
      <InfoDataContainer>
        {data?.map((m, k) => {
          return (
            <React.Fragment key={k}>
              <InfoDataItem>
                <InfoDataContent active={m?.title === active}>
                  0{k + 1}
                </InfoDataContent>
                <InfoTitle active={m?.title === active}>
                  {m?.title}
                </InfoTitle>
              </InfoDataItem>
              {data?.length === k + 1 ? null : <NextIcon icon="play" />}
            </React.Fragment>
          )
        })}
      </InfoDataContainer>
    </>
  )
}
