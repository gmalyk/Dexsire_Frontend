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
  formed 
}) => {
  const [opened, setOpened] = useState(false);
  
  const toggleOpen = () => {
    setOpened(!opened);
  };

  const optionAction = item => {
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
};

Select.defaultProps = {
  placeholder: '',
  options: [],
  value: '',
  small: false,
  secondary: false,
  onChange: undefined,
};

export default Select;