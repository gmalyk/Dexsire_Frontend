import React from 'react'
import { useHistory } from 'react-router-dom';
import ContainerUnauthenticated from 'containers/Unauthenticated'
import { TermsContainer, TermsTitle, TermsContent, TermsSection, SectionTitle, SectionText } from 'components/Terms/styled';
import { CenteredContainer, CloseIconContent } from './styled';
import useI18n from 'hooks/useI18n';
import { Icon } from 'ui/styled';

export default function RefundPage() {
    const { t } = useI18n()
    const history = useHistory();

    const handleClose = () => {
        history.goBack();
    };

    const cguSections = [
        {
            "title": "1. Introduction",
            "content": "La présente Politique définit les conditions encadrant les demandes de remboursement et les procédures d'annulation pour les services payants proposés par Dexsire.com (ci-après « Dexsire » ou « Nous »). En souscrivant à nos services ou en effectuant un paiement, vous acceptez et reconnaissez les termes énoncés ci-après."
        },
        {
            "title": "2. Services Concernés",
            "content": "La Politique s'applique à tous les services payants disponibles sur Dexsire, tels que, sans s'y limiter :\n\n" +
                       "• Les abonnements Premium ou VIP,\n" +
                       "• L'accès à des fonctionnalités ou contenus exclusifs,\n" +
                       "• Les crédits ou jetons achetés,\n" +
                       "• Tout autre service facturé proposé sur Dexsire.com."
        },
        {
            "title": "3. Règles Générales de Remboursement",
            "content": "• Nature du Contenu et des Services : Les services proposés sur Dexsire sont principalement des prestations numériques (accès à des fonctionnalités, contenus ou communautés). Dès lors que l'accès à ces services a été accordé, il est souvent impossible de procéder à un remboursement intégral ou partiel, sauf mention contraire dans la présente Politique ou en vertu de la loi applicable.\n\n" +
                       "• Non-cumul des Offres : Les offres promotionnelles, réductions ou avantages spécifiques ne sont pas remboursables si vous annulez ou résiliez le service avant la fin de la période concernée."
        },
        {
            "title": "4. Conditions d'Éligibilité au Remboursement",
            "content": "Dexsire peut, à sa discrétion, accorder un remboursement dans les cas suivants :\n\n" +
                       "1. Problèmes Techniques Majeurs : Si vous ne parvenez pas à accéder aux services payants pour des raisons techniques imputables à Dexsire, et que notre équipe de support n'a pas été en mesure de résoudre le problème dans un délai raisonnable.\n\n" +
                       "2. Erreur de Facturation : Si un montant incorrect a été débité, ou si vous avez été facturé plusieurs fois pour un même service, nous procèderons au remboursement du trop-perçu.\n\n" +
                       "3. Loi Applicable : Lorsque la législation en vigueur impose un droit de rétractation ou un autre mécanisme légal de remboursement, nous respecterons les obligations légales correspondantes."
        },
        {
            "title": "5. Procédure de Demande de Remboursement",
            "content": "1. Contactez notre Support : Toute demande doit être adressée à l'équipe de support de Dexsire (support@dexsire.com) avec les détails suivants :\n\n" +
                       "• Votre nom complet ou identifiant sur Dexsire,\n" +
                       "• Le service concerné (abonnement, crédits, etc.),\n" +
                       "• La date de l'achat ou du prélèvement,\n" +
                       "• Le motif de votre demande.\n\n" +
                       "2. Examen de la Demande : Notre équipe analysera votre requête, vérifiera si les conditions d'éligibilité sont remplies et pourra vous contacter pour obtenir des informations complémentaires.\n\n" +
                       "3. Délais de Traitement : Nous nous efforçons de traiter les demandes de remboursement dans un délai de 10 à 15 jours ouvrables à compter de la réception de toutes les informations requises."
        },
        {
            "title": "6. Annulation et Résiliation de Services",
            "content": "1. Annulation d'un Abonnement en Cours :\n\n" +
                       "• Vous pouvez résilier votre abonnement ou service payant à tout moment dans votre espace « Paramètres » ou en nous contactant par e-mail.\n" +
                       "• Dans la majorité des cas, l'abonnement restera actif jusqu'à la fin de la période de facturation en cours et ne sera pas automatiquement renouvelé.\n" +
                       "• Aucune somme déjà versée ne sera remboursée pour une annulation en cours de période, sauf dans les cas prévus à la section 4.\n\n" +
                       "2. Effet de la Résiliation :\n\n" +
                       "• L'accès aux fonctionnalités Premium ou payantes sera retiré à la fin de la période déjà réglée.\n" +
                       "• Si la résiliation intervient pour non-respect des Conditions Générales d'Utilisation ou pour fraude, Dexsire peut immédiatement suspendre l'accès à votre compte sans remboursement."
        },
        {
            "title": "7. Modes et Délais de Remboursement",
            "content": "• Mode de Remboursement : Les remboursements sont effectués via le même moyen de paiement que celui utilisé lors de l'achat (carte bancaire, plateforme de paiement en ligne, etc.), sauf impossibilité technique.\n\n" +
                       "• Délai d'Apparition : Selon l'établissement bancaire ou l'opérateur de paiement, un délai supplémentaire de quelques jours ouvrables peut s'appliquer avant que la somme ne figure sur votre relevé."
        },
        {
            "title": "8. Frais Connexes ou Partenaires",
            "content": "Dexsire n'est pas responsable des frais supplémentaires éventuels imposés par des tiers, tels que les commissions bancaires, les taux de change ou autres coûts de transaction. Ces montants ne sont généralement pas remboursables par Dexsire."
        },
        {
            "title": "9. Litiges et Médiation",
            "content": "En cas de désaccord concernant une décision de refus de remboursement ou toute autre situation liée à la présente Politique, vous êtes invité à contacter notre service client. Nous tâcherons de trouver une solution amiable. À défaut d'accord, le litige pourra être soumis aux tribunaux compétents conformément à nos Conditions Générales d'Utilisation."
        },
        {
            "title": "10. Modifications de la Politique",
            "content": "Dexsire se réserve le droit de modifier la présente Politique à tout moment pour refléter les évolutions législatives ou l'implémentation de nouvelles procédures internes. Nous informerons les utilisateurs de toute modification substantielle via le Site ou par e-mail. La version en vigueur au moment de votre achat demeure celle applicable à votre transaction.\n\n" +
                       "Pour toute question ou préoccupation relative à cette Politique, veuillez nous contacter à l'adresse suivante : support@dexsire.com.\n\n" +
                       "En utilisant les services payants de Dexsire, vous reconnaissez avoir lu, compris et accepté les modalités de remboursement et d'annulation définies ci-dessus."
        }
    ];
    
    return (
        <ContainerUnauthenticated 
            title="Refund"
            background="/images/background.jpeg"
        >
            <CloseIconContent onClick={handleClose}>
                <Icon icon="close-white" />
            </CloseIconContent>
            <CenteredContainer>
                <TermsContainer>
                    <TermsTitle>Refund Cancellation Policies</TermsTitle>
                    <TermsContent>
                        {cguSections.map((section, index) => (
                            <TermsSection key={index}>
                                <SectionTitle>{section.title}</SectionTitle>
                                <SectionText>{section.content}</SectionText>
                            </TermsSection>
                        ))}
                    </TermsContent>
                </TermsContainer>
            </CenteredContainer>
        </ContainerUnauthenticated>
    )
} 