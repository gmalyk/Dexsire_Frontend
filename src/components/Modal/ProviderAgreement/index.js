import React from 'react'
import Wrapper from '../Wrapper'
import Terms from 'components/Terms';
import useI18n from 'hooks/useI18n';
import { ModalContent } from 'ui/styled';

export default function ModalProviderAgreement() {
  const { t } = useI18n()
  
  const terms = [
    {
      title: "1. Objet du Contrat",
      content: "L'objectif de ce Contrat est de définir les conditions générales dans lesquelles le Fournisseur de Contenu répertorie, télécharge et gère son profil et/ou son contenu sur la plateforme Dexsire (la « Plateforme »)."
    },
    {
      title: "2. Gestion du Contenu et du Profil",
      content: `2.1 Soumission de Contenu
Le Fournisseur de Contenu s'engage à fournir des informations précises, actuelles et véridiques, notamment :
● Une description personnelle/professionnelle,
● Des photographies, vidéos ou autres contenus multimédias,
● Les détails des prix, plannings et disponibilités.

2.2 Normes de Contenu
Les matériaux fournis par le Fournisseur de Contenu doivent :
● Être conformes aux lois et réglementations applicables,
● Ne pas enfreindre les droits de propriété intellectuelle de tiers,
● Ne contenir aucun contenu obscène, diffamatoire ou illégal.

2.3 Mises à Jour et Maintenance
Le Fournisseur de Contenu doit mettre à jour son profil afin de garantir l'exactitude et la pertinence des informations.

2.4 Droit de Vérification
Dexsire se réserve le droit de :
● Examiner et approuver le contenu avant sa publication,
● Demander des modifications pour respecter les directives de la plateforme,
● Supprimer tout contenu qui enfreint ce Contrat ou une loi applicable.`
    },
    {
      title: "3. Modalités de Paiement",
      content: `3.1 Commissions et Frais
Dexsire facturera des frais pour le référencement ou l'utilisation de la Plateforme. Les détails des structures de commission, frais d'abonnement ou paiements uniques seront précisés dans une Grille Tarifaire distincte fournie lors de la signature.

3.2 Calendrier des Paiements
Les Fournisseurs de Contenu recevront des paiements pour les services rendus via la Plateforme à des intervalles convenus par écrit (hebdomadaires, bihebdomadaires ou mensuels). Les paiements seront effectués par un moyen convenu mutuellement (virement bancaire, PayPal, etc.).

3.3 Déductions
Dexsire peut déduire des commissions, taxes ou frais avant de transférer le paiement final au Fournisseur de Contenu.

3.4 Litiges Relatifs aux Paiements
Tout litige relatif aux paiements doit être signalé dans les 15 jours suivant la réception du paiement.`
    },
    {
      title: "4. Propriété et Licence",
      content: `4.1 Propriété du Contenu
Le Fournisseur de Contenu conserve la propriété de tout contenu soumis sur la Plateforme.

4.2 Licence d'Utilisation
Le Fournisseur de Contenu accorde à Dexsire une licence non exclusive et sans redevance pour :
● Afficher, distribuer et promouvoir le contenu sur la Plateforme,
● Utiliser le contenu à des fins de marketing ou de publicité.

4.3 Réclamations de Tiers
Le Fournisseur de Contenu est seul responsable de garantir qu'il dispose de tous les droits nécessaires pour le contenu fourni. En cas de réclamations de tiers concernant la propriété ou une violation, le Fournisseur de Contenu indemnisera Dexsire.`
    },
    {
      title: "5. Déclarations et Garanties",
      content: `Le Fournisseur de Contenu déclare et garantit que :
● Tout le contenu est original ou dûment licencié,
● Il est légalement autorisé à fournir les services annoncés,
● Il respectera toutes les lois et réglementations applicables dans sa juridiction.`
    },
    {
      title: "6. Durée et Résiliation",
      content: `6.1 Durée
Ce Contrat prend effet à la Date d'Effet et reste en vigueur jusqu'à sa résiliation par l'une ou l'autre des Parties avec un préavis écrit de 30 jours.

6.2 Résiliation pour Violation
Dexsire se réserve le droit de résilier immédiatement ce Contrat si le Fournisseur de Contenu :
● Enfreint les termes de ce Contrat,
● Soumet un contenu frauduleux, trompeur ou illégal.

6.3 Effets de la Résiliation
En cas de résiliation :
● Toutes les licences accordées à Dexsire prendront fin,
● Le profil et le contenu du Fournisseur de Contenu seront supprimés de la Plateforme.`
    },
    {
      title: "7. Indemnisation",
      content: `Le Fournisseur de Contenu s'engage à indemniser, défendre et dégager de toute responsabilité Dexsire, ses affiliés et ses employés contre toute réclamation, responsabilité ou dommage découlant :
● De la violation de ce Contrat,
● D'une représentation erronée ou d'un mauvais usage de la Plateforme,
● De toute réclamation légale relative à la propriété du contenu ou à la prestation des services.`
    },
    {
      title: "8. Limitation de Responsabilité",
      content: `La responsabilité de Dexsire en vertu de ce Contrat est limitée aux dommages directs ne dépassant pas les frais totaux payés par le Fournisseur de Contenu au cours des trois mois précédents.

Dexsire ne pourra en aucun cas être tenu responsable des dommages indirects, accessoires ou consécutifs.`
    },
    {
      title: "9. Confidentialité",
      content: "Les deux Parties s'engagent à garder confidentielles toutes les informations commerciales, financières ou propriétaires partagées dans le cadre de ce Contrat et à ne pas les divulguer à des tiers sans consentement écrit préalable."
    },
    {
      title: "10. Dispositions Générales",
      content: `10.1 Prestataire Indépendant
Le Fournisseur de Contenu agit en tant que prestataire indépendant. Ce Contrat ne crée pas de partenariat, de relation employeur-employé ou de coentreprise.

10.2 Accord Complet
Ce Contrat constitue l'intégralité de l'entente entre les Parties et remplace tout accord antérieur.

10.3 Droit Applicable
Ce Contrat est régi et interprété conformément aux lois du canton de Vaud, Suisse.

10.4 Résolution des Litiges
Tout litige sera résolu par des négociations de bonne foi.

Acceptation des Conditions
En cliquant sur « J'accepte » ou en indiquant autrement l'acceptation, le Fournisseur de Contenu reconnaît avoir lu, compris et accepté les termes et conditions de ce Contrat.`
    }
  ];

  return (
    <>
      <Wrapper>
        <ModalContent id="modal-content" type="provider-agreement">
          <Terms 
            terms={terms} 
            title="Accord du Fournisseur de Contenu"
          />
        </ModalContent>
      </Wrapper>
    </>
  )
} 