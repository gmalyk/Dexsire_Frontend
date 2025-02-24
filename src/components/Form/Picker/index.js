import React, { useState } from 'react';
import { MaterialInput } from './styled';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { ThemedComponent } from "ui/theme";

export const Picker = (props) => {
    const generateOptions = (min, max, step = 1, suffix = '') => {
        const options = [];
        for (let i = min; i <= max; i += step) {
            options.push(`${i}${suffix}`);
        }
        return options;
    };

    const getPickerType = () => {
        switch (props.pickerType) {
            case 'height':
                return generateOptions(140, 220, 1, ' cm');
            case 'weight':
                return generateOptions(40, 150, 1, ' kg');
            default:
                return props.options || [];
        }
    };

    return (
        <ThemedComponent>
            <FormControl fullWidth>
                {!props.label ? null : <InputLabel>{props.label}</InputLabel>}
                <MaterialInput
                    {...props}
                    as="select"
                    value={props.value}
                    onChange={props.onChange}
                >
                    <option value="" disabled>{props.placeholder}</option>
                    {getPickerType().map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </MaterialInput>
            </FormControl>
        </ThemedComponent>
    );
};

export default Picker; 