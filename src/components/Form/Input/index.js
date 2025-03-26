import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import styled from 'styled-components';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
    MaterialInput,
    MaterialInputOutline,
    FloatingLabelContainer,
    FloatingLabel,
    InputError,
    StyledTextArea
} from "./styled";

import CurrencyFormat from "react-currency-format";

import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import { ThemedComponent } from "ui/theme";
import { Icon } from "ui/styled";

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  
  /* iOS-specific styles to prevent password suggestions */
  &.no-suggestions input[type="password"],
  &.no-suggestions input[type="text"] {
    -webkit-text-security: disc;
    -webkit-user-select: none;
    user-select: none;
    -webkit-user-modify: read-write-plaintext-only;
  }
  
  /* Add a pseudo-element to intercept iOS suggestion UI */
  &.no-suggestions::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    background: transparent;
    pointer-events: none;
    z-index: 10;
  }
`;

export const Input = React.forwardRef(({ 
    type, 
    placeholder, 
    value, 
    onChange, 
    name, 
    error, 
    disabled, 
    outline, 
    textarea, 
    startIcon,
    endIcon,
    onSubmitEditing,
    onKeyDown,
    onBlur,
    noHolder,
    secondary,
    spaced,
    full,
    registration,
    ...props 
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const passwordProps = type === 'password' ? {
        name: `pw_${Math.random().toString(36).substr(2, 9)}`,
        id: `pw_${Math.random().toString(36).substr(2, 9)}`,
        autoComplete: "new-password",
        autoCorrect: "off",
        autoCapitalize: "none",
        spellCheck: "false",
        "data-lpignore": "true",
        "data-1p-ignore": "true",
        "data-form-type": "other",
        "data-private": "true",
        "aria-hidden": "true",
        "aria-autocomplete": "none",
        readOnly: true,
        onFocus: (e) => {
            e.target.removeAttribute('readonly');
            e.target.setAttribute('autocomplete', 'off');
            setTimeout(() => {
                const val = e.target.value;
                e.target.value = '';
                e.target.value = val;
            }, 0);
        },
        onBlur: (e) => {
            e.target.setAttribute('readonly', 'true');
        },
        inputMode: "verbatim",
        "data-name": name,
        style: {
            WebkitTextSecurity: showPassword ? 'none' : 'disc',
            fontFamily: '-apple-system !important',
            WebkitAppearance: 'none',
            appearance: 'none',
        }
    } : {};

    const GInput = outline ? MaterialInputOutline : MaterialInput;

    return (
        <ThemedComponent>
            <FloatingLabelContainer>
                {textarea ? (
                    <FormControl variant={outline ? "outlined" : "standard"} fullWidth>
                        <StyledTextArea
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={onKeyDown}
                            {...props}
                        />
                        <FloatingLabel 
                            active={true}
                            focused={isFocused}
                            textarea={textarea}
                            hasStartIcon={!!startIcon}
                        >
                            {placeholder}
                        </FloatingLabel>
                    </FormControl>
                ) : type === 'password' ? (
                    <FormControl variant={outline ? "outlined" : "standard"} fullWidth>
                        <MaterialInput
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            outline={outline}
                            spaced={spaced}
                            fullWidth={full}
                            noHolder={noHolder}
                            registration={registration}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...passwordProps}
                            {...props}
                        />
                        <FloatingLabel 
                            active={isFocused || hasValue}
                            focused={isFocused}
                            textarea={textarea}
                            hasStartIcon={!!startIcon}
                        >
                            {placeholder}
                        </FloatingLabel>
                    </FormControl>
                ) : (
                    <FormControl variant={outline ? "outlined" : "standard"} fullWidth>
                        <MaterialInput
                            id="standard-adornment-input"
                            type={type}
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            outline={outline}
                            textarea={textarea}
                            spaced={spaced}
                            fullWidth={full}
                            noHolder={noHolder}
                            registration={registration}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={onKeyDown}
                            startAdornment={
                                !startIcon ? null :
                                    <InputAdornment position="start">
                                        <Icon icon={startIcon} nomargin />
                                    </InputAdornment>
                            }
                            endAdornment={
                                !endIcon ? null :
                                    <InputAdornment position="end">
                                        <Icon icon={endIcon} nomargin />
                                    </InputAdornment>
                            }
                            {...props}
                        />
                        <FloatingLabel 
                            active={isFocused || hasValue}
                            focused={isFocused}
                            textarea={textarea}
                            hasStartIcon={!!startIcon}
                        >
                            {placeholder}
                        </FloatingLabel>
                    </FormControl>
                )}
                {error && <InputError>{error}</InputError>}
            </FloatingLabelContainer>
        </ThemedComponent>
    );
});

export const MaskedInput = ({ 
    type, 
    placeholder, 
    value, 
    onChange, 
    mask, 
    error, 
    disabled, 
    outline, 
    onSubmitEditing,
    onBlur,
    noHolder,
    secondary,
    spaced,
    full,
    registration,
    ...props 
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    return (
        <ThemedComponent>
            <FloatingLabelContainer>
                <FormControl variant={outline ? "outlined" : "standard"} fullWidth>
                    <InputMask 
                        mask={mask} 
                        value={value} 
                        onChange={onChange} 
                        onBlur={handleBlur} 
                        onFocus={handleFocus}
                        disabled={disabled}
                    >
                        {(inputProps) => 
                            <MaterialInput
                                id="standard-adornment-input"
                                type={type}
                                disabled={disabled}
                                outline={outline}
                                spaced={spaced}
                                fullWidth={full}
                                noHolder={noHolder}
                                registration={registration}
                                {...inputProps}
                                {...props}
                            />
                        }
                    </InputMask>
                    <FloatingLabel 
                        active={isFocused || hasValue}
                        focused={isFocused}
                    >
                        {placeholder}
                    </FloatingLabel>
                </FormControl>
                {error && <InputError>{error}</InputError>}
            </FloatingLabelContainer>
        </ThemedComponent>
    );
};

export const CurrencyInput = ({ value, onChange, ...props }) => (
    <CurrencyFormat
        {...props}
        value={value}
        onValueChange={(values) => onChange({ target: { value: values.floatValue } })}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        customInput={Input}
    />
);

MaskedInput.propTypes = {
    type: PropTypes.oneOf(['password', 'text']),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    secondary: PropTypes.bool,
    onSubmitEditing: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    mask: PropTypes.string.isRequired
};

MaskedInput.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    value: '',
    secondary: false,
    onSubmitEditing: undefined,
    onChange: undefined,
    mask: ''
};

Input.propTypes = {
    type: PropTypes.oneOf(['password', 'text']),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    onSubmitEditing: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    value: '',
    secondary: false,
    disabled: false,
    onSubmitEditing: undefined,
    onChange: undefined,
};

export default Input; 