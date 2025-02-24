import styled from "styled-components";

export const ServicesContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
`;

export const CheckContainer = styled.div.attrs({
})` 
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 8px;
    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr); 
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);

    }
    @media (max-width: 424px) {
        grid-template-columns: repeat(1, 1fr);
    }

    padding: 0 40px;

    @media (max-width: 768px) {
    padding: 0;
    }
`;
export const InputContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 631px;
`;

export const FormContainer = styled.div.attrs({
})`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const NoteText = styled.div.attrs({
})`
   font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${p => p.theme.palette.colors.purple};
    width: 100%;
    margin-top: 24px;
    margin-bottom: 24px;
`;

export const ServiceHeaderContent = styled.div.attrs({
})`
    display: flex;
    justify-content: ${p => p.between ? 'space-between' : 'center'};
    align-items: center;
    width: 100%;
    gap: 16px;
`;
export const ButtonEditing = styled.div.attrs({
})`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid ${p => p.theme.palette.colors.grey};
    cursor: pointer;
`;

export const NoteContainer = styled.div.attrs({
})`
   ${p => p.noteEditing ? `
        display: flex;
        align-items: center;
        gap: 40px;
        width: 100%;
        border-top: 1px solid ${p.theme.palette.borderBackground.main};
        border-bottom: 1px solid ${p.theme.palette.borderBackground.main};
    `: ``};
`;

export const FormSection = styled.div`
    margin: 24px 0;
`;

export const FormTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    color: ${p => p.theme.palette.colors.grey};
    margin-bottom: 16px;
`;

export const FormRow = styled.div`
    display: flex;
    gap: 16px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
    }
`;