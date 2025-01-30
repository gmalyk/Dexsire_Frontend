import styledCmp from 'styled-components';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

export const MaterialSelect = styled(Select)(({ theme, ...props }) => ({
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: props.borderBackground ? theme.palette.borderBackground.main : theme.palette.white.main,
  },
  [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: props.borderBackground ? theme.palette.borderBackground.main : theme.palette.white.main,
  },
  [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: props.borderBackground ? theme.palette.borderBackground.main : theme.palette.white.main,
  },
  [`& .MuiSelect-icon`]: {
    color: theme.palette.white.main,
  },
  borderRadius: 100,
  color: theme.palette.white.main,
  paddingLeft: props.formed ? 32 : 0
}));
export const MaterialLabel = styled(InputLabel)(({ theme, ...props }) => ({
  color: theme.palette.white.main,
  padding: '0 32px',
}));