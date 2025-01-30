import React from "react";  
import PropTypes from 'prop-types';

import {   
    FlagImage,
    MaterialRating,
    RowRate
} from './styled' 


import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel'; 

import { ThemedComponent } from "ui/theme";

 
export const Rating = ({ value, onChange, label, secondary, image }) => {  
 
    return ( 
        <>   
            <ThemedComponent>
                <RowRate>
                    <FlagImage src={image} />
                    <FormGroup>
                        { label ? <FormLabel component="legend" style={{color:'white'}} >{ label }</FormLabel> : null }
                        <MaterialRating 
                            size="large"
                            value={value} 
                            onChange={(event, newValue) => { onChange(newValue) }} 
                            color={ secondary ? 'secondary' : 'black' } 
                        />
                    </FormGroup>
                </RowRate>
            </ThemedComponent>
 
        </>
    );
} 

Rating.propTypes = {  
    label: PropTypes.string.isRequired,  
    value: PropTypes.number, 
    secondary: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};


Rating.defaultProps = {
    label: '', 
    value: 0,  
    secondary: false, 
    onChange: undefined,
};

export default Rating;