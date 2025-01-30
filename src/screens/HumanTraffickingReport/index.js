import React from 'react'
import ContainerAuthenticated from 'containers/Authenticated'
import { Container, SubTitle, TermContainer, TermContent, TermText, TermTitle, TextContainer } from './styled';
import { FormSpacer, Title } from 'ui/styled'
import useI18n from 'hooks/useI18n';
import { TermsContainer, TermsTitle, TermsContent, TermsSection, SectionTitle, SectionText } from 'components/Terms/styled';

export default function HumanTraffickingReportPage() {
    const { t } = useI18n()

    const sections = [
        {
            title: "Déclaration de politique générale et ressources en matière de lutte contre la traite des êtres humains",
            content: "Dexsire s'engage pleinement à sensibiliser le public à la problématique de la traite des êtres humains. En tant qu'entreprise en ligne responsable, nous avons choisi d'agir concrètement face à ce fléau. Nous mettons en œuvre des initiatives internes pour lutter contre la traite des êtres humains et participons activement aux efforts de sensibilisation à l'échelle mondiale. Si nous avons connaissance d'un cas de traite, nous intervenons rapidement par des actions internes et collaborons étroitement avec les autorités locales et internationales en charge de cette grave violation des droits humains.\n\n" +
                    "Pour signaler un cas suspect, veuillez nous écrire à l'adresse suivante : help@dexsire.ch. Nous vous encourageons également à contacter directement les autorités compétentes."
        },
        {
            title: "Pourquoi est-il crucial de mettre fin à la traite des êtres humains ?",
            content: "En Suisse, la prostitution et les services d'escorte indépendants sont légaux. Cependant, certaines personnes exploitent ce cadre légal pour commettre des abus et violer les droits humains. Lorsqu'une femme ou un homme choisit librement de se prostituer, ce choix doit être respecté et traité avec dignité. À l'inverse, contraindre une personne, qu'elle soit suisse ou étrangère, à se prostituer constitue une atteinte grave à ses droits fondamentaux.\n\n" +
                    "Lutter contre ces abus permet de préserver la dignité humaine. De nombreux pays manquent de ressources pour assurer la sécurité, les soins de santé et l'éducation de leurs citoyens, ce qui exacerbe le problème. En Suisse, des efforts significatifs ont été réalisés pour mettre fin à ces abus et protéger les victimes.\n\n" +
                    "Le site Human Trafficking Help and Resources fournit des informations détaillées sur les signes de la traite et offre un soutien aux victimes. Consultez leur plateforme pour en savoir davantage."
        },
        {
            title: "Signes avant-coureurs de la traite des êtres humains",
            content: "Nous utilisons ici le terme TDS (Travailleuse/Travailleur du Sexe) pour désigner les personnes exerçant dans ce domaine, afin de simplifier la lecture.\n\n" +
                    "• Une TDS est-elle toujours accompagnée d'une autre personne ?\n" +
                    "• Cette personne parle-t-elle à sa place ou semble-t-elle exercer un contrôle sur elle ?\n" +
                    "• La TDS semble-t-elle avoir peur ou hésiter à interagir avec d'autres ?\n" +
                    "• Existe-t-il des barrières linguistiques ou des signes de peur manifeste lors des échanges ?\n" +
                    "• La TDS semble-t-elle mineure ou proche de l'être ?\n\n" +
                    "Pour des informations détaillées, visitez le site du Projet Polaris."
        },
        {
            title: "Ressources et signalements en cas de traite des êtres humains",
            content: "En cas de doute ou d'urgence en Suisse, composez immédiatement le 117 (police).\n\n" +
                    "Vous pouvez également signaler les cas auprès des brigades cantonales suivantes :\n\n" +
                    "• Genève : +41 22 427 71 50\n" +
                    "• Vaud : +41 21 315 15 15\n" +
                    "• Neuchâtel : +41 32 889 68 10\n" +
                    "• Valais : +41 27 606 56 90\n" +
                    "• Fribourg : +41 26 305 19 19\n" +
                    "• Jura : +41 32 420 76 00\n" +
                    "• Berne : +41 31 638 81 11\n" +
                    "• Zurich : +41 58 648 48 48"
        },
        {
            title: "Ressources pour lutter contre la traite des êtres humains",
            content: "Il existe de nombreuses façons de signaler les abus liés à la traite des êtres humains. Outre les centres disponibles en Suisse, des organisations internationales, telles que l'Organisation internationale pour les migrations (OIM) ou Interpol, peuvent également être sollicitées. Voici une liste des principales ressources disponibles en Suisse :\n\n" +
                    "• OIM : Thunstrasse 11, Postfach 216, 3000 Berne | Tél : +41 31 350 82 11\n" +
                    "• Fedpol : Nussbaumstrasse 29, 3003 Berne | Tél : +41 58 463 11 23\n" +
                    "• Act212.ch : Tél : +41 76 261 51 28\n" +
                    "• FIZ : Tél : +41 44 436 90 00\n" +
                    "• Trafficked Victim Unit : Tél : +41 44 585 35 45\n" +
                    "• Astrée : 7 Ruelle de Bourg, 1003 Lausanne | Tél : +41 21 544 27 97"
        },
        {
            title: "Organisations de soutien aux victimes et aux prostituées",
            content: "De nombreuses associations suisses accompagnent les victimes de la traite et travaillent à leur protection. Voici quelques ressources utiles :\n\n" +
                    "Viol Secours (Genève)\n" +
                    "Place des Charmilles 3, 1203 Genève\n" +
                    "Tél : +41 22 345 20 20 | info@viol-secours.ch | www.viol-secours.ch\n\n" +
                    "Aspasie (Genève)\n" +
                    "Rue des Pâquis 11, 1201 Genève\n" +
                    "Tél : +41 22 732 68 28 | aspasie@aspasie.ch | www.aspasie.ch\n\n" +
                    "Fleur de Pavé (Lausanne)\n" +
                    "Rue Sévelin 32, 1004 Lausanne\n" +
                    "Tél : +41 21 661 31 21 | fleurdepave@bluewin.ch | www.fleurdepave.ch\n\n" +
                    "Association Grisélidis (Fribourg)\n" +
                    "Rue Guilliman 12, 1700 Fribourg\n" +
                    "Tél : +41 26 321 49 45 | griselidis@bluewin.ch | www.griselidis.ch\n\n" +
                    "Antenne Valais Romand (Sion)\n" +
                    "Avenue des Mayennets 12, 1950 Sion\n" +
                    "Tél : +41 27 329 04 23 | info@antennesida.ch | www.antennesida.ch"
        },
        {
            title: "Déclaration de non-responsabilité",
            content: "Les informations et liens fournis ci-dessus sont destinés à sensibiliser et à informer nos utilisateurs, membres et victimes potentielles de la traite des êtres humains. Nous ne garantissons pas l'exactitude des données ni la légitimité des programmes ou entités tiers mentionnés. Nous déclinons toute responsabilité quant à l'usage de ces ressources. Ce contenu n'a pas vocation à fournir des conseils juridiques, médicaux ou professionnels."
        },
        {
            title: "Numéros d'urgence",
            content: "Police : 117\n" +
                    "Feu : 118\n" +
                    "Urgences médicales : 144"
        }
    ];

    return (
        <ContainerAuthenticated title="Rapport sur la traite des êtres humains">
            <TermsContainer>
                <TermsTitle>Rapport sur la traite des êtres humains</TermsTitle>
                <TermsContent>
                    {sections.map((section, index) => (
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