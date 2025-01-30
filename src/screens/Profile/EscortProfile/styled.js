import styled from "styled-components";

export const BodyContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background: ${p => p.theme.palette.colors.black};
    padding-bottom: 80px;
`;



export const BodyContent = styled.div.attrs({
})`
    z-index: 1;
    width: 100%;
    padding: 92px 72px 0px 72px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    @media (max-width: 991px) {
        padding: 92px 20px 0 20px;
    };
`;


export const Background = styled.div`
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
    center / cover no-repeat url('/images/backgroundG.png');
    width: 100%;
    height: 688px;
    position: absolute;
    top: 0;
    z-index: 0;
`;
