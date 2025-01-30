import React, { useEffect, useState } from 'react'
import { UserInfoContainer, UserInfoText, UserInfoValue, UserInfoValueMasked } from './styled'

export default function UserInfo({ text, value, medium, isEditing, noEdit, formValue, changeForm, mask, type }) {

  return (
    <UserInfoContainer>
      <UserInfoText>{text}</UserInfoText>
      {
        mask ? 
        <UserInfoValueMasked
          id={`focus-${text}`}
          medium={medium}
          mask={mask}
          noHolder
          value={ !isEditing || noEdit ? value : formValue(text)}
          onChange={(e) => changeForm(e.target.value, text)}
          disabled={!isEditing || noEdit}
        /> : 
        <UserInfoValue
          id={`focus-${text}`}
          medium={medium}
          type={type}
          value={ !isEditing || noEdit ? value : formValue(text)}
          onChange={(e) => changeForm(e.target.value, text)}
          disabled={!isEditing || noEdit}
        />
      }
    </UserInfoContainer>
  )
}
