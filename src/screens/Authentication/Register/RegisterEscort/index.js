import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


import {
    RegisterCall,
    BodyContainer,
    Banner,
    BodyContent,
    FormContainer,
    ButtonContent,
    Content,
    VerificationUpload,
    SampleContent,
    SampleTitle,
    SampleImage,
    AppearanceTitle,
    UploadFileContainer,
    AppearanceText,
    VerificationUploadContainer,
    AppearanceContainer,
    AppearanceTitleContainer
} from './styled'

import Button from "components/Form/Button";
import Input from 'components/Form/Input';

import UploadID from "components/UploadID";
import ContainerUnauthenticated from "containers/Unauthenticated";
import { DoLogin, DoRegister } from "services/authentication";
import { exposeStrapiError, getBirthdate, normalizeStrapiList, parseStrapiImage } from "utils";
import Footer from "components/Footer";
import { Background, FormSpacer, FormTitle, Icon, Title } from "ui/styled";
import InfoData from "components/InfoData";
import { Container } from "reactstrap";
import RegisterForm from "components/RegisterForm";
import PlansCard from "components/Cards/PlansCard";
import Success from "components/Success";
import Appearance from "components/Appearance";
import ServicesOffered from "components/ServicesOffered";
import Payment from "components/Payment";
import { isEmail } from "utils/validators";
import UploadAndPreview from "components/UploadAndPreview";
import { Create, Read } from "services/core";
import { CoreContext } from "context/CoreContext";
import { UpdateMe } from "services/me";
import UploadFile from "components/Form/UploadFile";
import useI18n from "hooks/useI18n";
import PrivacyAndTerms from "components/PrivacyAndTerms";
import {
    AppearanceContainer as AppearanceContainerStyled,
    AppearanceTitleContainer as AppearanceTitleContainerStyled,
    AppearanceTitle as AppearanceTitleStyled,
    AppearanceText as AppearanceTextStyled,
} from 'components/Appearance/styled'
import CustomPasswordInput from 'components/Form/CustomPasswordInput';

const SERVICES_OPTIONS = [
  "69",
  "Anulingus (reçois)",
  "Café Pipe",
  "Couple",
  "Doigté anal",
  "Domination soft",
  "Duo",
  "Ejac Facial",
  "Ejac en bouche",
  "Facesitting",
  "Fellation protégée",
  "Femme fontaine",
  "Fisting (donne)",
  "French kiss",
  "GFE",
  "Groupe orgie",
  "Lingerie",
  "Masturbation",
  "Service VIP",
  "Sodomie (donne)",
  "Soumise",
  "Anulingus (donne)",
  "Branlette seins",
  "Champagne doré",
  "Cunnilingus",
  "Doigté vaginal",
  "Double pénétration",
  "Déjeuner/dîner",
  "Ejac corps",
  "Ejac multiple OK",
  "Fellation nature",
  "Fellation royale",
  "Fessées acceptées",
  "Fisting (reçois)",
  "Fétichisme",
  "Gorge profonde",
  "Jeux de rôles",
  "Massage érotique",
  "Rapport sexuel",
  "Sex tovs",
  "Sodomie (reçois)",
  "Striptease"
].map(service => ({ id: service, title: service }));

