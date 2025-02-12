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
    VerificationUploadContainer
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

const DEFAULT_OPTIONS = {
    services: [
        { id: 1, title: 'Massage' },
        { id: 2, title: 'Escort' },
        { id: 3, title: 'Companionship' }
    ],
    regions: [
        { id: 1, title: 'Zürich' },
        { id: 2, title: 'Bern' },
        { id: 3, title: 'Luzern' },
        { id: 4, title: 'Uri' },
        { id: 5, title: 'Schwyz' },
        { id: 6, title: 'Geneva' }
    ],
    cities: [
        { id: 1, title: 'Zürich City', region: { data: { id: 1 } } },
        { id: 2, title: 'Winterthur', region: { data: { id: 1 } } },
        { id: 3, title: 'Uster', region: { data: { id: 1 } } },
        { id: 4, title: 'Bern City', region: { data: { id: 2 } } },
        { id: 5, title: 'Thun', region: { data: { id: 2 } } },
        { id: 6, title: 'Biel', region: { data: { id: 2 } } },
        { id: 7, title: 'Luzern City', region: { data: { id: 3 } } },
        { id: 8, title: 'Emmen', region: { data: { id: 3 } } },
        { id: 9, title: 'Uri City', region: { data: { id: 4 } } },
        { id: 10, title: 'Schwyz City', region: { data: { id: 5 } } },
        { id: 11, title: 'Geneva City', region: { data: { id: 6 } } }
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

// Composant d'upload simplifié
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

// Remplacer l'ancien useFileUpload par cette version optimisée
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

    // Cleanup on unmount
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

// Add this wrapper component at the top of the file
const LocalUploadWrapper = ({ children, onChange, skipApiCall }) => {
    const handleUpload = async (files) => {
        if (!files) return;
        
        // If it's a single file
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

        // If it's multiple files
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

    // Clone the child component with modified props
    const modifiedChildren = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onChange: handleUpload,
                skipApiCall: true,
                // Override any API-related props to prevent API calls
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

    const [loading, setLoading] = useState(false)
    const [infoOption, setInfoOption] = useState('Personal data')
    const [formProfile, setFormProfile] = useState({})
    const [mobility, setMobility] = useState([])
    const [payments, setPayments] = useState([])
    const [languages, setLanguages] = useState({})
    const [ethnicity, setEthnicity] = useState(null)
    const [description, setDescription] = useState("")
    const [success, setSuccess] = useState(null)

    const [preuser, setPreuser] = useState(null)
    const [video360, setVideo360] = useState(null); 
    const [verificationPhoto, setVerificationPhoto] = useState(null); 
    const [imagesReview, setImagesReview] = useState([]); 
    
    const [services, setServices] = useState([]); 
    const [aboutme, setAboutme] = useState(""); 
    
    const [options, setOptions] = useState(DEFAULT_OPTIONS)

    const contentRef = useRef(null);

    const [form, setForm] = useState({}) 

    const data = [
        { title: t('Personal data') },
        { title: t('Privacy and Terms') },
        { title: t('Profile') },
        { title: t('Appearance') },
        { title: t('Services offered') },
        { title: t('Payment') },
    ]

    const registerFormItems = useMemo(() => {
        return [
            
            {
                ref: 'email',
                placeholder: t('email'),
                type: 'text',
                full: true,
                outline: true,
            },
            {
                ref: 'password',
                placeholder: t('password'),
                type: 'password',
                password: true,
                full: true,
                outline: true,
                inputProps: {
                    autocomplete: "new-password",
                    "data-lpignore": "true",
                    "data-form-type": "other"
                }
            },
            {
                ref: 'cpassword',
                placeholder: t('confirm_password'),
                type: 'password',
                password: true,
                full: true,
                outline: true,
                inputProps: {
                    autocomplete: "off",
                    "data-lpignore": "true",
                    "data-form-type": "other"
                }
            },
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

    const handleHeaderInfo = (info) => setInfoOption(info)

    const action = async (payload) => {
        if (!valid(payload, registerFormItems)) { 
            return; 
        }
        handleHeaderInfo('Privacy and Terms');
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

    const saveStep1 = () => handleHeaderInfo('Appearance')

    const handleSuccess = () => {
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
                }
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

    // Gestionnaires d'upload modifiés
    const video360Upload = useFileUpload();
    const imagesUpload = useFileUpload();
    const verificationPhotoUpload = useFileUpload();

    // Gestionnaires d'upload modifiés
    const handleVideo360Upload = async (file) => {
        // Créer un fichier local avec une URL blob
        const localFile = await video360Upload.uploadSingleFile(file);
        if (localFile) {
            setVideo360(localFile);
        }
    };

    const handleImagesUpload = async (files) => {
        // Gérer plusieurs fichiers localement
        const localFiles = await imagesUpload.uploadMultipleFiles(files);
        if (localFiles?.length) {
            setImagesReview(prev => [...prev, ...localFiles]);
        }
    };

    const handleVerificationPhotoUpload = async (file) => {
        // Gérer un seul fichier localement
        const localFile = await verificationPhotoUpload.uploadSingleFile(file);
        if (localFile) {
            setVerificationPhoto(localFile);
        }
    };

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
                        <InfoData data={data} active={infoOption} />
                        
                        {infoOption === 'Personal data' && (
                            <RegisterForm items={registerFormItems} action={action} />
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
                                    >
                                        {t("advance")}
                                    </Button>
                                </ButtonContent>
                            </>
                        )}

                        {infoOption === 'Appearance' && (
                            <>
                                <Content>
                                    <Title small maxwidth={289}>{t("now_its_time_to_report_your_appearance")}</Title>
                                    <LocalUploadWrapper onChange={handleVideo360Upload}>
                                        <Appearance 
                                            uploadedFile={video360} 
                                            setUploadedFile={handleVideo360Upload}
                                        />
                                    </LocalUploadWrapper>
                                    <LocalUploadWrapper onChange={handleImagesUpload}>
                                        <UploadAndPreview 
                                            setUploadedFile={handleImagesUpload}
                                            preview={imagesReview}
                                        />
                                    </LocalUploadWrapper>
                                    <LocalUploadWrapper onChange={handleImagesUpload}>
                                        <UploadID 
                                            setUploadedFile={handleImagesUpload}
                                            preview={imagesReview}
                                        />
                                    </LocalUploadWrapper>

                                    <VerificationUploadContainer>
                                        <AppearanceTitle>{t("verification_photo")}</AppearanceTitle>
                                        <AppearanceText full>{t("send_a_photo_holding")}</AppearanceText>
                                        <VerificationUpload>
                                            <SampleContent>
                                                <SampleTitle>{t("exemple")}</SampleTitle>
                                                <SampleImage url={'/images/verification2.jpg'} />
                                                <SampleTitle>{t("exemple")}</SampleTitle>
                                            </SampleContent>

                                            <LocalUploadWrapper onChange={handleVerificationPhotoUpload}>
                                                <UploadFile
                                                    accept="image/*"
                                                >
                                                    <UploadFileContainer>
                                                        {verificationPhoto ? (
                                                            <SampleImage url={verificationPhoto.url} />
                                                        ) : (
                                                            <>
                                                                <Container />
                                                                <Icon icon="double-page" />
                                                                <AppearanceText>
                                                                    {t('drag_the_image_here_or_click_here')}
                                                                </AppearanceText>
                                                            </>
                                                        )}
                                                    </UploadFileContainer>
                                                </UploadFile>
                                            </LocalUploadWrapper>
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
                            </>
                        )}

                        {infoOption === 'Services offered' && (
                            <>
                                <ServicesOffered options={options} active={services} setActive={setServices} ethnicity={ethnicity} setEthnicity={setEthnicity} aboutme={aboutme} setAboutme={setAboutme} superForm={setForm} registering />
                                <ButtonContent width='631px'>
                                    <Button outlineGradient nospace rightIcon={'chevron-right'} onClick={() => handleHeaderInfo('Payment')} between >{ t("advance") }</Button>
                                </ButtonContent>
                            </>
                        )}

                        {infoOption === 'Payment' && (
                            <Payment loading={loading} action={() => handleSuccess()} />
                        )}
                    </BodyContent>
                </BodyContainer>
            )}
        </ContainerUnauthenticated>
    )
}