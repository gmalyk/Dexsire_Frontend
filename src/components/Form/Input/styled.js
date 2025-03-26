import styledCmp from 'styled-components'

import { styled as muiStyled } from '@mui/material/styles';
import Input from '@mui/material/Input'; // standard (material)
// import Input from '@mui/material/FilledInput';
import InputOutline from '@mui/material/OutlinedInput';

export const StyledTextArea = styledCmp.textarea`
  width: 100%;
  height: 176px;
  background: ${props => props.theme.palette.primary.main};
  border-radius: 40px;
  padding: 24px 32px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  font-family: Inter;
  color: ${props => props.theme.palette.colors.white};
  border: 1px solid white;
  resize: none;
  
  &:focus {
    outline: none;
  }
`;

export const FloatingLabelContainer = styledCmp.div`
  position: relative;
  width: 100%;
`;

export const FloatingLabel = styledCmp.label`
  position: absolute;
  left: ${props => props.active ? '12px' : props.hasStartIcon ? '56px' : '32px'};
  top: ${props => props.active || props.textarea ? '-8px' : '50%'};
  transform: ${props => props.active || props.textarea ? 'translateY(0)' : 'translateY(-50%)'};
  background: ${props => props.active ? props.theme.palette.primary.main : 'transparent'};
  padding: ${props => props.active ? '0 8px' : '0'};
  font-size: ${props => props.active ? '12px' : '16px'};
  color: ${props => props.focused ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  z-index: 1;
`;

export const MaterialInput = muiStyled(Input)(({ theme, registration, ...props }) => ({
  background: theme.palette.primary.main,
  height: props.textarea ? '176px' : '56px',
  borderRadius: props.textarea ? '40px' : '100px',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  fontFamily: 'Inter',
  padding: props.textarea ? '24px 16px ' : '0 32px',
  borderColor: 'white',
  border: '1px solid white',
  '-webkit-text-size-adjust': '100%',

  '&:before': {
    display: 'none',
  },
  '&:after': {
    display: 'none',
  },

  '& .MuiInputBase-input': {
    color: theme.palette.primary.contrastText,
    padding: '0 32px 0 0px',
    ...(props.textarea && {
      alignItems: 'flex-start',
      paddingTop: '16px',
      height: '100%',
      verticalAlign: 'top',
    }),
    '&::placeholder': {
      color: 'transparent',
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

  '& .MuiInputAdornment-positionStart': {
    marginLeft: '16px',
    marginRight: '16px',
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
    '&::-webkit-credentials-auto-fill-button, &::-webkit-contacts-auto-fill-button, &::-webkit-strong-password-auto-fill-button, &::-webkit-caps-lock-indicator': {
      display: 'none !important',
      visibility: 'hidden !important',
      position: 'absolute !important',
      right: '0 !important',
      pointerEvents: 'none !important',
      opacity: '0 !important',
      width: '0 !important',
      height: '0 !important',
      margin: '0 !important',
      padding: '0 !important',
      border: 'none !important',
      appearance: 'none !important',
      background: 'transparent !important',
    },
    
    '&::-webkit-credentials-auto-fill-button:hover, &::-webkit-contacts-auto-fill-button:hover, &::-webkit-strong-password-auto-fill-button:hover': {
      display: 'none !important',
      visibility: 'hidden !important',
      pointerEvents: 'none !important',
      opacity: '0 !important',
    },
    
    '-webkit-text-security': props.type === 'text' ? 'none' : 'disc',
    'font-family': '-apple-system !important',
    '-webkit-appearance': 'none',
    'appearance': 'none',
    
    '-webkit-user-modify': 'read-write-plaintext-only',
  },

  '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
    '-webkit-box-shadow': '0 0 0 30px #000 inset !important',
    '-webkit-text-fill-color': `${theme.palette.primary.contrastText} !important`,
    'transition': 'background-color 5000s ease-in-out 0s',
    'caret-color': `${theme.palette.primary.contrastText} !important`,
  }
}));


export const MaterialInputOutline = muiStyled(InputOutline)(({ theme, registration, ...props }) => ({
  height: props.textarea ? '176px' : '56px',
  borderRadius: props.textarea ? '40px' : '100px',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  fontFamily: 'Inter',
  padding:  props.spaced ?  '24px 46px' : props.textarea ? '24px 16px ' : '0 32px',
  alignItems: props.textarea ? 'flex-start ' : 'center',
  background: 'transparent',
  borderColor: 'white',
  color: theme.palette.primary.contrastText,
  resize: 'none',
  '-webkit-text-size-adjust': '100%',

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
    borderWidth: '1px',
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
    borderWidth: '1px',
  },

  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { 
    borderColor: 'rgba(255, 255, 255, 0.5)',
    color: theme.palette.white.main,
  },


  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
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

  '& .MuiInputAdornment-positionStart': {
    marginLeft: '16px',
    marginRight: '16px',
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
    '&::-webkit-credentials-auto-fill-button, &::-webkit-contacts-auto-fill-button, &::-webkit-strong-password-auto-fill-button, &::-webkit-caps-lock-indicator': {
      display: 'none !important',
      visibility: 'hidden !important',
      position: 'absolute !important',
      right: '0 !important',
      pointerEvents: 'none !important',
      opacity: '0 !important',
      width: '0 !important',
      height: '0 !important',
      margin: '0 !important',
      padding: '0 !important',
      border: 'none !important',
      appearance: 'none !important',
      background: 'transparent !important',
    },
    
    '&::-webkit-credentials-auto-fill-button:hover, &::-webkit-contacts-auto-fill-button:hover, &::-webkit-strong-password-auto-fill-button:hover': {
      display: 'none !important',
      visibility: 'hidden !important',
      pointerEvents: 'none !important',
      opacity: '0 !important',
    },
    
    '-webkit-text-security': props.type === 'text' ? 'none' : 'disc',
    'font-family': '-apple-system !important',
    '-webkit-appearance': 'none',
    'appearance': 'none',
    
    '-webkit-user-modify': 'read-write-plaintext-only',
  },

  '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
    '-webkit-box-shadow': '0 0 0 30px #000 inset !important',
    '-webkit-text-fill-color': `${theme.palette.primary.contrastText} !important`,
    'transition': 'background-color 5000s ease-in-out 0s',
    'caret-color': `${theme.palette.primary.contrastText} !important`,
  }
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

// Update the input styling to have white borders for registration forms
export const InputContainer = styledCmp.div`
  position: relative;
  width: 100%;
  
  // Add a class for registration inputs with white borders
  &.registration-input {
    input {
      border-color: white !important;
    }
  }
`;

export const StyledInput = styledCmp.input`
  width: 100%;
  height: 51px;
  background: transparent;
  border: 1px solid ${props => props.outline ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 100px;
  padding: ${props => props.startIcon ? '0 24px 0 48px' : props.endIcon ? '0 48px 0 24px' : '0 24px'};
  color: ${props => props.theme.palette.colors.white};
  font-size: 16px;
  
  // Add specific styling for registration inputs
  .registration-form & {
    border-color: white;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: white;
  }
`;