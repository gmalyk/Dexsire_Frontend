import React from 'react'
import { InfoDataContainer, InfoDataContent, InfoDataItem, InfoTitle, NextIcon } from './styled'

export default function InfoData({ data, active }) {

  return (
    <>
      <InfoDataContainer>
        {data?.map((m, k) => {
          return (
            <>
              <InfoDataItem>
                <InfoDataContent key={k} active={m?.title === active}>
                  0{k + 1}
                </InfoDataContent>
                <InfoTitle active={m?.title === active}>
                  {m?.title}
                </InfoTitle>
              </InfoDataItem>
              {data?.length === k + 1 ? null : <NextIcon icon="play" />}
            </>
          )
        })}
      </InfoDataContainer>
    </>
  )
}
