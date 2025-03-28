import styledCmp from 'styled-components';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

export const MaterialSelect = styled(Select)(({ theme, ...props }) => ({
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'white',
  },
  [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'white',
  },
  [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'white',
  },
  [`& .MuiSelect-icon`]: {
    color: theme.palette.white.main,
  },
  // Add disabled styles
  '&.Mui-disabled': {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
    
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    
    '& .MuiSelect-icon': {
      opacity: 0.5,
    },

    // Prevent hover effects when disabled
    '&:hover': {
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  borderRadius: 100,
  color: theme.palette.white.main,
  paddingLeft: props.formed ? 32 : 0,
  fontSize: '16px', // Minimum font size to prevent iOS zoom
  '-webkit-text-size-adjust': '100%',
  // Add these styles to prevent zoom
  '& .MuiSelect-select:focus': {
    fontSize: '16px',
  },
}));

export const MaterialLabel = styled(InputLabel)(({ theme, ...props }) => ({
  color: theme.palette.white.main,
  padding: '0 32px',
  
  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
}));