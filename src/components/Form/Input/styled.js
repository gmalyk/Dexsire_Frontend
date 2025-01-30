import styledCmp from 'styled-components'

import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input'; // standard (material)
// import Input from '@mui/material/FilledInput';
import InputOutline from '@mui/material/OutlinedInput';


export const MaterialInput = styled(Input)(({ theme, ...props }) => ({
  background: theme.palette.primary.main,
  height: props.textarea ? '176px' : '56px',
  borderRadius: props.textarea ? '40px' : '100px',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  fontFamily: 'Inter',
  padding: props.textarea ? '24px 16px ' : props.noHolder ? '0' : '0 32px',
  borderColor: theme.palette.borderBackground.main,

  '& .MuiInputBase-input': {
    color: theme.palette.primary.contrastText,
  },

  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.primary.contrastText,
    opacity: 1,
  },

}));


export const MaterialInputOutline = styled(InputOutline)(({ theme, ...props }) => ({
  height: props.textarea ? '176px' : '56px',
  borderRadius: props.textarea ? '40px' : '100px',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  fontFamily: 'Inter',
  padding:  props.spaced ?  '24px 46px' : props.textarea ? '24px 16px ' : '0 32px',
  alignItems: props.textarea ? 'flex-start ' : 'center',
  background: 'transparent',
  borderColor: theme.palette.borderBackground.main,
  color: theme.palette.primary.contrastText,
  resize: 'none',

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.borderBackground.main,
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.borderBackground.main,
  },

  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { 
    borderColor: theme.palette.borderBackground.main,
    color: theme.palette.white.main,
  },


  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.borderBackground.main,
  },

  '& .MuiInputBase-input': {
    color: theme.palette.white.main,
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.white.main,
    opacity: 1,
  },

}));


export const InputIcon = styledCmp.img.attrs({
})`
`;