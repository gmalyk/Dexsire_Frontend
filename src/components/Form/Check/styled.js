import styledCmp from 'styled-components'

import { styled } from '@mui/material/styles';

import Checkbox from '@mui/material/Checkbox';

export const MaterialCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.colors.white,
  '& .MuiFormControlLabel-label.Mui-disabled':{
    color: theme.palette.colors.white,
    opacity: 1
  },
 
}));



export const CheckBox = styledCmp.div.attrs({
})`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  background: ${p => p.circle ? p.theme.palette.colors.lightBlue : p.theme.palette.colors.white};
  ${p => p.circle ? `
      width: 26px;
      height: 26px;
      border-radius: 50%;
      align-self: center;
    ` : ``};
`;