const DEFAULT_OPTIONS = {
    services: SERVICES_OPTIONS,
    
    
        regions: [
            { id: 11, title: 'Aarau' },
            { id: 12, title: 'Basel' },
            { id: 2, title: 'Bern' },
            { id: 10, title: 'Fribourg' },
            { id: 6, title: 'Geneva' },
            { id: 19, title: 'Glaris' },
            { id: 14, title: 'Graubünden' },
            { id: 3, title: 'Luzern' },
            { id: 9, title: 'Neuchâtel' },
            { id: 18, title: 'Nidwald' },
            { id: 5, title: 'Schwyz' },
            { id: 13, title: 'Solothurn' },
            { id: 16, title: 'St. Gallen' },
            { id: 17, title: 'Ticino' },
            { id: 15, title: 'Thurgau' },
            { id: 4, title: 'Uri' },
            { id: 8, title: 'Valais' },
            { id: 7, title: 'Vaud' },
            { id: 1, title: 'Zürich' }
        ],
        cities: [
            // Aarau cities - alphabetically sorted
            { id: 82, title: 'Aarau City', region: { data: { id: 11 } } },
            { id: 98, title: 'Aesch', region: { data: { id: 12 } } },
            { id: 13, title: 'Aigle', region: { data: { id: 7 } } },
            { id: 107, title: 'Adliswil', region: { data: { id: 1 } } },
            { id: 99, title: 'Allschwil', region: { data: { id: 12 } } },
            { id: 165, title: 'Altstätten', region: { data: { id: 16 } } },
            { id: 46, title: 'Aproz', region: { data: { id: 8 } } },
            { id: 160, title: 'Arbon', region: { data: { id: 15 } } },
            { id: 47, title: 'Ardon', region: { data: { id: 8 } } },
            { id: 143, title: 'Arosa', region: { data: { id: 14 } } },
            { id: 172, title: 'Ascona', region: { data: { id: 17 } } },
            { id: 14, title: 'Aubonne', region: { data: { id: 7 } } },
            { id: 83, title: 'Baden', region: { data: { id: 11 } } },
            { id: 125, title: 'Balsthal', region: { data: { id: 13 } } },
            { id: 97, title: 'Basel City', region: { data: { id: 12 } } },
            { id: 126, title: 'Bellach', region: { data: { id: 13 } } },
            { id: 173, title: 'Bellinzone', region: { data: { id: 17 } } },
            { id: 4, title: 'Bern City', region: { data: { id: 2 } } },
            { id: 187, title: 'Betschwanden', region: { data: { id: 19 } } },
            { id: 15, title: 'Bex', region: { data: { id: 7 } } },
            { id: 127, title: 'Biberist', region: { data: { id: 13 } } },
            { id: 6, title: 'Biel', region: { data: { id: 2 } } },
            { id: 174, title: 'Biasca', region: { data: { id: 17 } } },
            { id: 100, title: 'Binningen', region: { data: { id: 12 } } },
            { id: 101, title: 'Birsfelden', region: { data: { id: 12 } } },
            { id: 84, title: 'Bremgarten', region: { data: { id: 11 } } },
            { id: 48, title: 'Brig', region: { data: { id: 8 } } },
            { id: 85, title: 'Brugg', region: { data: { id: 11 } } },
            { id: 166, title: 'Buchs', region: { data: { id: 16 } } },
            { id: 108, title: 'Bülach', region: { data: { id: 1 } } },
            { id: 76, title: 'Bulle', region: { data: { id: 10 } } },
            { id: 152, title: 'Burgdorf', region: { data: { id: 2 } } },
            { id: 16, title: 'Bussigny', region: { data: { id: 7 } } },
            { id: 182, title: 'Buochs', region: { data: { id: 18 } } },
            { id: 35, title: 'Carouge', region: { data: { id: 6 } } },
            { id: 36, title: 'Champel', region: { data: { id: 6 } } },
            { id: 77, title: 'Châtel-Saint-Denis', region: { data: { id: 10 } } },
            { id: 17, title: 'Chavannes-Renens', region: { data: { id: 7 } } },
            { id: 175, title: 'Chiasso', region: { data: { id: 17 } } },
            { id: 142, title: 'Chur', region: { data: { id: 14 } } },
            { id: 37, title: 'Cité-Centre', region: { data: { id: 6 } } },
            { id: 18, title: 'Clarens', region: { data: { id: 7 } } },
            { id: 49, title: 'Collombey', region: { data: { id: 8 } } },
            { id: 50, title: 'Conthey', region: { data: { id: 8 } } },
            { id: 19, title: 'Coppet', region: { data: { id: 7 } } },
            { id: 38, title: 'Cornavin', region: { data: { id: 6 } } },
            { id: 20, title: 'Corcelles-près-Payerne', region: { data: { id: 7 } } },
            { id: 72, title: 'Cortaillod', region: { data: { id: 9 } } },
            { id: 51, title: 'Crans-Montana', region: { data: { id: 8 } } },
            { id: 21, title: 'Crissier', region: { data: { id: 7 } } },
            { id: 109, title: 'Dällikon', region: { data: { id: 1 } } },
            { id: 144, title: 'Davos', region: { data: { id: 14 } } },
            { id: 128, title: 'Derendingen', region: { data: { id: 13 } } },
            { id: 110, title: 'Dietikon', region: { data: { id: 1 } } },
            { id: 111, title: 'Dübendorf', region: { data: { id: 1 } } },
            { id: 78, title: 'Düdingen', region: { data: { id: 10 } } },
            { id: 39, title: 'Eaux-vives', region: { data: { id: 6 } } },
            { id: 8, title: 'Emmen', region: { data: { id: 3 } } },
            { id: 112, title: 'Embrach', region: { data: { id: 1 } } },
            { id: 183, title: 'Ennetbürgen', region: { data: { id: 18 } } },
            { id: 79, title: 'Estavayer-le-Lac', region: { data: { id: 10 } } },
            { id: 145, title: 'Flims', region: { data: { id: 14 } } },
            { id: 159, title: 'Frauenfeld', region: { data: { id: 15 } } },
            { id: 75, title: 'Fribourg City', region: { data: { id: 10 } } },
            { id: 86, title: 'Frick', region: { data: { id: 11 } } },
            { id: 52, title: 'Gampel', region: { data: { id: 8 } } },
            { id: 11, title: 'Geneva City', region: { data: { id: 6 } } },
            { id: 134, title: 'Gisikon', region: { data: { id: 3 } } },
            { id: 176, title: 'Giubiasco', region: { data: { id: 17 } } },
            { id: 186, title: 'Glaris City', region: { data: { id: 19 } } },
            { id: 22, title: 'Gland', region: { data: { id: 7 } } },
            { id: 167, title: 'Gossau', region: { data: { id: 16 } } },
            { id: 129, title: 'Grenchen', region: { data: { id: 13 } } },
            { id: 53, title: 'Grône', region: { data: { id: 8 } } },
            { id: 184, title: 'Hergiswil', region: { data: { id: 18 } } },
            { id: 135, title: 'Hochdorf', region: { data: { id: 3 } } },
            { id: 113, title: 'Horgen', region: { data: { id: 1 } } },
            { id: 136, title: 'Horw', region: { data: { id: 3 } } },
            { id: 153, title: 'Interlaken', region: { data: { id: 2 } } },
            { id: 156, title: 'Ittigen', region: { data: { id: 2 } } },
            { id: 87, title: 'Klingnau', region: { data: { id: 11 } } },
            { id: 114, title: 'Kloten', region: { data: { id: 1 } } },
            { id: 154, title: 'Köniz', region: { data: { id: 2 } } },
            { id: 161, title: 'Kreuzlingen', region: { data: { id: 15 } } },
            { id: 137, title: 'Kriens', region: { data: { id: 3 } } },
            { id: 88, title: 'Künten', region: { data: { id: 11 } } },
            { id: 146, title: 'Laax', region: { data: { id: 14 } } },
            { id: 73, title: 'La Chaux-de Fonds', region: { data: { id: 9 } } },
            { id: 130, title: 'Langendorf', region: { data: { id: 13 } } },
            { id: 155, title: 'Langnau im Emmental', region: { data: { id: 2 } } },
            { id: 147, title: 'Landquart', region: { data: { id: 14 } } },
            { id: 12, title: 'Lausanne', region: { data: { id: 7 } } },
            { id: 74, title: 'Le Locle', region: { data: { id: 9 } } },
            { id: 54, title: 'Leuk', region: { data: { id: 8 } } },
            { id: 89, title: 'Lenzburg', region: { data: { id: 11 } } },
            { id: 102, title: 'Liestal', region: { data: { id: 12 } } },
            { id: 177, title: 'Locarno', region: { data: { id: 17 } } },
            { id: 171, title: 'Lugano', region: { data: { id: 17 } } },
            { id: 7, title: 'Luzern City', region: { data: { id: 3 } } },
            { id: 148, title: 'Malans', region: { data: { id: 14 } } },
            { id: 80, title: 'Marly', region: { data: { id: 10 } } },
            { id: 55, title: 'Martigny', region: { data: { id: 8 } } },
            { id: 138, title: 'Meggen', region: { data: { id: 3 } } },
            { id: 115, title: 'Meilen', region: { data: { id: 1 } } },
            { id: 178, title: 'Mendrisio', region: { data: { id: 17 } } },
            { id: 188, title: 'Mitlödi', region: { data: { id: 19 } } },
            { id: 56, title: 'Monthey', region: { data: { id: 8 } } },
            { id: 23, title: 'Montreux', region: { data: { id: 7 } } },
            { id: 24, title: 'Morges', region: { data: { id: 7 } } },
            { id: 25, title: 'Moudon', region: { data: { id: 7 } } },
            { id: 90, title: 'Muri', region: { data: { id: 11 } } },
            { id: 157, title: 'Muri bei Bern', region: { data: { id: 2 } } },
            { id: 103, title: 'Muttenz', region: { data: { id: 12 } } },
            { id: 189, title: 'Näfels', region: { data: { id: 19 } } },
            { id: 57, title: 'Naters', region: { data: { id: 8 } } },
            { id: 58, title: 'Nendaz', region: { data: { id: 8 } } },
            { id: 71, title: 'Neuchâtel City', region: { data: { id: 9 } } },
            { id: 26, title: 'Nyon', region: { data: { id: 7 } } },
            { id: 104, title: 'Oberwil', region: { data: { id: 12 } } },
            { id: 91, title: 'Oftringen', region: { data: { id: 11 } } },
            { id: 131, title: 'Olten', region: { data: { id: 13 } } },
            { id: 116, title: 'Opfikon', region: { data: { id: 1 } } },
            { id: 27, title: 'Oron', region: { data: { id: 7 } } },
            { id: 28, title: 'Payerne', region: { data: { id: 7 } } },
            { id: 40, title: 'Plainpalais', region: { data: { id: 6 } } },
            { id: 41, title: 'Plan-les-ouates', region: { data: { id: 6 } } },
            { id: 105, title: 'Pratteln', region: { data: { id: 12 } } },
            { id: 149, title: 'Prättigau/Davos', region: { data: { id: 14 } } },
            { id: 29, title: 'Prilly', region: { data: { id: 7 } } },
            { id: 59, title: 'Raron', region: { data: { id: 8 } } },
            { id: 117, title: 'Regensdorf', region: { data: { id: 1 } } },
            { id: 106, title: 'Reinach', region: { data: { id: 12 } } },
            { id: 30, title: 'Renens', region: { data: { id: 7 } } },
            { id: 92, title: 'Rheinfelden', region: { data: { id: 11 } } },
            { id: 60, title: 'Riddes', region: { data: { id: 8 } } },
            { id: 179, title: 'Riviera', region: { data: { id: 17 } } },
            { id: 31, title: 'Roche', region: { data: { id: 7 } } },
            { id: 81, title: 'Romont', region: { data: { id: 10 } } },
            { id: 162, title: 'Romanshorn', region: { data: { id: 15 } } },
            { id: 168, title: 'Rorschach', region: { data: { id: 16 } } },
            { id: 118, title: 'Rümlang', region: { data: { id: 1 } } },
            { id: 61, title: 'Saillon', region: { data: { id: 8 } } },
            { id: 62, title: 'Saint-Léonard', region: { data: { id: 8 } } },
            { id: 63, title: 'Saint-Maurice', region: { data: { id: 8 } } },
            { id: 150, title: 'Samedan', region: { data: { id: 14 } } },
            { id: 139, title: 'Sarnen', region: { data: { id: 3 } } },
            { id: 64, title: 'Saxon', region: { data: { id: 8 } } },
            { id: 93, title: 'Schinznach-Bad', region: { data: { id: 11 } } },
            { id: 119, title: 'Schlieren', region: { data: { id: 1 } } },
            { id: 190, title: 'Schwanden', region: { data: { id: 19 } } },
            { id: 10, title: 'Schwyz City', region: { data: { id: 5 } } },
            { id: 42, title: 'Servette', region: { data: { id: 6 } } },
            { id: 65, title: 'Sierre', region: { data: { id: 8 } } },
            { id: 45, title: 'Sion', region: { data: { id: 8 } } },
            { id: 124, title: 'Solothurn City', region: { data: { id: 13 } } },
            { id: 181, title: 'Stans', region: { data: { id: 18 } } },
            { id: 164, title: 'St. Gallen City', region: { data: { id: 16 } } },
            { id: 151, title: 'St. Moritz', region: { data: { id: 14 } } },
            { id: 140, title: 'Sursee', region: { data: { id: 3 } } },
            { id: 180, title: 'Taverne', region: { data: { id: 17 } } },
            { id: 5, title: 'Thun', region: { data: { id: 2 } } },
            { id: 43, title: 'Thônex', region: { data: { id: 6 } } },
            { id: 132, title: 'Trimbach', region: { data: { id: 13 } } },
            { id: 66, title: 'Turtmann', region: { data: { id: 8 } } },
            { id: 9, title: 'Uri City', region: { data: { id: 4 } } },
            { id: 3, title: 'Uster', region: { data: { id: 1 } } },
            { id: 67, title: 'Verbier', region: { data: { id: 8 } } },
            { id: 44, title: 'Versoix', region: { data: { id: 6 } } },
            { id: 32, title: 'Vevey', region: { data: { id: 7 } } },
            { id: 68, title: 'Vétroz', region: { data: { id: 8 } } },
            { id: 33, title: 'Villeneuve', region: { data: { id: 7 } } },
            { id: 69, title: 'Visp', region: { data: { id: 8 } } },
            { id: 120, title: 'Volketswil', region: { data: { id: 1 } } },
            { id: 121, title: 'Wallisellen', region: { data: { id: 1 } } },
            { id: 122, title: 'Wädenswil', region: { data: { id: 1 } } },
            { id: 163, title: 'Weinfelden', region: { data: { id: 15 } } },
            { id: 94, title: 'Wettingen', region: { data: { id: 11 } } },
            { id: 123, title: 'Wetzikon', region: { data: { id: 1 } } },
            { id: 158, title: 'Wichtrach', region: { data: { id: 2 } } },
            { id: 170, title: 'Wil', region: { data: { id: 16 } } },
            { id: 141, title: 'Willisau', region: { data: { id: 3 } } },
            { id: 2, title: 'Winterthur', region: { data: { id: 1 } } },
            { id: 169, title: 'Wittenbach', region: { data: { id: 16 } } },
            { id: 95, title: 'Wohlen', region: { data: { id: 11 } } },
            { id: 185, title: 'Wolfenschiessen', region: { data: { id: 18 } } },
            { id: 34, title: 'Yverdon-les-bains', region: { data: { id: 7 } } },
            { id: 70, title: 'Zermatt', region: { data: { id: 8 } } },
            { id: 96, title: 'Zofingen', region: { data: { id: 11 } } },
            { id: 133, title: 'Zuchwil', region: { data: { id: 13 } } },
            { id: 1, title: 'Zürich City', region: { data: { id: 1 } } }
        ],
    
    
    categories: [
        { id: 1, title: 'Independent' },
        { id: 2, title: 'Agency' },
        { id: 3, title: 'Massage Salon' }
    ],
    nationalities: [
        { id: 1, title: 'Swiss' },
        { id: 2, title: 'French' },
        { id: 3, title: 'German' },
        { id: 4, title: 'Italian' },
        { id: 5, title: 'Spanish' }
    ],
    languages: [
        { id: 1, title: 'English' },
        { id: 2, title: 'French' },
        { id: 3, title: 'German' },
        { id: 4, title: 'Italian' },
        { id: 5, title: 'Spanish' }
    ],
    mobility_options: [
        { id: 1, title: 'Incall' },
        { id: 2, title: 'Outcall' },
        { id: 3, title: 'Both' }
    ],
    payment_methods: [
        { id: 1, title: 'Cash' },
        { id: 2, title: 'Card' },
        { id: 3, title: 'Bank Transfer' }
    ],
    hair_colors: [
        { id: 1, title: 'Blonde' },
        { id: 2, title: 'Brown' },
        { id: 3, title: 'Black' },
        { id: 4, title: 'Red' }
    ],
    eye_colors: [
        { id: 1, title: 'Blue' },
        { id: 2, title: 'Green' },
        { id: 3, title: 'Brown' },
        { id: 4, title: 'Hazel' },
        { id: 5, title: 'Gray' }
    ],
    breast_sizes: [
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
        { id: 3, title: 'C' },
        { id: 4, title: 'D' },
        { id: 5, title: 'DD+' }
    ],
    sizes: Array.from({length: 40}, (_, i) => ({ 
        id: i + 150, 
        title: `${(150 + i)/100}m` 
    })),
    weights: Array.from({length: 60}, (_, i) => ({ 
        id: i + 40, 
        title: `${40 + i} Kg` 
    }))
}

