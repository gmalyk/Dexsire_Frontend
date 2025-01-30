import styledCmp from 'styled-components'  
 
import { styled } from '@mui/material/styles'; 
 
import Rating from '@mui/material/Rating'; 
  
export const MaterialRating = styled(Rating)(({ theme }) => ({  
    '& .MuiRating-iconEmpty': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
})); 


export const FlagImage = styledCmp.img.attrs({})`
  width: 90px;
`

export const RowRate = styledCmp.div.attrs({})`
  display: flex;
  gap: 0 24px;
  align-items: center ;
`