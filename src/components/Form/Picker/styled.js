import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input';

export const MaterialInput = styled(Input)`
    select& {
        appearance: none;
        -webkit-appearance: none;
        background: ${props => props.theme.palette.primary.main};
        height: 56px;
        border-radius: 100px;
        padding: 0 32px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        font-family: Inter;
        color: ${props => props.theme.palette.primary.contrastText};
        border: 1px solid ${props => props.theme.palette.borderBackground.main};

        &::-webkit-datetime-edit {
            padding: 0;
        }

        &::-webkit-datetime-edit-fields-wrapper {
            background: transparent;
        }

        &::-webkit-datetime-edit-text {
            color: ${props => props.theme.palette.primary.contrastText};
            padding: 0 2px;
        }

        &::-webkit-calendar-picker-indicator {
            display: none;
        }

        &::-webkit-inner-spin-button {
            display: none;
        }

        &:focus {
            outline: none;
        }
    }
`; 