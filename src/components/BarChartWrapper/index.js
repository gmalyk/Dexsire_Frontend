import React from 'react'
import { Option, WrapperContainer, WrapperHeaderContainer, WrapperHeaderTitleContainer, WrapperTitle, WrapperValue } from './styled'

export default function BarChartWrapper({ children, title, options, value, activeOption, onOptionClick, noBorder, noPadding, reverse }) {
  return (
    <>
      <WrapperContainer noBorder={noBorder} noPadding={noPadding}>
        <WrapperHeaderContainer reverse={reverse}>
          <WrapperHeaderTitleContainer >
            <WrapperTitle>{title}</WrapperTitle>
            {
              options?.map((item, index) => (
                <Option key={index}
                  active={activeOption?.value === item?.value}
                  onClick={() => onOptionClick(activeOption?.value === item?.value ? null : item)}
                >{item?.value}</Option>
              ))
            }
          </WrapperHeaderTitleContainer>
          <WrapperValue>{value}</WrapperValue>
        </WrapperHeaderContainer>
        {children}
      </WrapperContainer>
    </>
  )
}
