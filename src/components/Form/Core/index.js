import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";

import {
    FormInput,
    FormWrapper,
    FormSeparator,
    ContentFormHeader,
    ContentForm,
    FormContainer
} from "./styled";

import Input, { CurrencyInput, MaskedInput } from "components/Form/Input";
import Select from "components/Form/Select";
import PasswordValidation from "components/Form/PasswordValidation";
import Button from "../Button";
import { TextArea } from "../TextArea/styled";
import InputTextArea from "../TextArea";
import Rating from "../Rating";
import Picker from 'components/Form/Picker';

export default forwardRef(function FormCore({ formItems, register, disabled, title }, ref) {

    const [form, setForm] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
    const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

    const [nextBlur, setNextBlur] = useState(null)
    const [nextPrint, setNextPrint] = useState([])

    const scheduleBlur = (item) => {
        setTimeout(() => { setNextBlur(item); }, 1)
    }

    const safeBlur = (item) => {
        if (typeof item?.onBlur === "function") {
            item.onBlur()
        }
    }

    useEffect(() => {
        if (register) {
            setForm({ ...register })
        }
    }, [register])

    useEffect(() => {
        if (nextBlur) {
            safeBlur(nextBlur)
        }
    }, [nextBlur])

    useEffect(() => {
        setNextPrint([...formItems])
    }, [formItems])

    useImperativeHandle(ref, useCallback(() => ({
        getForm() { return form; }
    }), [form]))

    const handleSelectChange = (item, val) => {
        if (!item.disabled) {
            changeForm(val, item.ref)
            scheduleBlur(item)
            if (typeof item.onChange === 'function') {
                item.onChange(val);
              }
        }
    }

    return (
        <FormContainer 
            autoComplete="off" 
            data-lpignore="true"
        >
            <ContentForm active={!!title}>
                <ContentFormHeader active={!!title}>{title}</ContentFormHeader>
                <FormWrapper>
                    {
                        nextPrint.map((item, key) => <>
                            {
                                item.separator ? <FormSeparator /> : <FormInput full={item.full} half={item.half} quarter={item.quarter} twenty={item.twenty} customer={item.customer} key={key}>
                                    {
                                        item.custom ? item.custom : item.options ?
                                            <Select 
                                                placeholder={item.placeholder} 
                                                options={item.options} 
                                                value={formValue(item.ref)} 
                                                onChange={val => handleSelectChange(item, val)}
                                                disabled={item.disabled}
                                                borderBackground={item.blue}
                                                hideLabel={true}
                                            />
                                            : item.mask ?
                                                <MaskedInput mask={item.mask} type={item.type} placeholder={item.placeholder} value={formValue(item.ref)} onChange={e => changeForm(e.target.value, item.ref)} onBlur={() => typeof item?.onBlur === "function" ? item.onBlur(formValue(item.ref)) : null} disabled={item.disabled || disabled} />
                                            : item.type === 'rate' ? 
                                                <Rating value={formValue(item.ref)} onChange={value => changeForm(value, item.ref)} label={item.placeholder} /> 
                                            : item.type === 'money' ?
                                                <CurrencyInput mask={item.mask} type={item.type} placeholder={item.placeholder} value={formValue(item.ref)} onChange={e => changeForm(e.target.value, item.ref)} onBlur={() => typeof item?.onBlur === "function" ? item.onBlur(formValue(item.ref)) : null} disabled={item.disabled || disabled} />
                                            : item.passwordValidation ?
                                                <PasswordValidation password={form.password} />
                                            : item.button ? 
                                                <Button nospace onClick={item.action} outlineGradient={item.outilineGradient}>
                                                    {item.label}
                                                </Button>
                                            : item.type === 'picker' ?
                                                <Picker {...item} />
                                            : item.type === 'select' ?
                                                <Select {...item} />
                                            :
                                                <Input  
                                                    type={item.type} 
                                                    placeholder={item.placeholder} 
                                                    value={formValue(item.ref)} onChange={e => changeForm(e.target.value, item.ref)} 
                                                    disabled={item.disabled || disabled} noHolder 
                                                    textarea={item.type === 'textarea'} startIcon={item.startIcon} endIcon={item.endIcon} 
                                                    onKeyDown={item.onKeyDown} onSubmitEditing={item.onSubmitEditing}
                                                    onBlur={() => typeof item?.onBlur === "function" ? item.onBlur(formValue(item.ref)) : null} 
                                                    outline={item.outline} 
                                                    autoComplete={item.autocomplete}
                                                    data-lpignore="true"
                                                    data-form-type="other"
                                                    passwordrules={item.passwordrules}
                                                    webkitautofill={item.webkitautofill}
                                                    aria-autocomplete="none"
                                                />
                                    }
                                </FormInput>
                            }
                        </>
                        )
                    }
                </FormWrapper>
            </ContentForm>
        </FormContainer>
    );
})