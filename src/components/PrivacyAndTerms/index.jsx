import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Button from "components/Form/Button";
import {
    Content,
    FormContainer,
    ButtonContent,
} from './styled';
import { PageBackground } from 'components/Terms/styled';

const PrivacyAndTerms = ({ onAccept, loading, t }) => {
    const [step, setStep] = useState(1);

    const handleContinue = () => {
        if (step === 1) {
            setStep(2);
        } else {
            onAccept();
        }
    };


    
    return (
            <Container>
                <Content>
                    <FormContainer>
                        <div className="policy-container" style={{
                            borderRadius: '8px',
                            padding: '2px',
                            color: 'white'
                        }}>
                            <div style={{
                                height: '600px',
                                backgroundColor: 'white',
                                borderRadius: '33px',
                                padding: '10px',
                                overflowY: 'auto',
                                color: '#1a202c'
                            }}>
                                {step === 1 ? (
                                    <div>
                                       
                                        <div style={{ 
                                            maxHeight: '580px', 
                                            overflowY: 'auto', 
                                            padding: '15px', 
                                            borderRadius: '8px',
                                            lineHeight: '1.6'
                                        }}>
                                            
                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>1. Introduction</h4>
                                            <p>1.1. Dexsire.com (« le Site ») est une plateforme de rencontre en ligne destinée à favoriser les connexions entre personnes majeures en Suisse et ailleurs.</p>
                                            <p>1.2. Les présentes Conditions Générales d'Utilisation (« CGU ») ont pour objet de définir les règles d'utilisation du Site par ses utilisateurs (« Utilisateurs »).</p>
                                            <p>1.3. En accédant ou en utilisant le Site, vous acceptez pleinement et sans réserve ces CGU. Si vous ne les acceptez pas, veuillez ne pas utiliser le Site.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>2. Accès au Site</h4>
                                            <p>2.1. Le Site est accessible à toute personne disposant d'une connexion Internet et d'un appareil compatible.</p>
                                            <p>2.2. Certaines sections du Site peuvent être réservées aux membres inscrits.</p>
                                            <p>2.3. Dexsire.com se réserve le droit de suspendre ou de restreindre l'accès à tout ou partie du Site pour des raisons techniques, de maintenance ou de sécurité.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>3. Inscription et Compte Utilisateur</h4>
                                            <p>3.1. L'inscription est réservée aux personnes majeures (18 ans et plus) disposant de leur pleine capacité juridique.</p>
                                            <p>3.2. L'Utilisateur s'engage à fournir des informations véridiques, exactes et complètes lors de son inscription.</p>
                                            <p>3.3. Chaque Utilisateur ne peut créer qu'un seul compte. La création de comptes multiples est interdite.</p>
                                            <p>3.4. L'Utilisateur est seul responsable de la confidentialité de ses identifiants et des actions réalisées via son compte.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>4. Obligations et Comportement des Utilisateurs</h4>
                                            <p>4.1. Les Utilisateurs doivent respecter les lois et règlements en vigueur, ainsi que les droits des autres utilisateurs.</p>
                                            <p>4.2. Il est interdit de :</p>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                <li>Publier du contenu illicite, violent, diffamatoire, obscène, discriminatoire ou portant atteinte aux droits d'autrui.</li>
                                                <li>Harceler, tromper ou exploiter les autres utilisateurs.</li>
                                                <li>Utiliser le Site à des fins commerciales sans autorisation préalable.</li>
                                                <li>Introduire des virus ou tout autre logiciel malveillant.</li>
                                            </ul>
                                            <p>4.3. Toute violation de ces règles peut entraîner la suspension ou la suppression du compte de l'Utilisateur fautif.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>5. Contenu Généré par les Utilisateurs</h4>
                                            <p>5.1. Les Utilisateurs peuvent publier du contenu sur le Site (photos, textes, etc.), sous réserve de respecter les règles énoncées aux présentes CGU.</p>
                                            <p>5.2. En publiant du contenu, l'Utilisateur accorde à Dexsire.com une licence gratuite, mondiale et non exclusive pour utiliser, reproduire, modifier et distribuer ce contenu dans le cadre des services du Site.</p>
                                            <p>5.3. Dexsire.com se réserve le droit de modérer ou de supprimer tout contenu non conforme.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>6. Protection des Données Personnelles</h4>
                                            <p>6.1. Dexsire.com collecte et traite les données personnelles des Utilisateurs conformément à la législation suisse sur la protection des données.</p>
                                            <p>6.2. Les données collectées sont utilisées pour fournir et améliorer les services, ainsi que pour établir des communications marketing avec le consentement des Utilisateurs.</p>
                                            <p>6.3. Les Utilisateurs disposent d'un droit d'accès, de rectification, de suppression et de portabilité de leurs données. Ces droits peuvent être exercés en contactant Dexsire.com à l'adresse support@dexsire.com.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>7. Fonctionnement Technique</h4>
                                            <p>7.1. Dexsire.com s'efforce de maintenir le Site accessible et fonctionnel. Toutefois, des interruptions temporaires peuvent survenir pour maintenance ou pour des raisons techniques.</p>
                                            <p>7.2. Dexsire.com n'est pas responsable des pertes ou dommages causés par des problèmes techniques ou des interruptions de service.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>8. Paiements et Services Premium</h4>
                                            <p>8.1. Certaines fonctionnalités du Site peuvent être accessibles uniquement moyennant paiement.</p>
                                            <p>8.2. Les conditions spécifiques liées aux services payants sont précisées au moment de l'achat.</p>
                                            <p>8.3. Les paiements effectués ne sont pas remboursables, sauf dispositions contraires prévues par la loi.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>9. Propriété Intellectuelle</h4>
                                            <p>9.1. Tous les éléments du Site (textes, graphiques, logos, images, logiciels, etc.) sont la propriété exclusive de Dexsire.com ou de ses partenaires.</p>
                                            <p>9.2. Toute reproduction, représentation ou exploitation non autorisée des éléments du Site est strictement interdite.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>10. Responsabilité</h4>
                                            <p>10.1. Dexsire.com agit en tant qu'intermédiaire et ne peut être tenu responsable des interactions entre Utilisateurs.</p>
                                            <p>10.2. Dexsire.com n'est pas responsable des dommages directs ou indirects liés à l'utilisation du Site.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>11. Signalement et Réclamations</h4>
                                            <p>11.1. Les Utilisateurs peuvent signaler tout abus, contenu illicite ou comportement suspect via le formulaire de contact du Site.</p>
                                            <p>11.2. Dexsire.com s'engage à examiner rapidement les signalements et à prendre les mesures appropriées.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>12. Modification des CGU</h4>
                                            <p>12.1. Dexsire.com se réserve le droit de modifier les présentes CGU à tout moment.</p>
                                            <p>12.2. Les Utilisateurs seront informés des modifications via le Site ou par e-mail. L'utilisation continue du Site après la modification vaut acceptation des nouvelles CGU.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>13. Résiliation</h4>
                                            <p>13.1. Les Utilisateurs peuvent supprimer leur compte à tout moment en accédant aux paramètres de leur compte.</p>
                                            <p>13.2. Dexsire.com peut résilier un compte en cas de violation des présentes CGU.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>14. Droit Applicable et For Juridique</h4>
                                            <p>14.1. Les présentes CGU sont régies par le droit suisse.</p>
                                            <p>14.2. Tout litige relevant des présentes CGU sera soumis à la juridiction exclusive des tribunaux du canton de Vaud.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>15. Contact</h4>
                                            <p>Pour toute question ou demande d'assistance, veuillez contacter Dexsire.com à l'adresse suivante : support@dexsire.com.</p>
                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>16. Politique de Lutte contre la Traite des Êtres Humains, l’Exploitation Sexuelle et l’Abus</h4>
                                            <p>16.1. Politique Générale</p>
                                            <p>Dexsire.com (« le Marchand ») s’engage fermement à interdire toute utilisation de son site pouvant encourager, promouvoir ou faciliter la traite des êtres humains, la traite à des fins d’exploitation sexuelle ou tout abus.</p>
                                            <p>À ce titre, le Marchand a mis en place des politiques internes et des procédures de vigilance permettant de prévenir, détecter et signaler tout usage illégal ou contraire à la dignité humaine.</p>
                                            <p>En cas de soupçon d’abus ou de trafic, Dexsire.com se réserve le droit de prendre des mesures immédiates, incluant la suppression de compte ou la transmission d’informations pertinentes aux autorités compétentes.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>16.2. Engagements et Ressources Internes</h4>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                <li>Dexsire s’engage à sensibiliser ses équipes internes à la détection et au signalement d’éventuels cas de traite des êtres humains.</li>
                                                <li>Des actions de veille et de modération sont régulièrement entreprises pour identifier et bloquer d’éventuels contenus, profils ou annonces suspectes.</li>
                                                <li>Toute personne suspectant un cas de traite est invitée à contacter immédiatement Dexsire à l’adresse e-mail : help@dexsire.ch, et à informer les autorités compétentes.</li>
                                            </ul>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>16.3. Signes avant-coureurs de la Traite et de l’Exploitation</h4>
                                            <p>Il est important de savoir reconnaître certains indices :</p>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                <li>Une personne est-elle toujours accompagnée par un tiers qui semble parler à sa place ou exercer un contrôle ?</li>
                                                <li>La personne paraît-elle apeurée, hésitante ou montre-t-elle des signes de contrainte ?</li>
                                                <li>Y a-t-il des barrières linguistiques ou des manifestations de crainte inhabituelles lors des interactions ?</li>
                                                <li>Semble-t-il y avoir un doute quant à la majorité de la personne ?</li>
                                            </ul>
                                            <p>Toute situation laissant présumer qu’un individu est sous contrainte ou exploité doit être signalée.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>16.4. Signalements et Aide d’Urgence</h4>
                                            <p>En Suisse, le numéro d’urgence de la police est le 117.</p>
                                            <p>Vous pouvez également contacter les brigades cantonales :</p>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                <li>Genève : +41 22 427 71 50</li>
                                                <li>Vaud : +41 21 315 15 15</li>
                                                <li>Neuchâtel : +41 32 889 68 10</li>
                                                <li>Valais : +41 27 606 56 90</li>
                                                <li>Fribourg : +41 26 305 19 19</li>
                                                <li>Jura : +41 32 420 76 00</li>
                                                <li>Berne : +41 31 638 81 11</li>
                                                <li>Zurich : +41 58 648 48 48</li>
                                            </ul>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>16.5. Ressources et Organisations de Soutien</h4>
                                            <p>Vous trouverez ci-dessous une liste non exhaustive de ressources et d’organisations actives dans la lutte contre la traite et le soutien aux victimes :</p>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                <li><strong>OIM (Organisation Internationale pour les Migrations)</strong> - Thunstrasse 11, Postfach 216, 3000 Berne - Tél : +41 31 350 82 11</li>
                                                <li><strong>Fedpol (Police Fédérale)</strong> - Nussbaumstrasse 29, 3003 Berne - Tél : +41 58 463 11 23</li>
                                                <li><strong>Act212</strong> - Tél : +41 76 261 51 28 | <a href="http://act212.ch">act212.ch</a></li>
                                                <li><strong>FIZ</strong> - Tél : +41 44 436 90 00 | <a href="https://www.fiz-info.ch/fr/Willkommen">fiz-info.ch</a></li>
                                                <li><strong>Trafficked Victim Unit</strong> - Tél : +41 44 585 35 45</li>
                                                <li><strong>Astrée (Lausanne)</strong> - 7 Ruelle de Bourg, 1003 Lausanne - Tél : +41 21 544 27 97 | <a href="https://www.astree.ch">astree.ch</a></li>
                                            </ul>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>16.6. Déclaration de Non-Responsabilité</h4>
                                            <p>Les informations et liens ci-dessus visent à sensibiliser et à informer les Utilisateurs, membres et victimes potentielles de la traite des êtres humains. Dexsire.com ne garantit pas l’exactitude permanente de ces ressources externes ni la légitimité des entités mentionnées.</p>
                                            <p>Le Site décline toute responsabilité quant à l’usage de ces informations et ne fournit pas de conseils juridiques, médicaux ou professionnels.</p>
                                            <p>En utilisant le Site Dexsire.com, l’Utilisateur reconnaît avoir pris connaissance de l’ensemble des dispositions ci-dessus, incluant la Politique de Lutte contre la Traite des Êtres Humains, l’Exploitation Sexuelle et l’Abus, et s’engage à respecter scrupuleusement les présentes Conditions Générales d’Utilisation.</p>

                                        </div>
                                        </div>

                                                                ) : (
                                        <div>
                                            <div style={{ 
                                                maxHeight: '580px', 
                                                overflowY: 'auto', 
                                                padding: '15px', 
                                                borderRadius: '8px',
                                                lineHeight: '1.6'
                                            }}>
                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>1. Objet du Contrat</h4>
                                                <p>L’objectif de ce Contrat est de définir les conditions générales dans lesquelles le Fournisseur de Contenu répertorie, télécharge et gère son profil et/ou son contenu sur la plateforme Dexsire (« la Plateforme »).</p>
                                                <p>En cliquant sur « J’accepte » ou en manifestant de toute autre manière l’acceptation de ce Contrat, le Fournisseur de Contenu accepte pleinement les clauses ci-après.</p>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>2. Gestion du Contenu et du Profil</h4>
                                                <h5>2.1 Soumission de Contenu</h5>
                                                <p>Le Fournisseur de Contenu s’engage à fournir des informations précises, actuelles et véridiques, notamment :</p>
                                                <ul style={{ paddingLeft: '20px' }}>
                                                    <li>Une description personnelle/professionnelle</li>
                                                    <li>Des photographies, vidéos ou autres contenus multimédias</li>
                                                    <li>Les détails relatifs aux prix, plannings et disponibilités</li>
                                                </ul>

                                                <h5>2.2 Normes de Contenu</h5>
                                                <p>Le contenu soumis par le Fournisseur de Contenu doit :</p>
                                                <ul style={{ paddingLeft: '20px' }}>
                                                    <li>Être conforme aux lois et réglementations en vigueur</li>
                                                    <li>Ne pas enfreindre les droits de propriété intellectuelle de tiers</li>
                                                    <li>Ne contenir aucun élément obscène, diffamatoire ou illégal</li>
                                                </ul>

                                                <h5>2.3 Mises à Jour et Maintenance</h5>
                                                <p>Le Fournisseur de Contenu doit régulièrement mettre à jour son profil afin de garantir l’exactitude et la pertinence des informations qui y sont publiées.</p>

                                                <h5>2.4 Droit de Vérification</h5>
                                                <p>Dexsire se réserve le droit de :</p>
                                                <ul style={{ paddingLeft: '20px' }}>
                                                    <li>Examiner et approuver le contenu avant sa publication</li>
                                                    <li>Demander des modifications afin de respecter les directives de la Plateforme</li>
                                                    <li>Supprimer tout contenu jugé non conforme à ce Contrat ou à la réglementation applicable</li>
                                                </ul>

                                                <h5>2.5 Activités Interdites et Conformité aux Règles des Schémas de Cartes</h5>
                                                <p>Le Fournisseur de Contenu s’engage à ne pas proposer, promouvoir ou participer à des activités illicites ni à celles contrevenant aux Règles des Schémas de Cartes (Visa, Mastercard, etc.). Toute activité jugée illégale ou en violation de ces règles pourra entraîner la résiliation immédiate du présent Contrat ainsi que la suppression du contenu concerné de la Plateforme.</p>

                                                <h5>2.6 Exigences de Consentement et Conservation des Preuves</h5>
                                                <p>Le Fournisseur de Contenu doit conserver des registres et preuves écrites pour chaque personne apparaissant dans le contenu, confirmant notamment :</p>
                                                <ul style={{ paddingLeft: '20px' }}>
                                                    <li>Le consentement à être représentée dans le contenu</li>
                                                    <li>Le consentement à la diffusion publique du contenu, y compris son téléchargement sur le site du Marchand</li>
                                                    <li>Le consentement au téléchargement du contenu par les utilisateurs, si la fonctionnalité est disponible</li>
                                                </ul>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>3. Modalités de Paiement</h4>
                                                <h5>3.1 Commissions et Frais</h5>
                                                <p>Dexsire appliquera des frais pour l’utilisation de la Plateforme ou pour le référencement du contenu. Les détails relatifs aux commissions, frais d’abonnement ou paiements uniques seront précisés dans une grille tarifaire fournie séparément.</p>

                                                <h5>3.2 Calendrier des Paiements</h5>
                                                <p>Le Fournisseur de Contenu percevra ses paiements aux intervalles convenus par écrit (hebdomadaires, bihebdomadaires ou mensuels). Les paiements seront effectués par un moyen défini d’un commun accord.</p>

                                                <h5>3.3 Déductions</h5>
                                                <p>Dexsire est en droit de déduire toute commission, taxe ou frais avant de procéder au paiement final au Fournisseur de Contenu.</p>

                                                <h5>3.4 Litiges Relatifs aux Paiements</h5>
                                                <p>Tout litige relatif aux paiements doit être signalé dans un délai de quinze (15) jours après la réception du paiement concerné.</p>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>4. Propriété et Licence</h4>
                                                <p>4.1. Le Fournisseur de Contenu conserve la pleine propriété de tous les contenus qu’il soumet sur la Plateforme.</p>
                                                <p>4.2. Le Fournisseur de Contenu accorde à Dexsire une licence non exclusive et sans redevance pour afficher, distribuer et promouvoir le contenu sur la Plateforme.</p>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>5. Déclarations et Garanties</h4>
                                                <p>Le Fournisseur de Contenu déclare et garantit que :</p>
                                                <ul style={{ paddingLeft: '20px' }}>
                                                    <li>Tout le contenu est original ou dûment licencié</li>
                                                    <li>Il est légalement autorisé à fournir les services annoncés</li>
                                                    <li>Il respectera toutes les lois et réglementations applicables</li>
                                                </ul>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>6. Durée et Résiliation</h4>
                                                <p>6.1. Ce Contrat prend effet à la Date d'Effet et reste en vigueur jusqu'à sa résiliation par l'une ou l'autre des Parties avec un préavis écrit de 30 jours.</p>
                                                <p>6.2. Dexsire se réserve le droit de résilier immédiatement ce Contrat en cas de violation des termes.</p>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>7. Indemnisation</h4>
                                                <p>Le Fournisseur de Contenu s'engage à indemniser, défendre et dégager de toute responsabilité Dexsire, ses affiliés et ses employés contre toute réclamation ou dommage découlant de la violation de ce Contrat.</p>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>8. Limitation de Responsabilité</h4>
                                                <p>La responsabilité de Dexsire est limitée aux dommages directs ne dépassant pas les frais totaux payés par le Fournisseur de Contenu au cours des trois mois précédents.</p>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>9. Confidentialité</h4>
                                                <p>Les deux Parties s'engagent à garder confidentielles toutes les informations commerciales, financières ou propriétaires partagées dans le cadre de ce Contrat.</p>
                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>10. Dispositions Générales</h4>

                                                <h5>10.1 Prestataire Indépendant</h5>
                                                <p>Aucune relation de partenariat, d’employeur-employé ou de coentreprise n’est créée entre Dexsire et le Fournisseur de Contenu par ce Contrat. Le Fournisseur de Contenu agit à titre de prestataire indépendant.</p>

                                                <h5>10.2 Accord Complet</h5>
                                                <p>Le présent Contrat constitue l’intégralité de l’accord entre les Parties et remplace tout accord antérieur verbal ou écrit portant sur le même objet.</p>

                                                <h5>10.3 Droit Applicable</h5>
                                                <p>Le présent Contrat est régi et interprété conformément aux lois du canton de Vaud, en Suisse.</p>

                                                <h5>10.4 Résolution des Litiges</h5>
                                                <p>En cas de différend, les Parties conviennent de tenter de résoudre leur litige à l’amiable par des négociations de bonne foi avant de recourir à tout autre mode de règlement.</p>

                                                <h4 style={{
                                                    color: '#e53e3e',
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 10
                                                }}>Acceptation des Conditions</h4>
                                                <p>En cliquant sur « J’accepte » ou en manifestant de toute autre manière son acceptation, le Fournisseur de Contenu reconnaît avoir lu, compris et accepté les termes du présent Contrat dans leur intégralité.</p>

                                            </div>
                                        </div>
                                        )}
                            </div>
                        <ButtonContent style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                            <Button
                                outlineGradient
                                onClick={handleContinue}
                            >
                                {loading ? t("loading...") : step === 1 ? t("Suivant") : t("Accepter et continuer")}
                            </Button>
                        </ButtonContent>
                    </div>
                </FormContainer>
            </Content>
        </Container>
);
};

export default PrivacyAndTerms;