import styled from 'styled-components'

export const BodyContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    background: ${p => p.theme.palette.colors.black};
`;

export const Banner = styled.div`
    background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.9) 76%), 
        center / cover no-repeat url('/images/banner.jpeg');
    width: 100%;
    height: 724px;
    position: absolute;
    top: 0;
    z-index: 0;
`;

export const BodyContent = styled.div.attrs({
})`
    z-index: 1;
    width: 100%;
    min-height:  724px;
    height: auto;
    padding: 92px 72px 0px 72px;
    
    @media (max-width: 991px) {
        padding: 92px 20px 0 20px;
    };
`;

export const HomeTextInfo = styled.div.attrs({})`
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    text-align: left;
    color: ${p => p.theme.palette.colors.white};
    margin-left: 4px;
`;



export const HomeBody = styled.div.attrs({})`
    width: 100%;
    padding: 32px 70px 70px 70px;

    @media (max-width: 768px) {
        padding: 171px 20px 20px;
    };

`;
export const BodyRegister = styled.div.attrs({})`
    margin-top: 24px;
    display: flex;
    flex-direction: column;  
     @media (max-width: 768px) {
        align-items: center;
    };
`;

export const BodyRegisterTitle = styled.div.attrs({})`
    font-family: Inter;
    font-size: 56px;
    font-weight: 500;
    line-height: 56px;
    text-align: left;
    color: ${p => p.theme.palette.colors.white};
    max-width: 388px;

    @media (max-width: 768px) {
        font-size: 24px;
        text-align: center;
        line-height: 29.05px;

    };

`;


export const HomeContent = styled.div.attrs({})`

`;
export const HomeText = styled.div.attrs({})`
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: center;
    color: ${p => p.theme.palette.error.main};
    margin-top: 24px;

`;

export const HomeContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 3 cards per row on desktop
    gap: 24px;
    padding: 24px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr); // 2 cards per row on tablet/mobile
        gap: 16px;
        padding: 16px;
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr); // Keep 2 cards per row on smaller mobile
        gap: 12px;
        padding: 12px;
    }
`;

export const SearchButton = styled.button`
    position: fixed;
    top: 16px;
    right: 60px; /* Position it between language button and menu button */
    z-index: 1000;
    background: #000000; /* Black background */
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    
    &:hover {
        background-color: #333333;
        transform: scale(1.05);
    }
    
    img {
        width: 18px;
        height: 18px;
    }
    
    @media (max-width: 768px) {
        right: 50px; /* Adjust for mobile */
        width: 36px;
        height: 36px;
    }
`;