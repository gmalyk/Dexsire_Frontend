import React, { useState } from "react";
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { MaterialSelect } from "./styled";
import { ThemedComponent } from "ui/theme";

export const Select = ({ 
  placeholder, 
  options, 
  small, 
  value, 
  onChange, 
  id, 
  secondary, 
  borderBackground, 
  formed,
  disabled,
  isMulti  // Add this prop
}) => {
  const [open, setOpen] = useState(false);
  
  const toggleOpen = () => {
    if (disabled) return; // Prevent opening if disabled
    setOpen(!open);
  };

  const optionAction = (event) => {
    if (disabled) return;
    const { value: newValue } = event.target;
    if (onChange) {
      // newValue will be an array if isMulti=true; otherwise, it's a single string
      onChange(newValue);
    }
    toggleOpen();
  };

  return (
    <ThemedComponent>
      <FormControl variant="outlined" fullWidth>
        <MaterialSelect
          multiple={isMulti}
          small={small}
          displayEmpty
          disabled={disabled}
          color={secondary ? 'secondary' : 'background'}
          borderBackground={borderBackground}
          id={`select-${id}`}
          value={value}
          onChange={optionAction}
          formed={formed}
          renderValue={(selected) => {
            // If no selection or empty array, show placeholder
            if (!selected || 
                (Array.isArray(selected) && selected.length === 0) ||
                (typeof selected === 'object' && Object.keys(selected).length === 0)) {
              return <span>{placeholder}</span>;
            }
            
            if (isMulti && Array.isArray(selected)) {
              // If no items selected, show placeholder
              if (selected.length === 0) {
                return <span>{placeholder}</span>;
              }
              
              // If multi-select, handle both object arrays and ID arrays
              return selected
                .map((val) => {
                  if (typeof val === 'object' && val !== null) {
                    // If val is an object, use its title property
                    return val.title || val.name || val.id || '';
                  } else {
                    // If val is a primitive (like a string ID), find the matching option
                    const opt = options.find(o => o.id === val || `${o.id}` === val);
                    return opt ? opt.title : val;
                  }
                })
                .join(', ');
            } else {
              // Single-select fallback
              if (typeof selected === 'object' && selected !== null) {
                // If selected is an object, use its title property
                return selected.title || selected.name || selected.id || '';
              } else {
                // If selected is a primitive (like a string ID), find the matching option
                const opt = options.find(option => option.id === selected || `${option.id}` === selected);
                return opt ? opt.title : selected;
              }
            }
          }}
        >
          {options?.map((item, key) => (
            <MenuItem key={key} value={`${item.id}`}>
              {item?.title}
            </MenuItem>
          ))}
        </MaterialSelect>
      </FormControl>
    </ThemedComponent>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
};

Select.defaultProps = {
  placeholder: '',
  options: [],
  value: '',
  small: false,
  secondary: false,
  onChange: undefined,
  disabled: false,
  isMulti: false,
};

export default Select;