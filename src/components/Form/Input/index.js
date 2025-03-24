import React, { useState } from "react";
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import styled from 'styled-components';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
    MaterialInput,
    MaterialInputOutline
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
    noHolder, 
    spaced, 
    registration,
    ...props 
}, ref) => {
    const [visible, setVisible] = useState(false)

    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setVisible(!visible)
        if (props.onTogglePasswordVisibility) {
            props.onTogglePasswordVisibility(!visible)
        }
    }

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
            WebkitTextSecurity: visible ? 'none' : 'disc',
            fontFamily: '-apple-system !important',
            WebkitAppearance: 'none',
            appearance: 'none',
        }
    } : {};

    const GInput = outline ? MaterialInputOutline : MaterialInput;

    return (
        <ThemedComponent>
            <PasswordWrapper className={type === 'password' ? 'no-suggestions' : ''}>
                <FormControl fullWidth variant={outline ? "outlined" : "outlined"}>
                    {!props.label ? null : <InputLabel>{props.label}</InputLabel>}
                    <GInput
                        ref={ref}
                        type={visible ? 'text' : type}
                        placeholder={noHolder ? placeholder : ''}
                        value={value}
                        onChange={onChange}
                        name={name}
                        disabled={disabled}
                        outline={outline}
                        error={error}
                        multiline={type === 'textarea'}
                        maxRows={2}
                        textarea={type === 'textarea'}
                        disableUnderline
                        registration={registration}
                        {...passwordProps}
                        {...props}
                        onKeyDown={ev => typeof props.onSubmitEditing === 'function' ? (ev.keyCode === 13 ? props.onSubmitEditing() : null) : props.onKeyDown}
                        startAdornment={
                            !props.startIcon ? null :
                                <InputAdornment position="start">
                                    <IconButton>
                                        <Icon icon={props.startIcon} />
                                    </IconButton>
                                </InputAdornment>
                        }
                        endAdornment={
                            (type === 'password' || props.password) ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                    >
                                        {visible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }
                        className={registration ? 'registration-form' : ''}
                    />
                </FormControl>
            </PasswordWrapper>
        </ThemedComponent>
    );
});

export const MaskedInput = (props) => (
    <InputMask mask={props.mask} value={props.value} disabled={false} placeholder={props.placeholder} noHolder={props.noHolder} outline={props.outline} onChange={props.onChange} maskChar="">
        {(inputProps) => <Input {...inputProps} type="tel" value={null} onChange={null} />}
    </InputMask>
);

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