const SimpleUpload = ({ onChange, accept, children }) => {
    const handleChange = (event) => {
        const files = event.target.files;
        if (files?.length) {
            onChange(accept === "video/*" ? files[0] : files);
        }
    };

    return (
        <div style={{ cursor: 'pointer' }}>
            <input
                type="file"
                onChange={handleChange}
                accept={accept}
                multiple={accept === "image/*"}
                style={{ display: 'none' }}
            />
            {children}
        </div>
    );
};

const useFileUpload = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);

    const uploadSingleFile = async (file) => {
        if (!file) return null;
        try {
            const localUrl = URL.createObjectURL(file);
            
            const localFile = {
                id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                url: localUrl,
                name: file.name,
                size: file.size,
                type: file.type,
                originalFile: file,
                localFile: true
            };
            
            setFiles([localFile]);
            setError(null);
            
            return localFile;
        } catch (error) {
            console.error('File upload error:', error);
            setError('Failed to upload file');
            return null;
        }
    };

    const uploadMultipleFiles = async (fileList) => {
        if (!fileList?.length) return [];
        try {
            const localFiles = Array.from(fileList).map(file => {
                const localUrl = URL.createObjectURL(file);
                return {
                    id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    url: localUrl,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    originalFile: file,
                    localFile: true
                };
            });
            
            setFiles(prev => [...prev, ...localFiles]);
            setError(null);
            
            return localFiles;
        } catch (error) {
            console.error('Multiple file upload error:', error);
            setError('Failed to upload files');
            return [];
        }
    };

    const removeFile = (fileId) => {
        setFiles(prev => {
            const updatedFiles = prev.filter(file => file.id !== fileId);
            prev.forEach(file => {
                if (file.id === fileId && file.url.startsWith('blob:')) {
                    URL.revokeObjectURL(file.url);
                }
            });
            return updatedFiles;
        });
    };

    const clearFiles = () => {
        files.forEach(file => {
            if (file.url.startsWith('blob:')) {
                URL.revokeObjectURL(file.url);
            }
        });
        setFiles([]);
        setError(null);
    };

    useEffect(() => {
        return () => {
            files.forEach(file => {
                if (file.url.startsWith('blob:')) {
                    URL.revokeObjectURL(file.url);
                }
            });
        };
    }, [files]);

    return {
        files,
        error,
        uploadSingleFile,
        uploadMultipleFiles,
        removeFile,
        clearFiles
    };
};

