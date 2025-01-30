import React from 'react'
import ContainerAuthenticated from 'containers/Authenticated'
import { TermsContainer, TermsTitle, TermsContent, TermsSection, SectionTitle, SectionText } from 'components/Terms/styled';
import useI18n from 'hooks/useI18n';

export default function LegalNoticePage() {
    const { t } = useI18n()

    const legalSections = [
        {
            title: "1. Informations Légales",
            content: "1.1. Le site Dexsire.com est édité par [Nom de la société].\n\n" +
                    "1.2. Siège social : [Adresse complète].\n\n" +
                    "1.3. Contact : [Email et téléphone]."
        },
        // Add other sections
    ];

    return (
        <ContainerAuthenticated title="Legal Notice">
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
        </ContainerAuthenticated>
    )
} 