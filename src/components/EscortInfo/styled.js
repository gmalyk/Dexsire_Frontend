import styled from 'styled-components';

export const BodyContent = styled.div.attrs({
})`
    z-index: 1;

    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    @media (max-width: 991px) {
        // padding: 0px 20px 0 20px;
    };
`;

