import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Button from "components/Form/Button";
import {
    Content,
    FormContainer,
    ButtonContent,
} from './styled';

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
                                            <p>L'objectif de ce Contrat est de définir les conditions générales dans lesquelles le Fournisseur de Contenu répertorie, télécharge et gère son profil et/ou son contenu sur la plateforme Dexsire.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>2. Gestion du Contenu et du Profil</h4>
                                            <h5>2.1 Soumission de Contenu</h5>
                                            <p>Le Fournisseur de Contenu s'engage à fournir des informations précises, actuelles et véridiques, notamment :</p>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                <li>Une description personnelle/professionnelle</li>
                                                <li>Des photographies, vidéos ou autres contenus multimédias</li>
                                                <li>Les détails des prix, plannings et disponibilités</li>
                                            </ul>

                                            <h5>2.2 Normes de Contenu</h5>
                                            <p>Les matériaux fournis doivent :</p>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                <li>Être conformes aux lois et réglementations applicables</li>
                                                <li>Ne pas enfreindre les droits de propriété intellectuelle de tiers</li>
                                                <li>Ne contenir aucun contenu obscène, diffamatoire ou illégal</li>
                                            </ul>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>3. Modalités de Paiement</h4>
                                            <h5>3.1 Commissions et Frais</h5>
                                            <p>Dexsire facturera des frais pour le référencement ou l'utilisation de la Plateforme. Les détails des structures de commission, frais d'abonnement ou paiements uniques seront précisés dans une Grille Tarifaire distincte fournie lors de la signature.</p>

                                            <h5>3.2 Calendrier des Paiements</h5>
                                            <p>Les Fournisseurs de Contenu recevront des paiements pour les services rendus via la Plateforme à des intervalles convenus par écrit. Les paiements seront effectués par un moyen convenu mutuellement.</p>

                                            <h4 style={{
                                                color: '#e53e3e',
                                                borderBottom: '1px solid #e0e0e0',
                                                paddingBottom: 10
                                            }}>4. Propriété et Licence</h4>
                                            <p>4.1. Le Fournisseur de Contenu conserve la propriété de tout contenu soumis sur la Plateforme.</p>
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
                                                <li>Il respectera toutes les lois et réglementations applicables dans sa juridiction</li>
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
                                            <p>10.1. Le Fournisseur de Contenu agit en tant que prestataire indépendant.</p>
                                            <p>10.2. Ce Contrat constitue l'intégralité de l'entente entre les Parties.</p>
                                            <p>10.3. Ce Contrat est régi par les lois du canton de Vaud, Suisse.</p>
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