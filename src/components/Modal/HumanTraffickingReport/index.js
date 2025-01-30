import React from 'react'
import Wrapper from '../Wrapper'
import Terms from 'components/Terms';
import useI18n from 'hooks/useI18n';
import { ModalContent } from 'ui/styled';

export default function ModalHumanTraffickingReport() {
  const { t } = useI18n()
  
  const terms = [
    {
      title: "Déclaration de politique générale et ressources en matière de lutte contre la traite des êtres humains",
      content: "Dexsire s'engage pleinement à sensibiliser le public à la problématique de la traite des êtres humains. En tant qu'entreprise en ligne responsable, nous avons choisi d'agir concrètement face à ce fléau. Nous mettons en œuvre des initiatives internes pour lutter contre la traite des êtres humains et participons activement aux efforts de sensibilisation à l'échelle mondiale. Si nous avons connaissance d'un cas de traite, nous intervenons rapidement par des actions internes et collaborons étroitement avec les autorités locales et internationales en charge de cette grave violation des droits humains.\n\nPour signaler un cas suspect, veuillez nous écrire à l'adresse suivante : help@dexsire.ch. Nous vous encourageons également à contacter directement les autorités compétentes."
    },
    {
      title: "Pourquoi est-il crucial de mettre fin à la traite des êtres humains ?",
      content: "En Suisse, la prostitution et les services d'escorte indépendants sont légaux. Cependant, certaines personnes exploitent ce cadre légal pour commettre des abus et violer les droits humains. Lorsqu'une femme ou un homme choisit librement de se prostituer, ce choix doit être respecté et traité avec dignité. À l'inverse, contraindre une personne, qu'elle soit suisse ou étrangère, à se prostituer constitue une atteinte grave à ses droits fondamentaux.\n\nLutter contre ces abus permet de préserver la dignité humaine. De nombreux pays manquent de ressources pour assurer la sécurité, les soins de santé et l'éducation de leurs citoyens, ce qui exacerbe le problème. En Suisse, des efforts significatifs ont été réalisés pour mettre fin à ces abus et protéger les victimes.\n\nLe site Human Trafficking Help and Resources fournit des informations détaillées sur les signes de la traite et offre un soutien aux victimes. Consultez leur plateforme pour en savoir davantage."
    },
    {
      title: "Signes avant-coureurs de la traite des êtres humains",
      content: `Nous utilisons ici le terme TDS (Travailleuse/Travailleur du Sexe) pour désigner les personnes exerçant dans ce domaine, afin de simplifier la lecture.

● Une TDS est-elle toujours accompagnée d'une autre personne ?
● Cette personne parle-t-elle à sa place ou semble-t-elle exercer un contrôle sur elle ?
● La TDS semble-t-elle avoir peur ou hésiter à interagir avec d'autres ?
● Existe-t-il des barrières linguistiques ou des signes de peur manifeste lors des échanges ?
● La TDS semble-t-elle mineure ou proche de l'être ?

Pour des informations détaillées, visitez le site du Projet Polaris.`
    },
    {
      title: "Ressources et signalements en cas de traite des êtres humains",
      content: `En cas de doute ou d'urgence en Suisse, composez immédiatement le 117 (police).

Vous pouvez également signaler les cas auprès des brigades cantonales suivantes :
● Genève : +41 22 427 71 50
● Vaud : +41 21 315 15 15
● Neuchâtel : +41 32 889 68 10
● Valais : +41 27 606 56 90
● Fribourg : +41 26 305 19 19
● Jura : +41 32 420 76 00
● Berne : +41 31 638 81 11
● Zurich : +41 58 648 48 48`
    },
    {
      title: "Ressources pour lutter contre la traite des êtres humains",
      content: `Il existe de nombreuses façons de signaler les abus liés à la traite des êtres humains. Outre les centres disponibles en Suisse, des organisations internationales, telles que l'Organisation internationale pour les migrations (OIM) ou Interpol, peuvent également être sollicitées. Voici une liste des principales ressources disponibles en Suisse :

● OIM : Thunstrasse 11, Postfach 216, 3000 Berne | Tél : +41 31 350 82 11
● Fedpol : Nussbaumstrasse 29, 3003 Berne | Tél : +41 58 463 11 23
● Act212.ch : Tél : +41 76 261 51 28
● FIZ : Tél : +41 44 436 90 00
● Trafficked Victim Unit : Tél : +41 44 585 35 45
● Astrée : 7 Ruelle de Bourg, 1003 Lausanne | Tél : +41 21 544 27 97`
    },
    {
      title: "Organisations de soutien aux victimes et aux prostituées",
      content: `De nombreuses associations suisses accompagnent les victimes de la traite et travaillent à leur protection. Voici quelques ressources utiles :

Viol Secours (Genève)
Place des Charmilles 3, 1203 Genève
Tél : +41 22 345 20 20 | info@viol-secours.ch | www.viol-secours.ch

Aspasie (Genève)
Rue des Pâquis 11, 1201 Genève
Tél : +41 22 732 68 28 | aspasie@aspasie.ch | www.aspasie.ch

Fleur de Pavé (Lausanne)
Rue Sévelin 32, 1004 Lausanne
Tél : +41 21 661 31 21 | fleurdepave@bluewin.ch | www.fleurdepave.ch

Association Grisélidis (Fribourg)
Rue Guilliman 12, 1700 Fribourg
Tél : +41 26 321 49 45 | griselidis@bluewin.ch | www.griselidis.ch

Antenne Valais Romand (Sion)
Avenue des Mayennets 12, 1950 Sion
Tél : +41 27 329 04 23 | info@antennesida.ch | www.antennesida.ch`
    },
    {
      title: "Déclaration de non-responsabilité",
      content: `Les informations et liens fournis ci-dessus sont destinés à sensibiliser et à informer nos utilisateurs, membres et victimes potentielles de la traite des êtres humains. Nous ne garantissons pas l'exactitude des données ni la légitimité des programmes ou entités tiers mentionnés. Nous déclinons toute responsabilité quant à l'usage de ces ressources. Ce contenu n'a pas vocation à fournir des conseils juridiques, médicaux ou professionnels.

Numéros d'urgence :
Police : 117
Feu : 118
Urgences médicales : 144`
    }
  ];

  return (
    <>
      <Wrapper>
        <ModalContent id="modal-content" type="human-trafficking-report">
          <Terms 
            terms={terms} 
            title="Rapport sur la traite des êtres humains"
          />
        </ModalContent>
      </Wrapper>
    </>
  )
} 