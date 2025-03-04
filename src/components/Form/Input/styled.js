import styledCmp from 'styled-components'

import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input'; // standard (material)
// import Input from '@mui/material/FilledInput';
import InputOutline from '@mui/material/OutlinedInput';


export const MaterialInput = styled(Input)(({ theme, ...props }) => ({
  background: theme.palette.primary.main,
  height: props.textarea ? '176px' : '56px',
  borderRadius: props.textarea ? '40px' : '100px',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  fontFamily: 'Inter',
  padding: props.textarea ? '24px 16px ' : props.noHolder ? '0' : '0 32px',
  borderColor: theme.palette.borderBackground.main,
  '-webkit-text-size-adjust': '100%',

  '& .MuiInputBase-input': {
    color: theme.palette.primary.contrastText,
    '&::placeholder': {
      color: theme.palette.primary.contrastText,
      opacity: 1,
    }
  },

  '& .MuiInputAdornment-root': {
    marginRight: '12px',
    marginLeft: '32px',
    color: theme.palette.primary.contrastText,
    position: 'relative',
    zIndex: 9999,
    pointerEvents: 'all'
  },

  '& .MuiIconButton-root': {
    color: theme.palette.primary.contrastText,
    position: 'relative',
    zIndex: 9999,
    pointerEvents: 'all',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },

  '&:focus': {
    fontSize: '16px',
  },

  '&[type="password"]': {
    '&::-webkit-credentials-auto-fill-button': {
      display: 'none !important',
      visibility: 'hidden !important',
      position: 'absolute !important',
      right: '0 !important'
    },
    '&::-webkit-contacts-auto-fill-button': {
      display: 'none !important',
      visibility: 'hidden !important'
    },
    '&::-webkit-strong-password-auto-fill-button': {
      display: 'none !important',
      visibility: 'hidden !important'
    },
    '-webkit-text-security': props.type === 'text' ? 'none' : 'disc',
    'font-family': '-apple-system !important',
    '-webkit-appearance': 'none',
    'appearance': 'none'
  },

  '&:-webkit-autofill': {
    '-webkit-box-shadow': '0 0 0 30px #000 inset !important',
    '-webkit-text-fill-color': `${theme.palette.primary.contrastText} !important`,
    'transition': 'background-color 5000s ease-in-out 0s'
  }
}));


export const MaterialInputOutline = styled(InputOutline)(({ theme, ...props }) => ({
  height: props.textarea ? '176px' : '56px',
  borderRadius: props.textarea ? '40px' : '100px',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  fontFamily: 'Inter',
  padding:  props.spaced ?  '24px 46px' : props.textarea ? '24px 16px ' : '0 32px',
  alignItems: props.textarea ? 'flex-start ' : 'center',
  background: 'transparent',
  borderColor: theme.palette.borderBackground.main,
  color: theme.palette.primary.contrastText,
  resize: 'none',
  '-webkit-text-size-adjust': '100%',

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
    '&::placeholder': {
      color: theme.palette.white.main,
      opacity: 1,
    }
  },

  '& .MuiInputAdornment-root': {
    marginRight: '12px',
    marginLeft: '32px',
    color: theme.palette.white.main,
    position: 'relative',
    zIndex: 9999,
    pointerEvents: 'all'
  },

  '& .MuiIconButton-root': {
    color: theme.palette.white.main,
    position: 'relative',
    zIndex: 9999,
    pointerEvents: 'all',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },

  '&:focus': {
    fontSize: '16px',
  },

  '&[type="password"]': {
    '&::-webkit-credentials-auto-fill-button': {
      display: 'none !important',
      visibility: 'hidden !important',
      pointerEvents: 'none !important',
      position: 'absolute !important',
      right: '0 !important'
    },
    '&::-webkit-contacts-auto-fill-button': {
      display: 'none !important',
      visibility: 'hidden !important',
      pointerEvents: 'none !important'
    },
    '&::-webkit-strong-password-auto-fill-button': {
      display: 'none !important',
      visibility: 'hidden !important',
      pointerEvents: 'none !important'
    },
    '-webkit-text-security': props.type === 'text' ? 'none' : 'disc',
    'font-family': '-apple-system !important',
    '-webkit-appearance': 'none',
    'appearance': 'none'
  },
}));


export const InputIcon = styledCmp.img.attrs({
})`
`;

export const InputError = styledCmp.div`
    color: ${props => props.theme.palette.error.main || '#f44336'};
    font-size: 12px;
    margin-top: 4px;
    font-family: 'Inter', sans-serif;
`;