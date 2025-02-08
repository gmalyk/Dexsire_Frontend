import styled from 'styled-components'
import ReactLoading from 'react-loading';
import Lottie from 'react-lottie';

export const hexToRgb = (hex) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
    }
    return `255,255,255`
}

export const Touch = styled.div.attrs({
})`         
    cursor: pointer;
    &:hover{
        box-shadow: 0px 1px 3px ${props => props.theme.palette.colors.shadow};
    }
`;

export const Load = styled(ReactLoading).attrs({
    type: 'spin',
    color: '#ffffff',
    height: 20,
    width: 20
})`          
`;

export const Animation = styled(Lottie).attrs(props => ({
    options: {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        animationData: props.animationData
    },
    width: props.width ? props.width : 320
}))`        
    max-width: 100%;
`;

export const EmptyMessage = styled.div.attrs({
})`         
    padding: 32px; 
    text-align: center;
    font-size: 14px;
    color: ${props => props.theme.palette.colors.black};
`;

export const LoadCenter = styled.div.attrs({
})`         
    width: 20px;
    margin: 32px auto; 
    display: flex;
    justify-content: center;
`;

export const DecoratedScroll = styled.div.attrs({
})`

    overflow: auto; 

    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.palette.orange.main};
        outline: 0 solid ${props => props.theme.palette.orange.main};
    }

    ::-webkit-scrollbar {
        overflow: hidden;
        border-radius: 8px;
        width: 4px;
        height: .2rem;
        background-color: ${props => props.theme.palette.bgReview.main};
    }

    ::-webkit-scrollbar-track {  
    }
`;

export const SafeImage = styled.img.attrs({
    onError: e => e.target.style.display = 'none',
    onLoad: e => e.target.style.display = 'initial'
})``


export const Icon = styled(SafeImage).attrs((props) => ({
    src: `/icons/${props.icon}.svg`,
}))` 
    margin: ${props => props.nomargin ? `0` : `0 2px`} ;
    z-index: 1;
    ${props => props.pointer ? `cursor: pointer;` : ``}
    ${p => p.width ? `width: ${p.width}px;` : ``}
    ${p => p.space ? `margin-right: 16px;` : ``}
`;

export const Title = styled.div.attrs({
})`
    font-size: ${props => props.small ? `24px` : `32px`};
    font-family: Inter;
    font-weight: 500;
    text-align: ${props => props.left ? `left` : `center`};
    margin-bottom: ${props => props.nomargin ? `0` : `16px`};
    text-transform: ${props => props.upper ? `uppercase` : `none`};
    color: ${props => props.theme.palette.colors.white};
    max-width: ${props => props.maxwidth ? `${props.maxwidth}px` : `100%`};
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: ${props => props.center ? `center` : `flex-start`};

    ${
        p => p.verysmall ? `
            font-size: 18px;
            margin-top: 16px;
            margin-bottom: 0;
        ` : ``
    }

    @media(max-width: 767px){
        text-align: center !important;
        justify-content: center;
    }
`;

export const ButtonContainer = styled.div.attrs({
})`
    display: flex;
    ${p => p.column ? `
        flex-direction: column;
        ${p.start ? `align-items: flex-start;` : ``}
        ${p.center ? `align-items: center;` : ``}
        ${p.end ? `align-items: flex-end;` : ``}
    ` : ``};    

    justify-content: space-between;
    ${p => p.start ? `justify-content: flex-start;` : ``}
    ${p => p.center ? `justify-content: center;` : ``}
    ${p => p.end ? `justify-content: flex-end;` : ``}

    width: 100%;
    ${p => p.space ? `gap: 24px` : ``}
`;

export const FormTitle = styled.div.attrs({
})`
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: ${props => props.left ? `left` : `center`};
    color: ${props =>
        props.white ?
            props.theme.palette.colors.white :
            props.black ?
                props.theme.palette.colors.black :
                props.light ? props.theme.palette.colors.black :
                    props.purple ? props.theme.palette.colors.purple :
                        props.theme.palette.colors.orange
    };

    @media(max-width:767px){
        text-align: center !important;
        width: 100%;
    }
`;

export const FormText = styled.div.attrs({
})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};

`;

export const FormSpacer = styled.div.attrs({
})`
    padding-top: 24px;
    ${props => props.large ? `margin-top: 40px;` : ``}
    ${props => props.extraLarge ? `margin-top: 80px;` : ``};

    ${props => props.border ? `
        border-top: 0.5px solid ${props.theme.palette.colors.border};
        margin-bottom: 32px;
`: ``};
`;

export const Overlay = styled.div.attrs({})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.palette.colors.shadow};
  z-index: 1001;
  cursor: auto;
`;

export const ModalContainer = styled.div.attrs({})`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const ModalContent = styled.div.attrs({
})`
  width: 100%;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${p => p.center ? `
    align-items: center;
    ${p.nojustify ? `` : `justify-content: center;`}
  ` : ``}
  
  ${props => props.background && `
    background-image: url(${props.background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
      background-position: 80% center;
    }
  `}

  padding: 24px 40px 40px 40px;

  @media (max-width: 1000px) {
    padding: 20px;
    max-width: 100%;
    min-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 15px;
    gap: 15px;
  }
`;

export const FullLoad = styled.div.attrs({
    children: <>
        <Load white />
    </>
})`
    position: fixed;
    inset: 0 0 0 0;
    z-index: 999;
    background: ${({ theme }) => theme.palette.colors.shadow};
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const Background = styled.div`
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 1) 70%), 
        center / cover no-repeat url('/images/background.jpeg');
    width: 100%;
    height: 333px;
    position: absolute;
    top: 0;
    z-index: 0;
`;