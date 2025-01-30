import styled from 'styled-components'

export const ModalContainerOut = styled.div.attrs({
})`
    position: fixed;
    inset: 0 0 0 0;
    z-index: 1;
    background: ${props => props.theme.palette.colors.shadow};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
`;

export const ModalContainerIn = styled.div.attrs({
})`
    width: 100%;
    max-width: 720px;
    background: ${props => props.theme.palette.colors.white};

    // border: .5px solid ${props => props.theme.palette.secondary.main};
    border: .5px solid rgba(19, 237, 0, .4);
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
`;

export const ModalHeaderClose = styled.img.attrs({
  src: '/icons/close.svg',
  width: 28
})`
    margin-left: auto;
    cursor: pointer;
    transition: all .3s ease;
    &:hover{
        transform: scale(1.1);
    }

    margin: 12px 12px -49px auto;
    z-index:3;
`;

export const ModalHeaderTitle = styled.div.attrs({
})`
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.palette.colors.black};
`;

export const ModalBody = styled.div.attrs({
})`
    margin: 20px 0;
    display: flex;
    gap: 20px;
`;

export const ModalActions = styled.div.attrs({
})`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 10px 0 0;
`;

export const ModalActionButton = styled.div.attrs({
})`
`;


export const ContentBody = styled.div.attrs({
})`
    max-height: 80vh;
    overflow: auto;
    padding: 24px 24px 24px 24px;
    background: ${props => props.theme.palette.colors.white} url(/images/background.png) no-repeat center center / cover ;
`;

export const BodyTitle = styled.div.attrs({
})`
    font-size: 20px;
    font-family: SpyBold; 
    color: ${props => props.theme.palette.colors.black};
    margin-bottom: 20px;
`;

export const BodyText = styled.div.attrs({
})`
    font-size: 14px; 
    color: ${props => props.theme.palette.colors.black};
    margin: 0 0 12px 0;
    ${props => props.bold ? `
            font-family: SpyBold;
        ` : ``
  }
`;    