import React from 'react'
import { Option, OptionsContainer } from './styled'
import { Icon } from 'ui/styled';

export default function ProfileOptions({ active, iconArray, handleActive }) {

  const handleClick = (icon) => {
    handleActive(icon)
  }
  return (
    <>
      <OptionsContainer>
        {iconArray?.map((icon, k) => (
          <Option key={k} active={icon?.icon === active}
            onClick={() => handleClick(icon?.icon)}
          >
            <Icon icon={
              icon?.icon === active ? icon?.iconActive : icon?.icon
            } />
          </Option>
        ))}
      </OptionsContainer>
    </>
  )
}
