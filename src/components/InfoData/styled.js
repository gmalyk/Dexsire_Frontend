import styled from "styled-components";
import { Icon } from "ui/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 526px;
    margin: 0 auto;

    @media (max-width: 768px) {
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0 16px;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    @media (max-width: 768px) {
        align-items: center;
    }
`;

export const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${props => props.theme.palette.colors.white};
    font-size: 16px;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

export const InfoIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(90deg, #FF0000 0%, #FF0099 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`;

export const InfoText = styled.div`
    flex: 1;
    
    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
`;

export const InfoDataContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 16px;

    @media (max-width: 768px) {
        gap: 12px;
        padding: 0 16px;
        overflow-x: auto;
        justify-content: center;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
        
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const InfoDataContent = styled.div.attrs({
})`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 4px solid ${p => p.theme.palette.borderBackground.main};
    color: ${p => p.theme.palette.colors.white};
    font-size: 16px;
    font-weight: 800;
    font-family: Inter;
    ${p => p.active ? `
        background: ${p.theme.palette.colors.orange};
        border: 4px solid ${p.theme.palette.colors.orange};
        color: ${p.theme.palette.colors.black};
    ` : ``
  };
`;

export const InfoDataItem = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: center;

    @media(max-width: 492px){
        min-width: auto;
        gap: 8px;
        justify-content: center;
    }
`;

export const InfoTitle = styled.div.attrs({
})`
    display: none;
    font-family: Inter;
    font-size: 14px;
    font-weight: 700;
    line-height: 16.94px;
    text-align: center;
    color: ${p => p.active ? p.theme.palette.colors.white : p.theme.palette.colors.purple};

    @media(min-width: 492px){
        display: block;
    }
`;

export const NextIcon = styled(Icon).attrs({
})`
  @media(max-width: 1160px){
    width: 16px;
  }
  align-self: flex-start;
  margin-top: 12px;
`;