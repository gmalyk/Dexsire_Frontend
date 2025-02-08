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


export const Input = (props) => {
    const [visible, setVisible] = useState(false)

    const handleClickShowPassword = () => {
        setVisible(!visible);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    const GInput = props.outline ? MaterialInputOutline : MaterialInput;

    return (
        <>
            <ThemedComponent>
                <FormControl fullWidth variant={props.outline ? "outlined" : "outlined"}>
                    <GInput
                        id={props.id}
                        type={props.type === 'password' ? visible ? 'text' : 'password' : props.type}
                        value={props.value}
                        multiline={props.type === 'textarea'}
                        maxRows={2}
                        textarea={props.type === 'textarea'}
                        disableUnderline
                        placeholder={props.placeholder}
                        onChange={props.onChange}
                        noHolder={props.noHolder}
                        onKeyDown={ev => typeof props.onSubmitEditing === 'function' ? (ev.keyCode === 13 ? props.onSubmitEditing() : null) : props.onKeyDown}
                        disabled={props.disabled}
                        formed={props.formed}
                        spaced={props.spaced}
                        startAdornment={
                            !props.startIcon ? null :
                                <InputAdornment position="start">
                                    <IconButton>
                                        <Icon icon={props.startIcon} />
                                    </IconButton>
                                </InputAdornment>
                        }
                        endAdornment={<>
                            {
                                props.type === 'password' ?
                                    <InputAdornment position="end">
                                        {
                                            props.type === 'password' ?
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDown} >
                                                    {visible ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                                : null
                                        }
                                    </InputAdornment>
                                    : null
                            }
                            <InputAdornment position="end">
                                {
                                    !props.endIcon ? null :
                                        <InputAdornment>
                                            <IconButton>
                                                <Icon icon={props.endIcon} />
                                            </IconButton>
                                        </InputAdornment>
                                }
                            </InputAdornment>
                        </>
                        }
                    />
                </FormControl>
            </ThemedComponent>
        </>
    );
}

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