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
  disabled  // Add disabled prop
}) => {
  const [opened, setOpened] = useState(false);
  
  const toggleOpen = () => {
    if (disabled) return; // Prevent opening if disabled
    setOpened(!opened);
  };

  const optionAction = item => {
    if (disabled) return; // Prevent changes if disabled
    if (onChange && typeof onChange === 'function') {
      onChange(item.target.value);
    }
    toggleOpen();
  };

  return (
    <ThemedComponent>
      <FormControl variant="outlined" fullWidth>
        <MaterialSelect
          small={small}
          displayEmpty
          disabled={disabled}  // Add disabled prop
          color={secondary ? 'secondary' : 'background'}
          borderBackground={borderBackground}
          id={`select-${id}`}
          value={value}
          onChange={optionAction}
          formed={formed}
          renderValue={(selected) => {
            if (!selected) {
              return <span>{placeholder}</span>;
            }
            return options.find(option => `${option.id}` === selected)?.title;
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
  value: PropTypes.string,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,  // Add disabled to propTypes
};

Select.defaultProps = {
  placeholder: '',
  options: [],
  value: '',
  small: false,
  secondary: false,
  onChange: undefined,
  disabled: false,  // Add disabled default prop
};

export default Select;