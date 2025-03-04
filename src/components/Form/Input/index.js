import React, { useState } from "react";
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

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
    ...props 
}, ref) => {
    const [visible, setVisible] = useState(false)

    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }

    const passwordProps = type === 'password' ? {
        autoComplete: "new-password",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: "false",
        "data-lpignore": "true",
        "data-1p-ignore": "true",
        "data-form-type": "other",
        "data-private": "true",
        "aria-hidden": "true",
        "aria-autocomplete": "none",
        name: `pwd_${Math.random().toString(36).substr(2, 9)}`,
        "data-name": name,
        style: {
            WebkitTextSecurity: type === 'password' ? 'disc' : 'none',
            fontFamily: '-apple-system !important',
            WebkitAppearance: 'none',
            appearance: 'none'
        }
    } : {};

    const GInput = outline ? MaterialInputOutline : MaterialInput;

    return (
        <ThemedComponent>
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
                        type === 'password' && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                >
                                    {visible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                />
            </FormControl>
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