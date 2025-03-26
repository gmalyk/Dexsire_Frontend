import styled from 'styled-components'

export const SideBackgroundImageContainer = styled.div.attrs({
})`          
    background: ${props => props.theme.palette.primary.main}; 
    min-height:100vh;
    position: fixed;
    width: 58%;

    @media(max-width: 767px){ 
        position: relative;
        min-height:initial; 
        width: 100%;
    }
`;
export const SideBackgroundImage = styled.div.attrs({
})`          
    background: white url(https://loremflickr.com/320/320/art,grafite?random=9) no-repeat top +35% right +30% / cover;
    min-height:100vh; 
    mix-blend-mode:color-burn;

    @media(max-width: 767px){ 
        position: absolute;
        height: -webkit-fill-available;
        min-height: 120px; 
        height: 100%;
        width: 100%;
        z-index: 1;
    }
`;
export const SideBackgroundImageDegree = styled.div.attrs({
})`          
    min-height:100vh; 
    background: -moz-linear-gradient(0deg, ${props => props.theme.palette.primary.main} 17%, ${props => props.theme.palette.colors.shadow} 60%);
    background: -webkit-linear-gradient(0deg, ${props => props.theme.palette.primary.main} 17%, ${props => props.theme.palette.colors.shadow} 60%);
    background: linear-gradient(0deg, ${props => props.theme.palette.primary.main} 17%, ${props => props.theme.palette.colors.shadow} 60%);

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:  flex-end;

    @media(max-width: 767px){  
        position: relative;
        min-height:initial; 
        padding-top: 20px;
        z-index: 2;
        min-height: 120px;  
    }
`;
export const FormContent = styled.div.attrs({
})`           
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    flex: 1;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;
export const AppLogo = styled.img.attrs({
    src: '/logo1024.png',
    width: 120
})`           
`;

export const LoginPage = styled.div.attrs({
})`           
    background: url(${p => p.src});
    background-size: contain;
    background-position: top center;
    background-repeat: no-repeat;
    position: relative;
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        background-size: cover;
        background-position: 80% top;
    }
`;

export const Container = styled.div.attrs({
})`
    display: flex;
    flex-direction: row;
    width: 100vw;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 1;

    @media(max-width:991px){
        flex-direction: column;
        background-color: #000000;
    }
`;

export const Content = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
    z-index: 2;
    background: transparent;
    overflow: auto;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        width: 100%;
    }

    @media(max-width:991px){
        width: 100%;
        min-height: auto;
    }
`;

export const Background = styled.div.attrs({
})`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;

    @media(max-width:991px){
        width: 100%;
        height: 100vh;
        background-color: #000000;
    }
`;

export const BackgroundImage = styled.img.attrs({
})`
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media(max-width:991px){
        object-position: 90% 0%;
        object-fit: contain;
        transform: scale(2.3);
        transform-origin: top right;
    }
`;

export const Logo = styled.div.attrs({
})`
    cursor: pointer;
`;

export const LogoContainer = styled.div.attrs({
})`
    padding: 32px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
`;

export const Touch = styled.div.attrs({
})`           
    cursor: pointer;
`; 