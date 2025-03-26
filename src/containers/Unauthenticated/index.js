import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
    Container,
    Content,
    Background,
    BackgroundImage,
    Logo,
    LogoContainer,
} from './styled'

import { Icon } from 'ui/styled'
import useI18n from 'hooks/useI18n'
import { ThemedComponent } from 'ui/theme'

export default function ContainerUnauthenticated({ children, background, login, scrollTo }) {
    const history = useHistory()
    const navigate = to => history.push(`/${to}`)

    const { t } = useI18n()

    useEffect(() => {
        if (scrollTo) {
            const element = document.getElementById(scrollTo)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [scrollTo])

    return (
        <ThemedComponent>
            <Container>
                <Content>
                    <LogoContainer>
                        <Logo onClick={() => navigate('')}>
                            <Icon icon={'logo'} width={150} height={40} />
                        </Logo>
                    </LogoContainer>
                    {children}
                </Content>
                <Background>
                    <BackgroundImage src={background || '/images/background.jpeg'} />
                </Background>
            </Container>
        </ThemedComponent>
    )
}