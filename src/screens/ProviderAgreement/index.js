import React from 'react'
import ContainerAuthenticated from 'containers/Authenticated'
import { Container, SubTitle, TermContainer, TermContent, TermText, TermTitle, TextContainer } from './styled';
import { FormSpacer, Title } from 'ui/styled'
import useI18n from 'hooks/useI18n';
import { TermsContainer, TermsTitle, TermsContent, TermsSection, SectionTitle, SectionText } from 'components/Terms/styled';

export default function ProviderAgreementPage() {
    const { t } = useI18n()

    const providerSections = [
        {
            title: "Introduction",
            content: "Cet Accord du Fournisseur de Contenu (le « Contrat ») est conclu à la date d'acceptation par le Fournisseur de Contenu (la « Date d'Effet »), entre Dexsire (« Plateforme » ou « Marchand ») et la personne ou entité acceptant ce Contrat (« Fournisseur de Contenu »), collectivement désignés comme les « Parties ».\n\n" +
                    "En cliquant sur « J'accepte » ou en indiquant autrement l'acceptation de ce Contrat, le Fournisseur de Contenu accepte les termes et conditions suivants :"
        },
        {
            title: "1. Objet du Contrat",
            content: "L'objectif de ce Contrat est de définir les conditions générales dans lesquelles le Fournisseur de Contenu répertorie, télécharge et gère son profil et/ou son contenu sur la plateforme Dexsire (la « Plateforme »)."
        },
        {
            title: "2. Gestion du Contenu et du Profil",
            content: "2.1 Soumission de Contenu\n" +
                    "Le Fournisseur de Contenu s'engage à fournir des informations précises, actuelles et véridiques, notamment :\n" +
                    "• Une description personnelle/professionnelle,\n" +
                    "• Des photographies, vidéos ou autres contenus multimédias,\n" +
                    "• Les détails des prix, plannings et disponibilités.\n\n" +
                    "2.2 Normes de Contenu\n" +
                    "Les matériaux fournis par le Fournisseur de Contenu doivent :\n" +
                    "• Être conformes aux lois et réglementations applicables,\n" +
                    "• Ne pas enfreindre les droits de propriété intellectuelle de tiers,\n" +
                    "• Ne contenir aucun contenu obscène, diffamatoire ou illégal.\n\n" +
                    "2.3 Mises à Jour et Maintenance\n" +
                    "Le Fournisseur de Contenu doit mettre à jour son profil afin de garantir l'exactitude et la pertinence des informations.\n\n" +
                    "2.4 Droit de Vérification\n" +
                    "Dexsire se réserve le droit de :\n" +
                    "• Examiner et approuver le contenu avant sa publication,\n" +
                    "• Demander des modifications pour respecter les directives de la plateforme,\n" +
                    "• Supprimer tout contenu qui enfreint ce Contrat ou une loi applicable."
        },
        {
            title: "3. Modalités de Paiement",
            content: "3.1 Commissions et Frais\n" +
                    "Dexsire facturera des frais pour le référencement ou l'utilisation de la Plateforme. Les détails des structures de commission, frais d'abonnement ou paiements uniques seront précisés dans une Grille Tarifaire distincte fournie lors de la signature.\n\n" +
                    "3.2 Calendrier des Paiements\n" +
                    "Les Fournisseurs de Contenu recevront des paiements pour les services rendus via la Plateforme à des intervalles convenus par écrit (hebdomadaires, bihebdomadaires ou mensuels). Les paiements seront effectués par un moyen convenu mutuellement (virement bancaire, PayPal, etc.).\n\n" +
                    "3.3 Déductions\n" +
                    "Dexsire peut déduire des commissions, taxes ou frais avant de transférer le paiement final au Fournisseur de Contenu.\n\n" +
                    "3.4 Litiges Relatifs aux Paiements\n" +
                    "Tout litige relatif aux paiements doit être signalé dans les 15 jours suivant la réception du paiement."
        },
        {
            title: "4. Propriété et Licence",
            content: "4.1 Propriété du Contenu\n" +
                    "Le Fournisseur de Contenu conserve la propriété de tout contenu soumis sur la Plateforme.\n\n" +
                    "4.2 Licence d'Utilisation\n" +
                    "Le Fournisseur de Contenu accorde à Dexsire une licence non exclusive et sans redevance pour :\n" +
                    "• Afficher, distribuer et promouvoir le contenu sur la Plateforme,\n" +
                    "• Utiliser le contenu à des fins de marketing ou de publicité.\n\n" +
                    "4.3 Réclamations de Tiers\n" +
                    "Le Fournisseur de Contenu est seul responsable de garantir qu'il dispose de tous les droits nécessaires pour le contenu fourni. En cas de réclamations de tiers concernant la propriété ou une violation, le Fournisseur de Contenu indemnisera Dexsire."
        },
        {
            title: "5. Déclarations et Garanties",
            content: "Le Fournisseur de Contenu déclare et garantit que :\n" +
                    "• Tout le contenu est original ou dûment licencié,\n" +
                    "• Il est légalement autorisé à fournir les services annoncés,\n" +
                    "• Il respectera toutes les lois et réglementations applicables dans sa juridiction."
        },
        {
            title: "6. Durée et Résiliation",
            content: "6.1 Durée\n" +
                    "Ce Contrat prend effet à la Date d'Effet et reste en vigueur jusqu'à sa résiliation par l'une ou l'autre des Parties avec un préavis écrit de 30 jours.\n\n" +
                    "6.2 Résiliation pour Violation\n" +
                    "Dexsire se réserve le droit de résilier immédiatement ce Contrat si le Fournisseur de Contenu :\n" +
                    "• Enfreint les termes de ce Contrat,\n" +
                    "• Soumet un contenu frauduleux, trompeur ou illégal.\n\n" +
                    "6.3 Effets de la Résiliation\n" +
                    "En cas de résiliation :\n" +
                    "• Toutes les licences accordées à Dexsire prendront fin,\n" +
                    "• Le profil et le contenu du Fournisseur de Contenu seront supprimés de la Plateforme."
        },
        {
            title: "7. Indemnisation",
            content: "Le Fournisseur de Contenu s'engage à indemniser, défendre et dégager de toute responsabilité Dexsire, ses affiliés et ses employés contre toute réclamation, responsabilité ou dommage découlant :\n" +
                    "• De la violation de ce Contrat,\n" +
                    "• D'une représentation erronée ou d'un mauvais usage de la Plateforme,\n" +
                    "• De toute réclamation légale relative à la propriété du contenu ou à la prestation des services."
        },
        {
            title: "8. Limitation de Responsabilité",
            content: "La responsabilité de Dexsire en vertu de ce Contrat est limitée aux dommages directs ne dépassant pas les frais totaux payés par le Fournisseur de Contenu au cours des trois mois précédents.\n\n" +
                    "Dexsire ne pourra en aucun cas être tenu responsable des dommages indirects, accessoires ou consécutifs."
        },
        {
            title: "9. Confidentialité",
            content: "Les deux Parties s'engagent à garder confidentielles toutes les informations commerciales, financières ou propriétaires partagées dans le cadre de ce Contrat et à ne pas les divulguer à des tiers sans consentement écrit préalable."
        },
        {
            title: "10. Dispositions Générales",
            content: "10.1 Prestataire Indépendant\n" +
                    "Le Fournisseur de Contenu agit en tant que prestataire indépendant. Ce Contrat ne crée pas de partenariat, de relation employeur-employé ou de coentreprise.\n\n" +
                    "10.2 Accord Complet\n" +
                    "Ce Contrat constitue l'intégralité de l'entente entre les Parties et remplace tout accord antérieur.\n\n" +
                    "10.3 Droit Applicable\n" +
                    "Ce Contrat est régi et interprété conformément aux lois du canton de Vaud, Suisse.\n\n" +
                    "10.4 Résolution des Litiges\n" +
                    "Tout litige sera résolu par des négociations de bonne foi."
        },
        {
            title: "Acceptation des Conditions",
            content: "En cliquant sur « J'accepte » ou en indiquant autrement l'acceptation, le Fournisseur de Contenu reconnaît avoir lu, compris et accepté les termes et conditions de ce Contrat."
        }
    ];

    return (
        <ContainerAuthenticated title="Provider Agreement">
            <TermsContainer>
                <TermsTitle>Accord du Fournisseur de Contenu</TermsTitle>
                <TermsContent>
                    {providerSections.map((section, index) => (
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