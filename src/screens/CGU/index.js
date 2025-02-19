import React from 'react'
import { useHistory } from 'react-router-dom';
import ContainerUnauthenticated from 'containers/Unauthenticated'
import { TermsContainer, TermsTitle, TermsContent, TermsSection, SectionTitle, SectionText } from 'components/Terms/styled';
import { CenteredContainer, CloseIconContent } from './styled';
import useI18n from 'hooks/useI18n';
import { Icon } from 'ui/styled';

export default function CGUPage() {
    const { t } = useI18n()
    const history = useHistory();

    const handleClose = () => {
        history.goBack();
    };

    const cguSections = [
        {
            title: "1. Introduction",
            content: "1.1. Dexsire.com (« le Site ») est une plateforme de rencontre en ligne destinée à favoriser les connexions entre personnes majeures en Suisse et ailleurs.\n\n" +
                    "1.2. Les présentes Conditions Générales d'Utilisation (« CGU ») ont pour objet de définir les règles d'utilisation du Site par ses utilisateurs (« Utilisateurs »).\n\n" +
                    "1.3. En accédant ou en utilisant le Site, vous acceptez pleinement et sans réserve ces CGU. Si vous ne les acceptez pas, veuillez ne pas utiliser le Site."
        },
        {
            title: "2. Accès au Site",
            content: "2.1. Le Site est accessible à toute personne disposant d'une connexion Internet et d'un appareil compatible.\n\n" +
                    "2.2. Certaines sections du Site peuvent être réservées aux membres inscrits.\n\n" +
                    "2.3. Dexsire.com se réserve le droit de suspendre ou de restreindre l'accès à tout ou partie du Site pour des raisons techniques, de maintenance ou de sécurité."
        },
        {
            title: "3. Inscription et Compte Utilisateur",
            content: "3.1. L'inscription est réservée aux personnes majeures (18 ans et plus) disposant de leur pleine capacité juridique.\n\n" +
                    "3.2. L'Utilisateur s'engage à fournir des informations véridiques, exactes et complètes lors de son inscription.\n\n" +
                    "3.3. Chaque Utilisateur ne peut créer qu'un seul compte. La création de comptes multiples est interdite.\n\n" +
                    "3.4. L'Utilisateur est seul responsable de la confidentialité de ses identifiants et des actions réalisées via son compte."
        },
        {
            title: "4. Obligations et Comportement des Utilisateurs",
            content: "4.1. Les Utilisateurs doivent respecter les lois et règlements en vigueur, ainsi que les droits des autres utilisateurs.\n\n" +
                    "4.2. Il est interdit de :\n" +
                    "• Publier du contenu illicite, violent, diffamatoire, obscène, discriminatoire ou portant atteinte aux droits d'autrui.\n" +
                    "• Harceler, tromper ou exploiter les autres utilisateurs.\n" +
                    "• Utiliser le Site à des fins commerciales sans autorisation préalable.\n" +
                    "• Introduire des virus ou tout autre logiciel malveillant.\n\n" +
                    "4.3. Toute violation de ces règles peut entraîner la suspension ou la suppression du compte de l'Utilisateur fautif."
        },
        {
            title: "5. Contenu Généré par les Utilisateurs",
            content: "5.1. Les Utilisateurs peuvent publier du contenu sur le Site (photos, textes, etc.), sous réserve de respecter les règles énoncées aux présentes CGU.\n\n" +
                    "5.2. En publiant du contenu, l'Utilisateur accorde à Dexsire.com une licence gratuite, mondiale et non exclusive pour utiliser, reproduire, modifier et distribuer ce contenu dans le cadre des services du Site.\n\n" +
                    "5.3. Dexsire.com se réserve le droit de modérer ou de supprimer tout contenu non conforme."
        },
        {
            title: "6. Protection des Données Personnelles",
            content: "6.1. Dexsire.com collecte et traite les données personnelles des Utilisateurs conformément à la législation suisse sur la protection des données.\n\n" +
                    "6.2. Les données collectées sont utilisées pour fournir et améliorer les services, ainsi que pour établir des communications marketing avec le consentement des Utilisateurs.\n\n" +
                    "6.3. Les Utilisateurs disposent d'un droit d'accès, de rectification, de suppression et de portabilité de leurs données. Ces droits peuvent être exercés en contactant Dexsire.com à l'adresse support@dexsire.com."
        },
        {
            title: "7. Fonctionnement Technique",
            content: "7.1. Dexsire.com s'efforce de maintenir le Site accessible et fonctionnel. Toutefois, des interruptions temporaires peuvent survenir pour maintenance ou pour des raisons techniques.\n\n" +
                    "7.2. Dexsire.com n'est pas responsable des pertes ou dommages causés par des problèmes techniques ou des interruptions de service."
        },
        {
            title: "8. Paiements et Services Premium",
            content: "8.1. Certaines fonctionnalités du Site peuvent être accessibles uniquement moyennant paiement.\n\n" +
                    "8.2. Les conditions spécifiques liées aux services payants sont précisées au moment de l'achat.\n\n" +
                    "8.3. Les paiements effectués ne sont pas remboursables, sauf dispositions contraires prévues par la loi."
        },
        {
            title: "9. Propriété Intellectuelle",
            content: "9.1. Tous les éléments du Site (textes, graphiques, logos, images, logiciels, etc.) sont la propriété exclusive de Dexsire.com ou de ses partenaires.\n\n" +
                    "9.2. Toute reproduction, représentation ou exploitation non autorisée des éléments du Site est strictement interdite."
        },
        {
            title: "10. Responsabilité",
            content: "10.1. Dexsire.com agit en tant qu'intermédiaire et ne peut être tenu responsable des interactions entre Utilisateurs.\n\n" +
                    "10.2. Dexsire.com n'est pas responsable des dommages directs ou indirects liés à l'utilisation du Site."
        },
        {
            title: "11. Signalement et Réclamations",
            content: "11.1. Les Utilisateurs peuvent signaler tout abus, contenu illicite ou comportement suspect via le formulaire de contact du Site.\n\n" +
                    "11.2. Dexsire.com s'engage à examiner rapidement les signalements et à prendre les mesures appropriées."
        },
        {
            title: "12. Modification des CGU",
            content: "12.1. Dexsire.com se réserve le droit de modifier les présentes CGU à tout moment.\n\n" +
                    "12.2. Les Utilisateurs seront informés des modifications via le Site ou par e-mail. L'utilisation continue du Site après la modification vaut acceptation des nouvelles CGU."
        },
        {
            title: "13. Résiliation",
            content: "13.1. Les Utilisateurs peuvent supprimer leur compte à tout moment en accédant aux paramètres de leur compte.\n\n" +
                    "13.2. Dexsire.com peut résilier un compte en cas de violation des présentes CGU."
        },
        {
            title: "14. Droit Applicable et For Juridique",
            content: "14.1. Les présentes CGU sont régies par le droit suisse.\n\n" +
                    "14.2. Tout litige relévant des présentes CGU sera soumis à la juridiction exclusive des tribunaux du canton de Vaud."
        },
        {
            title: "15. Contact",
            content: "Pour toute question ou demande d'assistance, veuillez contacter Dexsire.com à l'adresse suivante : support@dexsire.com."
        },
        {
            title: "16. Politique de Lutte contre la Traite des Êtres Humains, l'Exploitation Sexuelle et l'Abus",
            content: "16.1. Politique Générale\n\n" +
                    "Dexsire.com (ci-après « le Marchand ») s'engage fermement à interdire toute utilisation de son site pouvant encourager, promouvoir ou faciliter la traite des êtres humains, la traite à des fins d'exploitation sexuelle ou tout abus. À ce titre, le Marchand a mis en place des politiques internes et des procédures de vigilance permettant de prévenir, détecter et signaler tout usage illégal ou contraire à la dignité humaine.\n\n" +
                    "En cas de soupçon d'abus ou de trafic, Dexsire.com se réserve le droit de prendre des mesures immédiates, incluant la suppression de compte ou la transmission d'informations pertinentes aux autorités compétentes."
        },
        {
            title: "16.2. Engagements et Ressources Internes",
            content: "• Dexsire s'engage à sensibiliser ses équipes internes à la détection et au signalement d'éventuels cas de traite des êtres humains.\n" +
                     "• Des actions de veille et de modération sont régulièrement entreprises pour identifier et bloquer d'éventuels contenus, profils ou annonces suspectes.\n" +
                     "• Toute personne suspectant un cas de traite est invitée à contacter immédiatement Dexsire à l'adresse e-mail : help@dexsire.ch, et à informer les autorités compétentes."
        },
        {
            title: "16.3. Signes avant-coureurs de la Traite et de l'Exploitation",
            content: "Il est important de savoir reconnaître certains indices :\n\n" +
                     "• Une personne est-elle toujours accompagnée par un tiers qui semble parler à sa place ou exercer un contrôle ?\n" +
                     "• La personne paraît-elle apeurée, hésitante ou montre-t-elle des signes de contrainte ?\n" +
                     "• Y a-t-il des barrières linguistiques ou des manifestations de crainte inhabituelles lors des interactions ?\n" +
                     "• Semble-t-il y avoir un doute quant à la majorité de la personne ?\n\n" +
                     "Toute situation laissant présumer qu'un individu est sous contrainte ou exploité doit être signalée."
        },
        {
            title: "16.4. Signalements et Aide d'Urgence",
            content: "• En Suisse, le numéro d'urgence de la police est le 117.\n" +
                     "• Vous pouvez également contacter les brigades cantonales :\n" +
                     "  ○ Genève : +41 22 427 71 50\n" +
                     "  ○ Vaud : +41 21 315 15 15\n" +
                     "  ○ Neuchâtel : +41 32 889 68 10\n" +
                     "  ○ Valais : +41 27 606 56 90\n" +
                     "  ○ Fribourg : +41 26 305 19 19\n" +
                     "  ○ Jura : +41 32 420 76 00\n" +
                     "  ○ Berne : +41 31 638 81 11\n" +
                     "  ○ Zurich : +41 58 648 48 48"
        },
        {
            title: "16.5. Ressources et Organisations de Soutien",
            content: "Vous trouverez ci-dessous une liste non exhaustive de ressources et d'organisations actives dans la lutte contre la traite et le soutien aux victimes :\n\n" +
                     "• **OIM (Organisation Internationale pour les Migrations)**\n" +
                     "  ○ Thunstrasse 11, Postfach 216, 3000 Berne\n" +
                     "  ○ Tél : +41 31 350 82 11\n\n" +
                     "• **Fedpol (Police Fédérale)**\n" +
                     "  ○ Nussbaumstrasse 29, 3003 Berne\n" +
                     "  ○ Tél : +41 58 463 11 23\n\n" +
                     "• **Act212**\n" +
                     "  ○ Tél : +41 76 261 51 28 | [act212.ch](http://act212.ch)\n\n" +
                     "• **FIZ**\n" +
                     "  ○ Tél : +41 44 436 90 00 | [fiz-info.ch](https://www.fiz-info.ch/fr/Willkommen)\n\n" +
                     "• **Trafficked Victim Unit**\n" +
                     "  ○ Tél : +41 44 585 35 45\n\n" +
                     "• **Astrée (Lausanne)**\n" +
                     "  ○ 7 Ruelle de Bourg, 1003 Lausanne\n" +
                     "  ○ Tél : +41 21 544 27 97 | [astree.ch](https://www.astree.ch)\n\n" +
                     "Des associations cantonales et locales (Aspasie, Fleur de Pavé, Association Grisélidis, etc.) fournissent également des aides spécialisées."
        },
        {
            title: "16.6. Déclaration de Non-Responsabilité",
            content: "Les informations et liens ci-dessus visent à sensibiliser et à informer les Utilisateurs, membres et victimes potentielles de la traite des êtres humains. Dexsire.com ne garantit pas l'exactitude permanente de ces ressources externes ni la légitimité des entités mentionnées.\n\n" +
                     "Le Site décline toute responsabilité quant à l'usage de ces informations et ne fournit pas de conseils juridiques, médicaux ou professionnels.\n\n" +
                     "En utilisant le Site Dexsire.com, l'Utilisateur reconnaît avoir pris connaissance de l'ensemble des dispositions ci-dessus, incluant la Politique de Lutte contre la Traite des êtres humains, l'Exploitation Sexuelle et l'Abus, et s'engage à respecter scrupuleusement les présentes Conditions Générales d'Utilisation."
        }
    ];

    return (
        <ContainerUnauthenticated 
            title="CGU"
            background="/images/background.jpeg"
        >
            <CloseIconContent onClick={handleClose}>
                <Icon icon="close-white" />
            </CloseIconContent>
            <CenteredContainer>
                <TermsContainer>
                    <TermsTitle>Conditions Générales d'Utilisation</TermsTitle>
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