const LocalUploadWrapper = ({ children, onChange, skipApiCall }) => {
    const handleUpload = async (files) => {
        if (!files) return;
        
        if (!Array.isArray(files)) {
            const file = files;
            const localUrl = URL.createObjectURL(file);
            const localFile = {
                id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                url: localUrl,
                name: file.name,
                size: file.size,
                type: file.type,
                localFile: true
            };
            onChange(localFile);
            return;
        }

        const localFiles = Array.from(files).map(file => {
            const localUrl = URL.createObjectURL(file);
            return {
                id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                url: localUrl,
                name: file.name,
                size: file.size,
                type: file.type,
                localFile: true
            };
        });
        onChange(localFiles);
    };

    const modifiedChildren = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onChange: handleUpload,
                skipApiCall: true,
                uploadUrl: null,
                postImage: handleUpload,
                postVideo: handleUpload
            });
        }
        return child;
    });

    return <>{modifiedChildren}</>;
};

export default function RegisterEscort() {
    const history = useHistory();
    const navigate = to => history.push(`/${to}`);
    const { t } = useI18n()

    const { setUser, reloadMe } = useContext(CoreContext)
    const [formProfile, setFormProfile] = useState({});
    const [errors, setErrors] = useState({});

    const formValue = (ref) => {
        return formProfile[ref] || '';
    };

    const changeForm = (value, ref) => {
        setFormProfile(prev => ({
            ...prev,
            [ref]: value
        }));
    };

    const saveProfile = async () => {
        // First, check if we're on the Personal data step and validate passwords
        if (infoOption === 'Personal data') {
            // Check if passwords are provided
            if (!formProfile.password || !formProfile.confirmPassword) {
                toast.error(t("password_fields_required"));
                return;
            }
            
            // Check if passwords match
            if (formProfile.password !== formProfile.confirmPassword) {
                toast.error(t("passwords_dont_match"));
                setErrors(prev => ({...prev, confirmPassword: t('passwords_dont_match')}));
                return;
            }
            
            // Check password length
            if (formProfile.password.length < 8) {
                toast.error(t("password_min_length"));
                setErrors(prev => ({...prev, password: t('password_min_length')}));
                return;
            }
        }
        
        // Continue with the existing validation for files, etc.
        if (!verificationPhoto || !video360 || !imagesReview?.length) {
            toast.error(t("missing_required_files"));
            return;
        }

        if (imagesReview.length < 4) {
            toast.error(t("minimum_4_photos_required"));
            return;
        }

        // Check for temporary files or invalid IDs
        const hasTemporaryFiles = [
            verificationPhoto && (typeof verificationPhoto.id === 'string' && verificationPhoto.id.startsWith('temp-')),
            video360 && (typeof video360.id === 'string' && video360.id.startsWith('temp-')),
            imagesReview.some(img => typeof img.id === 'string' && img.id.startsWith('temp-'))
        ].some(Boolean);

        if (hasTemporaryFiles) {
            toast.error(t("files_not_uploaded_properly"));
            console.error("Temporary files detected:", {
                verificationPhoto: verificationPhoto?.id,
                video360: video360?.id,
                imagesWithTempIds: imagesReview.filter(img => typeof img.id === 'string' && img.id.startsWith('temp-')).map(img => img.id)
            });
            return;
        }

        // Validate file IDs are numbers or valid Strapi IDs
        const validateFileId = (id) => {
            if (!id) return false;
            // Strapi IDs are typically numbers or valid UUIDs
            return !isNaN(Number(id)) || 
                   (typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));
        };

        const invalidFileIds = [
            !validateFileId(verificationPhoto?.id),
            !validateFileId(video360?.id),
            imagesReview.some(img => !validateFileId(img?.id))
        ].some(Boolean);

        if (invalidFileIds) {
            toast.error(t("invalid_file_ids"));
            console.error("Invalid file IDs detected:", {
                verificationPhoto: verificationPhoto?.id,
                video360: video360?.id,
                invalidImageIds: imagesReview.filter(img => !validateFileId(img?.id)).map(img => img?.id)
            });
            return;
        }

        // Log all file IDs for debugging
        console.log("File IDs being sent:", {
            verificationPhoto: verificationPhoto?.id,
            video360: video360?.id,
            imageIds: imagesReview.map(img => img?.id)
        });

        const payload = {
            services: services?.map(m => m?.id),
            region: ethnicity,
            video360: video360?.id,
            verification_image: verificationPhoto?.id,
            videos: [video360?.id],
            photos: imagesReview?.map(m => m?.id),
            user: preuser?.user?.id,
            about_me: formProfile?.about_me,
            description: formProfile?.about_me,
            service_observations: aboutme,

            birthdate: getBirthdate(formProfile?.age),

            telegram: formProfile?.phone,
            whatsapp: formProfile?.phone,

            ...form,
            ...formProfile,

            weight: parseInt(formProfile?.weight?.replace(' Kg', '')),
            height: parseFloat(formProfile?.height?.replace('m', '.')),
            
            languages: Object.keys(languages).map(m => ({ language: m, level: languages?.[m] })),
            payments: payments?.map(m => ({ title: m?.title })) ,
            service_modes: mobility?.map(m => ({ title: m?.title })) 
        }

        console.log('Saving profile with payload:', payload);

        setLoading(true);
        try {
            const result = await Create("models", { data: payload });
            setLoading(false);
        
        if (result && !exposeStrapiError(result)) {
                await UpdateMe({ image: imagesReview?.[0]?.id, model: result?.data?.id });
                await Create("welcome", { name: preuser?.user?.name, email: preuser?.user?.email });
                handleSuccess();
            } else {
                // If there's a Strapi error, log it for debugging
                console.error("Strapi error:", result);
                if (result?.error?.message?.includes("relation") && result?.error?.message?.includes("plugin::upload.file")) {
                    toast.error(t("file_relation_error"));
                    console.error("File relation error. This usually means one or more file IDs don't exist in the database.");
                } else {
                    toast.error(t("error_creating_profile"));
                }
            }
        } catch (error) {
            setLoading(false);
            console.error('Error creating profile:', error);
            toast.error(t("error_creating_profile"));
        }
    }

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [infoOption, setInfoOption] = useState(() => {
        return localStorage.getItem('escortRegistrationStep') || 'Personal data'
    })
    const [mobility, setMobility] = useState(() => {
        const savedMobility = localStorage.getItem('escortRegistrationMobility')
        return savedMobility ? JSON.parse(savedMobility) : []
    })
    const [payments, setPayments] = useState(() => {
        const savedPayments = localStorage.getItem('escortRegistrationPayments')
        return savedPayments ? JSON.parse(savedPayments) : []
    })
    const [languages, setLanguages] = useState(() => {
        const savedLanguages = localStorage.getItem('escortRegistrationLanguages')
        return savedLanguages ? JSON.parse(savedLanguages) : {}
    })
    const [ethnicity, setEthnicity] = useState(() => {
        return localStorage.getItem('escortRegistrationEthnicity') || null
    })
    const [description, setDescription] = useState(() => {
        return localStorage.getItem('escortRegistrationDescription') || ""
    })
    const [success, setSuccess] = useState(null)
    
    const [preuser, setPreuser] = useState(() => {
        const savedPreuser = localStorage.getItem('escortRegistrationPreuser')
        return savedPreuser ? JSON.parse(savedPreuser) : null
    })
    const [verificationPhoto, setVerificationPhoto] = useState(() => {
        try {
            const savedPhoto = localStorage.getItem('escortRegistrationVerificationPhoto');
            if (!savedPhoto) return null;
            
            const parsedPhoto = JSON.parse(savedPhoto);
            // Check if the ID is temporary
            if (parsedPhoto && typeof parsedPhoto.id === 'string' && parsedPhoto.id.startsWith('temp-')) {
                console.log('Filtered out temporary verification photo from localStorage');
                return null; // Force re-upload
            }
            return parsedPhoto;
        } catch (error) {
            console.error('Error parsing verification photo from localStorage:', error);
            return null;
        }
    });
    const [video360, setVideo360] = useState(() => {
        try {
            const savedVideo = localStorage.getItem('escortRegistrationVideo360');
            if (!savedVideo) return null;
            
            const parsedVideo = JSON.parse(savedVideo);
            // Check if the ID is temporary
            if (parsedVideo && typeof parsedVideo.id === 'string' && parsedVideo.id.startsWith('temp-')) {
                console.log('Filtered out temporary 360 video from localStorage');
                return null; // Force re-upload
            }
            return parsedVideo;
        } catch (error) {
            console.error('Error parsing 360 video from localStorage:', error);
            return null;
        }
    });
    const [imagesReview, setImagesReview] = useState(() => {
        try {
            const savedImages = localStorage.getItem('escortRegistrationImagesReview');
            if (!savedImages) return [];
            
            const parsedImages = JSON.parse(savedImages);
            // Filter out any temporary images
            const validImages = parsedImages.filter(img => 
                !(img && typeof img.id === 'string' && img.id.startsWith('temp-'))
            );
            
            if (validImages.length !== parsedImages.length) {
                console.log('Filtered out temporary images from localStorage');
            }
            
            return validImages;
        } catch (error) {
            console.error('Error parsing images from localStorage:', error);
            return [];
        }
    });

    const [services, setServices] = useState(() => {
        const savedServices = localStorage.getItem('escortRegistrationServices')
        return savedServices ? JSON.parse(savedServices) : []
    })
    const [aboutme, setAboutme] = useState(() => {
        return localStorage.getItem('escortRegistrationAboutme') || ""
    })
    
    const [options, setOptions] = useState(() => {
        const sortedRegions = [...DEFAULT_OPTIONS.regions].sort((a, b) => 
            a.title.localeCompare(b.title)
        );
        
        const sortedCities = [...DEFAULT_OPTIONS.cities].sort((a, b) => 
            a.title.localeCompare(b.title)
        );
        
        const sortedNationalities = [...DEFAULT_OPTIONS.nationalities].sort((a, b) => 
            a.title.localeCompare(b.title)
        );
        
        const sortedCategories = [...DEFAULT_OPTIONS.categories].sort((a, b) => 
            a.title.localeCompare(b.title)
        );
        
        return {
            ...DEFAULT_OPTIONS,
            regions: sortedRegions,
            cities: sortedCities,
            nationalities: sortedNationalities,
            categories: sortedCategories
        };
    });
    const [uploadedFiles, setUploadedFiles] = useState(() => {
        const savedFiles = localStorage.getItem('escortRegistrationUploadedFiles')
        if (savedFiles) {
            const parsedFiles = JSON.parse(savedFiles)
            return {
                ...parsedFiles,
                photos: Array.isArray(parsedFiles.photos) ? parsedFiles.photos : []
            }
        }
        return { photos: [] } 
    })

    const contentRef = useRef(null);
    const [form, setForm] = useState(() => {
        const savedForm = localStorage.getItem('escortRegistrationForm')
        return savedForm ? JSON.parse(savedForm) : {}
    })

    useEffect(() => {
        localStorage.setItem('escortRegistrationStep', infoOption)
    }, [infoOption])

    useEffect(() => {
        localStorage.setItem('escortRegistrationProfile', JSON.stringify(formProfile))
    }, [formProfile])

    useEffect(() => {
        localStorage.setItem('escortRegistrationMobility', JSON.stringify(mobility))
    }, [mobility])

    useEffect(() => {
        localStorage.setItem('escortRegistrationPayments', JSON.stringify(payments))
    }, [payments])

    useEffect(() => {
        localStorage.setItem('escortRegistrationLanguages', JSON.stringify(languages))
    }, [languages])

    useEffect(() => {
        if (ethnicity) localStorage.setItem('escortRegistrationEthnicity', ethnicity)
    }, [ethnicity])

    useEffect(() => {
        localStorage.setItem('escortRegistrationDescription', description)
    }, [description])

    useEffect(() => {
        if (preuser) localStorage.setItem('escortRegistrationPreuser', JSON.stringify(preuser))
    }, [preuser])

    useEffect(() => {
        if (verificationPhoto) localStorage.setItem('escortRegistrationVerificationPhoto', JSON.stringify(verificationPhoto))
    }, [verificationPhoto])

    useEffect(() => {
        if (video360) localStorage.setItem('escortRegistrationVideo360', JSON.stringify(video360))
    }, [video360])

    useEffect(() => {
        localStorage.setItem('escortRegistrationImagesReview', JSON.stringify(imagesReview))
    }, [imagesReview])

    useEffect(() => {
        localStorage.setItem('escortRegistrationServices', JSON.stringify(services))
    }, [services])

    useEffect(() => {
        localStorage.setItem('escortRegistrationAboutme', aboutme)
    }, [aboutme])

    useEffect(() => {
        localStorage.setItem('escortRegistrationForm', JSON.stringify(form))
    }, [form])

    useEffect(() => {
        localStorage.setItem('escortRegistrationUploadedFiles', JSON.stringify(uploadedFiles))
    }, [uploadedFiles])

    const data = [
        { title: t('Personal data') },
        { title: t('Privacy and Terms') },
        { title: t('Profile') },
        { title: t('Appearance') },
        { title: t('Services offered') },
        { title: t('Payment') },
    ]

    const formItems = useMemo(() => {
        return [
            {
                ref: 'email',
                placeholder: t('email'),
                type: 'text',
                full: true,
                outline: true
            },
            {
                ref: 'password',
                placeholder: t('password'),
                component: CustomPasswordInput,
                value: formValue('password'),
                onChange: (e) => {
                    changeForm(e.target.value, 'password');
                    // If confirm password is already filled, check if they match
                    if (formProfile.confirmPassword && formProfile.confirmPassword.length > 0) {
                        if (e.target.value !== formProfile.confirmPassword) {
                            setErrors(prev => ({...prev, confirmPassword: t('passwords_dont_match')}));
                        } else {
                            setErrors(prev => {
                                const newErrors = {...prev};
                                delete newErrors.confirmPassword;
                                return newErrors;
                            });
                        }
                    }
                },
                required: true,
                validate: (value) => {
                    if (!value) return t('password_required');
                    if (value.length < 8) return t('password_min_length');
                    return null;
                }
            },
            {
                ref: 'confirmPassword',
                placeholder: t('confirm_password'),
                component: CustomPasswordInput,
                value: formValue('confirmPassword'),
                onChange: (e) => {
                    changeForm(e.target.value, 'confirmPassword');
                    // Check if passwords match
                    if (e.target.value !== formProfile.password) {
                        setErrors(prev => ({...prev, confirmPassword: t('passwords_dont_match')}));
                    } else {
                        setErrors(prev => {
                            const newErrors = {...prev};
                            delete newErrors.confirmPassword;
                            return newErrors;
                        });
                    }
                },
                required: true,
                validate: (value) => {
                    if (!value) return t('confirm_password_required');
                    if (value !== formProfile.password) return t('passwords_dont_match');
                    return null;
                },
                error: errors?.confirmPassword
            }
        ]
    }, [t])

    const registerTitles = useMemo(() => {
        return {
            'Personal data': {
                title: t("fill_in_your_details"),
                text: t("model_registration")
            },
            'Privacy and Terms': { 
                title: t("Privacy Policy"),
                text: t("Privacy Policy")
            },
            'Profile': {
                title: t("fill_in_your_profile"),
                text: t('profile')
            },
            'Appearance': {
                title: t("fill_in_your_details"),
                text: t('appearance')
            },
            'Services offered': {
                title: t("fill_in_your_details"),
                text: t('services_offered')
            },
            'Payment': {
                title: t("fill_in_your_details"),
                text: t("buy_highlights")
            }
        }
    }, [])

    const handleFormChange = (field, value) => {
        setFormProfile(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleRegionChange = (value) => {
        setFormProfile(prev => ({
            ...prev,
            region: value,
            city: ''
        }))
        setEthnicity(value)
    }

    const stepNavigation = {
        'Personal data': null, 
        'Privacy and Terms': 'Personal data',
        'Profile': 'Privacy and Terms',
        'Appearance': 'Profile',
        'Services offered': 'Appearance',
        'Payment': 'Services offered'
    };

  
    useEffect(() => {
        const currentPath = history.location.pathname;
        history.replace({
            pathname: currentPath,
            state: { currentStep: infoOption }
        });

        const handlePopState = (event) => {
            event.preventDefault();
            
            const prevStep = stepNavigation[infoOption];
            
            if (prevStep) {
                setInfoOption(prevStep);
                history.push({
                    pathname: currentPath,
                    state: { currentStep: prevStep }
                });
            } else {
                if (window.confirm(t('are_you_sure_you_want_to_leave'))) {
                    history.goBack();
                } else {
                    history.push({
                        pathname: currentPath,
                        state: { currentStep: infoOption }
                    });
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [infoOption, history]);

    const handleBack = () => {
        const prevStep = stepNavigation[infoOption];
        if (prevStep) {
            setInfoOption(prevStep);
        }
    };

    const validateCurrentStep = () => {
        switch(infoOption) {
            case 'Personal data':
                return true;
            
            case 'Privacy and Terms':
                return true;
            
            case 'Profile':
                return true;
            
            case 'Appearance':
                if (!uploadedFiles.photos || !Array.isArray(uploadedFiles.photos) || uploadedFiles.photos.length < 1) {
                    toast.error(t('please_upload_at_least_one_photo'));
                    return false;
                }
                
                if (!uploadedFiles.frontId) {
                    toast.error(t('please_upload_id_front'));
                    return false;
                }
                
                if (!uploadedFiles.backId) {
                    toast.error(t('please_upload_id_back'));
                    return false;
                }
                
                if (!uploadedFiles.verification) {
                    toast.error(t('please_upload_verification_photo'));
                    return false;
                }
                
                return true;
                
            case 'Services offered':
                if (services.length === 0) {
                    toast.error(t('please_select_at_least_one_service'));
                    return false;
                }
                if (!aboutme || aboutme.trim() === '') {
                    toast.error(t('please_provide_about_me_text'));
                    return false;
                }
                return true;
                
            case 'Payment':
                if (loading) {
                    toast.error(t('please_wait_for_payment_processing'));
                    return false;
                }
                return true;
                
            default:
                return true;
        }
    };

    const handleHeaderInfo = (option) => {
        const currentStepIndex = Object.keys(stepNavigation).indexOf(infoOption);
        const nextStepIndex = Object.keys(stepNavigation).indexOf(option);
        
        if (nextStepIndex > currentStepIndex) {
            if (!validateCurrentStep()) {
                return;
            }
        }
        
        history.push({
            pathname: history.location.pathname,
            state: { currentStep: infoOption }
        });
        
        setInfoOption(option);
    };

    const action = async (payload) => {
        try {
            setForm(prev => ({
                ...prev,
                ...payload
            }));
            
            handleHeaderInfo('Privacy and Terms');
        } catch (err) {
            console.error(err);
            toast.error(t("error_occurred"));
        }
    };

    const completeRegister = (user) => {
        if(user?.model){
            navigate('profile/model')
            return;
        }
        navigate('profile/customer')
    }

    const valid = (payload, array) => {
        for (let item of array) {
            if (item?.ref && !payload?.[item?.ref]) {
                toast.error(t("fill_all_fields"))
                return false;
            }
        }

        if(!isEmail(payload?.email)){
            toast.error(t("invalid_email"))
            return false;
        }

        if(payload?.password !== payload?.cpassword){
            toast.error(t("password_and_confirmation_not_match"))
            return false;
        }

        return true;
    };

    const saveStep1 = () => {
        // First, check if we're on the Personal data step and validate passwords
        if (infoOption === 'Personal data') {
            // Check if passwords are provided
            if (!formProfile.password || !formProfile.confirmPassword) {
                toast.error(t("password_fields_required"));
                return;
            }
            
            // Check if passwords match
            if (formProfile.password !== formProfile.confirmPassword) {
                toast.error(t("passwords_dont_match"));
                setErrors(prev => ({...prev, confirmPassword: t('passwords_dont_match')}));
                return;
            }
            
            // Check password length
            if (formProfile.password.length < 8) {
                toast.error(t("password_min_length"));
                setErrors(prev => ({...prev, password: t('password_min_length')}));
                return;
            }
        }
        
        // If all validations pass, proceed to the next step
        setInfoOption('Appearance');
        localStorage.setItem('escortRegistrationStep', 'Appearance');
    };

    const handleSuccess = () => {
        if (preuser?.user) { setUser(preuser.user) }

        setSuccess({
            title: t("registration_completed_successfully"),
            text: t("take_the_opportunity"),
            icon: 'email-big',
            buttons: [
                {
                    text: t("want_to_buy_later"),
                    action: () => navigate('admin/escort'),
                    rightIcon: 'chevron-white',
                    color: 'borderBackground',
                    between: true
                },
                {
                    text: t("i_want_to_buy_credits_now"),
                    action: () => navigate('purchase-of-credits'),
                    outlineGradient: true,
                    rightIcon: 'chevron-right',
                    between: true,
                },
            ]
        })
    }

    const init = () => {
        setOptions(DEFAULT_OPTIONS)
    }

    useEffect(() => { 
        init()
    }, [])

    const closeDropdowns = () => {
        const dropdowns = document.querySelectorAll('.select-dropdown, .select__menu')
        dropdowns.forEach(dropdown => {
            if (dropdown.parentElement) {
                dropdown.parentElement.style.pointerEvents = 'none'
                setTimeout(() => {
                    dropdown.parentElement.style.pointerEvents = 'auto'
                }, 100)
            }
            dropdown.remove()
        })
    }

    const handleCityChange = (value) => {
        closeDropdowns()
        handleFormChange('city', value)
    }

    const handleNationalityChange = (value) => {
        closeDropdowns()
        handleFormChange('nationality', value)
    }

    const handleCategoryChange = (value) => {
        closeDropdowns()
        handleFormChange('category', value)
    }

    const handleSizeChange = (value) => {
        closeDropdowns()
        handleFormChange('height', value)
    }

    const handleWeightChange = (value) => {
        closeDropdowns()
        handleFormChange('weight', value)
    }

    const handleHairColorChange = (value) => {
        closeDropdowns()
        handleFormChange('hair', value)
    }

    const handleEyeColorChange = (value) => {
        closeDropdowns()
        handleFormChange('eyes', value)
    }

    const handleBreastSizeChange = (value) => {
        closeDropdowns()
        handleFormChange('breasts', value)
    }

    const handleLanguageChange = (value) => {
        closeDropdowns()
        setLanguages(prev => ({
            ...prev,
            ...value
        }))
    }

    const handleMobilityChange = (value) => {
        closeDropdowns()
        setMobility(value)
    }

    const handlePaymentChange = (value) => {
        closeDropdowns()
        setPayments(value)
    }

    const video360Upload = useFileUpload();
    const imagesUpload = useFileUpload();
    const verificationPhotoUpload = useFileUpload();

    const createFileObject = (file) => {
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file),
            file: file
        };
    };

    const handleFileUploadError = (error) => {
        console.error('File upload error:', error);
        toast.error(t('file_upload_failed'));
    };

    // Add a cleanup function to remove any unnamed or invalid files
    const cleanupInvalidFiles = () => {
        // Clean up imagesReview
        setImagesReview(prev => {
            if (!Array.isArray(prev)) return [];
            
            return prev.filter(file => 
                file && 
                file.id && 
                file.id !== 'undefined' && 
                file.name && 
                file.name !== 'Unnamed file'
            );
        });
        
        // Clean up uploadedFiles.photos
        setUploadedFiles(prev => {
            const photos = Array.isArray(prev.photos) ? prev.photos.filter(file => 
                file && 
                file.id && 
                file.id !== 'undefined' && 
                file.name && 
                file.name !== 'Unnamed file'
            ) : [];
            
            return {
            ...prev,
                photos
            };
        });
    };

    // Call this cleanup function after uploads complete
    const handleImagesUpload = (files) => {
        if (!files) {
            handleFileUploadError(new Error('No files received from upload'));
            return;
        }
        
        console.log('Received uploaded files:', files);
        
        // Convert to array if it's a single file and filter out invalid files
        const newFiles = (Array.isArray(files) ? files : [files])
            .filter(file => {
                // Filter out files without proper metadata
                if (!file || !file.id || file.id === 'undefined' || !file.name) {
                    console.warn('Filtering out invalid file:', file);
                    return false;
                }
                
                // Filter out files with temporary IDs
                if (typeof file.id === 'string' && file.id.startsWith('temp-')) {
                    console.warn('Filtering out file with temporary ID:', file.id);
                    return false;
                }
                
                return true;
            });
        
        if (newFiles.length === 0) {
            console.warn('No valid files to add after filtering');
            return;
        }
        
        // Append new files to existing ones
        setImagesReview(prevFiles => {
            // Create a new array with existing files
            const prevArray = Array.isArray(prevFiles) ? [...prevFiles] : [];
            
            // Add new files, avoiding duplicates by checking IDs
            const filesToAdd = newFiles.filter(newFile => 
                !prevArray.some(existingFile => existingFile.id === newFile.id)
            );
            
            console.log('Adding files to imagesReview:', filesToAdd.length);
            return [...prevArray, ...filesToAdd];
        });
        
        // Update uploadedFiles state
        setUploadedFiles(prev => {
            const prevPhotos = Array.isArray(prev.photos) ? [...prev.photos] : [];
            
            // Add new files, avoiding duplicates
            const photosToAdd = newFiles.filter(newFile => 
                !prevPhotos.some(existingPhoto => existingPhoto.id === newFile.id)
            );
            
            console.log('Adding files to uploadedFiles:', photosToAdd.length);
            return {
                ...prev,
                photos: [...prevPhotos, ...photosToAdd]
            };
        });
        
        console.log('Photos updated, added:', newFiles.length, 'new files');
        
        // Clean up any invalid files after a short delay
        setTimeout(cleanupInvalidFiles, 500);
    };

    const handleVideo360Upload = (file) => {
        if (!file || !file.id) {
            console.error("Invalid 360 video file received:", file);
            toast.error(t("invalid_file_upload"));
            return;
        }
        
        console.log("360 video uploaded:", file);
        
        // Ensure the file has a valid ID
        if (typeof file.id === 'string' && file.id.startsWith('temp-')) {
            console.error("Temporary ID detected in 360 video:", file.id);
            toast.error(t("temporary_file_id"));
            return;
        }
        
        setUploadedFiles(prev => ({
            ...prev,
            video360: file
        }));
        setVideo360(file);
    };

    const handleFrontIdUpload = (file) => {
        setUploadedFiles(prev => ({
            ...prev,
            frontId: file
        }));
    };

    const handleBackIdUpload = (file) => {
        setUploadedFiles(prev => ({
            ...prev,
            backId: file
        }));
    };

    const handleVerificationUpload = (file) => {
        if (!file || !file.id) {
            console.error("Invalid verification file received:", file);
            toast.error(t("invalid_file_upload"));
            return;
        }
        
        console.log("Verification photo uploaded:", file);
        
        // Ensure the file has a valid ID
        if (typeof file.id === 'string' && file.id.startsWith('temp-')) {
            console.error("Temporary ID detected in verification photo:", file.id);
            toast.error(t("temporary_file_id"));
            return;
        }
        
        setUploadedFiles(prev => ({
            ...prev,
            verification: file
        }));
        setVerificationPhoto(file);
    };

    const handleRemoveFile = (type, fileId) => {
        if (type === 'photos' && fileId) {
            // Remove from uploadedFiles
            setUploadedFiles(prev => {
                const updatedPhotos = Array.isArray(prev.photos) 
                    ? prev.photos.filter(photo => photo.id !== fileId)
                    : [];
                return {
                    ...prev,
                    photos: updatedPhotos
                };
            });
            
            // Also remove from imagesReview
            setImagesReview(prev => {
                return Array.isArray(prev) 
                    ? prev.filter(photo => photo.id !== fileId)
                    : [];
            });
        } else {
            setUploadedFiles(prev => ({
                ...prev,
                [type]: null
            }));
            
            // Reset the corresponding state variable
            if (type === 'video360') {
                setVideo360(null);
            } else if (type === 'verification') {
                setVerificationPhoto(null);
            }
        }
    };

    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const initializeComponent = async () => {
            try {
                setLoading(true)
                setInitialized(true)
            } catch (err) {
                console.error('Initialization error:', err)
                setError(err.message)
                toast.error(t("error_loading_data"))
            } finally {
                setLoading(false)
            }
        }

        initializeComponent()

        return () => {
            setFormProfile({})
            setError(null)
        }
    }, [t])

    if (!initialized && loading) {
    return (
            <ContainerUnauthenticated>
                <BodyContainer>
                    <Background />
                    <BodyContent>
                        <Container style={{ 
                            width: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '50vh'
                        }}>
                            <Title>{t("loading")}...</Title>
                        </Container>
                    </BodyContent>
                </BodyContainer>
                <Footer />
            </ContainerUnauthenticated>
        );
    }

    if (error) {
        return (
            <ContainerUnauthenticated>
                <BodyContainer>
                    <Background />
                    <BodyContent>
                        <Container style={{ 
                            width: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '50vh'
                        }}>
                            <Title>{t("error_loading_data")}</Title>
                        </Container>
                    </BodyContent>
                </BodyContainer>
                <Footer />
            </ContainerUnauthenticated>
        );
    }

    return (
            <ContainerUnauthenticated keep background={success ? '/images/success.png' : ''} scrollTo={infoOption}>
            {success ? (
                <Success {...success} />
            ) : (
                <BodyContainer infoOption={infoOption}>
                            <Background />
                            <BodyContent>
                                <Container>
                                    <FormTitle>{registerTitles?.[infoOption]?.title}</FormTitle>
                                    <Title nomargin>{registerTitles?.[infoOption]?.text}</Title>
                                    <FormSpacer small />
                                </Container>
                                <InfoData data={data} active={infoOption} setActive={handleHeaderInfo} />
                        
                        {infoOption === 'Personal data' && (
                            <RegisterForm items={formItems} action={action} />
                        )}

                        {infoOption === 'Privacy and Terms' && (
                                        <PrivacyAndTerms 
                                            t={t}
                                            onAccept={() => handleHeaderInfo('Profile')}
                                        />
                        )}

                        {infoOption === 'Profile' && (
                            <>
                                <ServicesOffered 
                                    profile 
                                    options={DEFAULT_OPTIONS}
                                    active={mobility} 
                                    setActive={setMobility}
                                    subActive={payments} 
                                    setSubActive={setPayments}
                                    ethnicity={ethnicity} 
                                    setEthnicity={handleRegionChange}
                                    aboutme={description} 
                                    setAboutme={setDescription} 
                                    superForm={handleFormChange}
                                    superLang={handleLanguageChange}
                                    registering 
                                    selectedRegion={formProfile?.region}
                                    selectedCity={formProfile?.city}
                                    {...formProfile}
                                />
                                            <ButtonContent width='631px'>
                                    <Button 
                                        outlineGradient 
                                        nospace 
                                        rightIcon={'chevron-right'} 
                                        onClick={saveStep1}
                                        between
                                        disabled={
                                            (infoOption === 'Personal data' && (
                                                !formProfile.password || 
                                                !formProfile.confirmPassword || 
                                                formProfile.password !== formProfile.confirmPassword ||
                                                formProfile.password.length < 8 ||
                                                Object.keys(errors).length > 0
                                            ))
                                        }
                                    >
                                        {t("advance")}
                                    </Button>
                                            </ButtonContent>
                                        </>
                        )}

                        {infoOption === 'Appearance' && (
                                            <Content>
                                                <Appearance uploadedFile={video360} setUploadedFile={setVideo360} />
                                                
                                <AppearanceContainerStyled>
                                    <AppearanceTitleContainerStyled>
                                        <AppearanceTitleStyled>{t("Upload 360 video")}</AppearanceTitleStyled>
                                        <AppearanceTextStyled>
                                            <Icon icon="doubt" /> {t("instruction_on_how")}
                                        </AppearanceTextStyled>
                                    </AppearanceTitleContainerStyled>
                                    <UploadFile
                                        accept="video/mp4,video/avi"
                                        onChange={handleVideo360Upload}
                                        files={uploadedFiles.video360 ? [uploadedFiles.video360] : []}
                                        onRemove={() => handleRemoveFile('video360')}
                                        dragText="Drag the video here or click here"
                                        supportedFiles="MP4, AVI"
                                        maxFileSize="50mb"
                                    />
                                </AppearanceContainerStyled>

                                <AppearanceContainerStyled>
                                    <AppearanceTitleStyled>{t("Send photos")}</AppearanceTitleStyled>
                                    <UploadFile
                                        accept="image/*"
                                        multiple
                                        onChange={handleImagesUpload}
                                        files={uploadedFiles.photos}
                                        onRemove={(fileId) => handleRemoveFile('photos', fileId)}
                                        dragText="Drag the photos here or click here"
                                        supportedFiles="JPG, PNG"
                                        maxFileSize="8mb. Minimum 4 photos."
                                    />
                                </AppearanceContainerStyled>

                                <AppearanceContainerStyled>
                                    <AppearanceTitleStyled>{t("Upload ID Front")}</AppearanceTitleStyled>
                                    <UploadFile
                                        accept="image/*"
                                        onChange={handleFrontIdUpload}
                                        files={uploadedFiles.frontId ? [uploadedFiles.frontId] : []}
                                        onRemove={() => handleRemoveFile('frontId')}
                                        dragText="Drag the ID front here or click here"
                                        supportedFiles="JPG, PNG"
                                        maxFileSize="8mb"
                                    />
                                </AppearanceContainerStyled>

                                <AppearanceContainerStyled>
                                    <AppearanceTitleStyled>{t("Upload ID back")}</AppearanceTitleStyled>
                                    <UploadFile
                                        accept="image/*"
                                        onChange={handleBackIdUpload}
                                        files={uploadedFiles.backId ? [uploadedFiles.backId] : []}
                                        onRemove={() => handleRemoveFile('backId')}
                                        dragText="Drag the ID back here or click here"
                                        supportedFiles="JPG, PNG"
                                        maxFileSize="8mb"
                                    >
                                        <UploadFileContainer>
                                            {uploadedFiles.backId ? (
                                                <SampleImage url={uploadedFiles.backId.url} />
                                            ) : (
                                                <>
                                                    <Container />
                                                    <Icon icon="double-page" />
                                                    <AppearanceTextStyled>
                                                        {t('Drag the ID back here or click here')}
                                                    </AppearanceTextStyled>
                                                </>
                                            )}
                                        </UploadFileContainer>
                                    </UploadFile>
                                </AppearanceContainerStyled>

                                                <VerificationUploadContainer>
                                    <AppearanceTitleStyled>{t("Verification photo")}</AppearanceTitleStyled>
                                    <AppearanceTextStyled full>{t("send_a_photo_holding")}</AppearanceTextStyled>
                                                        <VerificationUpload>
                                                            <SampleContent>
                                            <SampleTitle>{t("exemple")}</SampleTitle>
                                                                <SampleImage url={'/images/verification2.jpg'} />
                                            <SampleTitle>{t("exemple")}</SampleTitle>
                                                            </SampleContent>

                                                            <UploadFile
                                                                accept="image/*" 
                                            onChange={handleVerificationUpload}
                                            files={uploadedFiles.verification ? [uploadedFiles.verification] : []}
                                            onRemove={() => handleRemoveFile('verification')}
                                            dragText="Drag the verification photo here or click here"
                                            supportedFiles="JPG, PNG"
                                            maxFileSize="8mb"
                                                            >
                                                                <UploadFileContainer>
                                                {uploadedFiles.verification ? (
                                                    <SampleImage url={uploadedFiles.verification.url} />
                                                ) : (
                                                    <>
                                                                                <Container />
                                                                                <Icon icon="double-page" />
                                                        <AppearanceTextStyled>
                                                            {t('drag_the_image_here_or_click_here')}
                                                        </AppearanceTextStyled>
                                                                            </>
                                                )}
                                                                </UploadFileContainer>
                                                            </UploadFile>
                                                        </VerificationUpload>
                                                </VerificationUploadContainer>
                                                
                                                <ButtonContent width='531px'>
                                    <Button 
                                        outlineGradient 
                                        rightIcon={'chevron-right'} 
                                        onClick={() => handleHeaderInfo('Services offered')} 
                                        between
                                    >
                                        {t("advance")}
                                    </Button>
                                                </ButtonContent>
                                            </Content>
                        )}

                        {infoOption === 'Services offered' && (
                                        <>
                                            <ServicesOffered 
                                                options={{
                                                    ...options,
                                                    services: SERVICES_OPTIONS
                                                }} 
                                                active={services} 
                                                setActive={setServices} 
                                                ethnicity={ethnicity} 
                                                setEthnicity={setEthnicity} 
                                                aboutme={aboutme} 
                                                setAboutme={setAboutme} 
                                                superForm={setForm} 
                                                registering 
                                            />
                                            <ButtonContent width='631px'>
                                                <Button 
                                                    outlineGradient 
                                                    nospace 
                                                    rightIcon={'chevron-right'} 
                                                    onClick={() => handleHeaderInfo('Payment')} 
                                                    between
                                                >
                                                    {t("advance")}
                                                </Button>
                                            </ButtonContent>
                                        </>
                        )}

                        {infoOption === 'Payment' && (
                            <Payment loading={loading} action={() => saveProfile()} />
                        )}
                            </BodyContent>
                        </BodyContainer>
            )}
            </ContainerUnauthenticated>
    )
}