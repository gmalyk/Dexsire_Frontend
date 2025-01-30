import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import {
    CheckBox,
    MaterialCheckbox
} from './styled'


import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ThemedComponent } from "ui/theme";
import { Icon } from "ui/styled";
import { theme } from "ui/theme-color";



export const Check = ({ checked, onChange, label, title, secondary, circle, disabled }) => {

    const [active, setActive] = useState(checked)

    const action = () => {
        const nv = !active
        if (onChange && typeof onChange === 'function') { onChange(nv) }
        setActive(nv)
    }

    useEffect(() => {
        setActive(checked)
    }, [checked])

    return (
        <>
            <ThemedComponent>
                <FormGroup
                    color={secondary ? 'secondary' : 'white'}

                >
                    {title ? <FormLabel component="legend"
                        color={secondary ? 'secondary' : 'white'} >{title}</FormLabel> : null}
                    <FormControlLabel
                        style={{ color: theme.palette.colors.purple }}
                        sx={{ margin: '0px' }}
                        control={
                            <MaterialCheckbox checked={checked} onChange={action}
                                color={secondary ? 'secondary' : 'white'}
                                checkedIcon={
                                    <CheckBox circle={circle}>
                                        <Icon icon={circle ? "check-white" : "check"} />
                                    </CheckBox>
                                }
                                icon={<CheckBox />}
                            />}
                        label={label}
                        disabled={disabled}
                        color={secondary ? 'secondary' : 'white'}
                    />
                </FormGroup>
            </ThemedComponent>

        </>
    );
}

Check.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string,
    checked: PropTypes.bool,
    secondary: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};


Check.defaultProps = {
    label: '',
    title: '',
    checked: false,
    secondary: false,
    onChange: undefined,
};

export default Check;