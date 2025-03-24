import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ThemedComponent } from 'ui/theme';
import { MaterialInputOutline } from '../Input/styled';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

/**
 * A wrapper just for styling. 
 * Make sure it has the same outline styles as your other inputs.
 */
const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  
  .MuiOutlinedInput-root {
    border-radius: 100px;
    height: 56px;
    background-color: transparent;
  }
  
  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.theme.palette.borderBackground.main};
    border-width: 1px;
  }
  
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.theme.palette.borderBackground.main};
  }

  .MuiInputBase-input {
    height: 56px;
    padding: 0 32px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    font-family: 'Inter', sans-serif;
    color: ${props => props.theme.palette.white.main};
    background-color: transparent;
  }
  
  .MuiFormControl-root {
    margin-bottom: 16px;
  }

  .custom-password-input {
    background-color: ${props => props.theme.palette.primary.main};
    /* The text security styles ensure bullets, 
       but we still intercept keystrokes to avoid any brief character display. */
    -webkit-text-security: disc;
    text-security: disc;
  }
`;

/**
 * FullMaskPasswordInput
 * - Intercepts all typed characters so the field only shows bullets.
 * - The actual password is kept in `actualValue`.
 * - iOS may still show typed characters in its keyboard bubble briefly, 
 *   but the input field itself will display only bullets.
 */
const FullMaskPasswordInput = ({
  label,
  placeholder,
  value = '',
  onChange,
  name,
  error,
  disabled,
  outline = true,
  noHolder,
  spaced,
  full = true,
  ...props
}) => {
  // The real password is stored here
  const [actualValue, setActualValue] = useState(value);

  /**
   * Intercept typed characters before they appear in the input
   * This prevents any visible flash of the typed character in the field.
   */
  const handleBeforeInput = (e) => {
    // e.data is the typed character. 
    // If user is pasting text, e.data might be multiple chars.
    if (!e.data) return;
    e.preventDefault(); // Prevent the default insertion into the input

    setActualValue((prev) => {
      const newVal = prev + e.data;
      // Notify parent about the new "real" password
      onChange?.({ target: { name, value: newVal } });
      return newVal;
    });
  };

  /**
   * Handle backspace and other special keys via onKeyDown
   * so we can remove characters manually from our real password.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      setActualValue((prev) => {
        const newVal = prev.slice(0, -1);
        onChange?.({ target: { name, value: newVal } });
        return newVal;
      });
    }
    // You could handle arrow keys, etc., if desired.
  };

  return (
    <ThemedComponent>
      <PasswordWrapper>
        <FormControl fullWidth variant="outlined">
          {label && <InputLabel>{label}</InputLabel>}
          <MaterialInputOutline
            type="text" // Trick iOS to avoid "password" detection
            placeholder={noHolder ? placeholder : ''}
            // Display bullet points matching the length of the real password
            value={'•'.repeat(actualValue.length)}
            disabled={disabled}
            outline={outline}
            error={error}
            spaced={spaced}
            fullWidth={full}
            className="custom-password-input"
            // The real magic: intercept user input
            onBeforeInput={handleBeforeInput}
            onKeyDown={handleKeyDown}
            // Remove normal onChange so it won't conflict
            {...props}
            inputProps={{
              style: {
                WebkitTextSecurity: 'disc',
                textSecurity: 'disc',
              }
            }}
          />
        </FormControl>
      </PasswordWrapper>
    </ThemedComponent>
  );
};

FullMaskPasswordInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  noHolder: PropTypes.bool,
  spaced: PropTypes.bool,
  full: PropTypes.bool,
};

FullMaskPasswordInput.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  onChange: undefined,
  name: '',
  error: false,
  disabled: false,
  outline: true,
  noHolder: false,
  spaced: false,
  full: true,
};

export default FullMaskPasswordInput;
