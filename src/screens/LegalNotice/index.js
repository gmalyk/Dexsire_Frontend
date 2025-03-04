import React from 'react'
import ContainerAuthenticated from 'containers/Authenticated'
import { TermsContainer, TermsTitle, TermsContent, TermsSection, SectionTitle, SectionText } from 'components/Terms/styled';
import useI18n from 'hooks/useI18n';
import { PageBackground } from 'components/Terms/styled';

export default function LegalNoticePage() {
    const { t } = useI18n()

    const legalSections = [
        {
            title: "1. Informations Légales",
            content: "1.1. Le site Dexsire.com est édité par [Nom de la société].\n\n" +
                    "1.2. Siège social : [Adresse complète].\n\n" +
                    "1.3. Contact : [Email et téléphone]."
        },
    ];

    return (
        <ContainerAuthenticated title="Legal Notice">
            <PageBackground>
                <TermsContainer>
                    <TermsTitle>Mentions Légales</TermsTitle>
                    <TermsContent>
                        {legalSections.map((section, index) => (
                            <TermsSection key={index}>
                                <SectionTitle>{section.title}</SectionTitle>
                                <SectionText>{section.content}</SectionText>
                            </TermsSection>
                        ))}
                    </TermsContent>
                </TermsContainer>
            </PageBackground>
        </ContainerAuthenticated>
    )
} 