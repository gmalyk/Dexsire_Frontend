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
        { id: 2, title: 'Bern' },
        { id: 6, title: 'Geneva' },
        
        
        { id: 3, title: 'Luzern' },
        
        { id: 5, title: 'Schwyz' },
        { id: 4, title: 'Uri' },
        { id: 1, title: 'Zürich' },
        
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

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [infoOption, setInfoOption] = useState(() => {
        return localStorage.getItem('escortRegistrationStep') || 'Personal data'
    })
    const [formProfile, setFormProfile] = useState(() => {
        const savedProfile = localStorage.getItem('escortRegistrationProfile')
        return savedProfile ? JSON.parse(savedProfile) : {}
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
    const [video360, setVideo360] = useState(() => {
        const savedVideo = localStorage.getItem('escortRegistrationVideo360')
        return savedVideo ? JSON.parse(savedVideo) : null
    })
    const [verificationPhoto, setVerificationPhoto] = useState(() => {
        const savedPhoto = localStorage.getItem('escortRegistrationVerificationPhoto')
        return savedPhoto ? JSON.parse(savedPhoto) : null
    })
    const [imagesReview, setImagesReview] = useState(() => {
        const savedImages = localStorage.getItem('escortRegistrationImagesReview')
        return savedImages ? JSON.parse(savedImages) : []
    })

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
        if (video360) localStorage.setItem('escortRegistrationVideo360', JSON.stringify(video360))
    }, [video360])

    useEffect(() => {
        if (verificationPhoto) localStorage.setItem('escortRegistrationVerificationPhoto', JSON.stringify(verificationPhoto))
    }, [verificationPhoto])

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
                type: 'password',
                password: true,
                full: true,
                outline: true,
                inputProps: {
                    autoComplete: "off",
                    "data-lpignore": "true",
                    "data-form-type": "other",
                    webkitautofill: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                    autoCapitalize: "off",
                    "data-1p-ignore": "true",
                    "data-disable-password-manager": "true",
                    "data-private": "true",
                    maxLength: "524288",
                    autoSave: "off",
                    role: "presentation"
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
                    autoComplete: "off",
                    "data-lpignore": "true",
                    "data-form-type": "other",
                    webkitautofill: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                    autoCapitalize: "off",
                    "data-1p-ignore": "true",
                    "data-disable-password-manager": "true",
                    "data-private": "true",
                    maxLength: "524288",
                    autoSave: "off",
                    role: "presentation"
                }
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
        handleHeaderInfo('Appearance');
    };

    const handleSuccess = () => {
        localStorage.removeItem('escortRegistrationStep')
        localStorage.removeItem('escortRegistrationProfile')
        localStorage.removeItem('escortRegistrationMobility')
        localStorage.removeItem('escortRegistrationPayments')
        localStorage.removeItem('escortRegistrationLanguages')
        localStorage.removeItem('escortRegistrationEthnicity')
        localStorage.removeItem('escortRegistrationDescription')
        localStorage.removeItem('escortRegistrationPreuser')
        localStorage.removeItem('escortRegistrationVideo360')
        localStorage.removeItem('escortRegistrationVerificationPhoto')
        localStorage.removeItem('escortRegistrationImagesReview')
        localStorage.removeItem('escortRegistrationServices')
        localStorage.removeItem('escortRegistrationAboutme')
        localStorage.removeItem('escortRegistrationForm')
        localStorage.removeItem('escortRegistrationUploadedFiles')
        
        setSuccess(true)
        navigate('admin/escort')
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

    const handleVideo360Upload = (file) => {
        const fileObj = createFileObject(file);
        setUploadedFiles(prev => ({
            ...prev,
            video360: fileObj
        }));
        setVideo360(fileObj.file);
    };

    const handleImagesUpload = (files) => {
        if (!Array.isArray(files)) {
            files = [files]; 
        }
        
        const fileObjects = files.map(file => createFileObject(file));
        
        setUploadedFiles(prev => {
            const prevPhotos = Array.isArray(prev.photos) ? prev.photos : [];
            return {
                ...prev,
                photos: [...prevPhotos, ...fileObjects]
            };
        });
        
        setImagesReview(prev => {
            const prevImages = Array.isArray(prev) ? prev : [];
            return [...prevImages, ...fileObjects.map(f => f.file || f)];
        });
    };

    const handleFrontIdUpload = (file) => {
        const fileObj = createFileObject(file);
        setUploadedFiles(prev => ({
            ...prev,
            frontId: fileObj
        }));
    };

    const handleBackIdUpload = (file) => {
        const fileObj = createFileObject(file);
        setUploadedFiles(prev => ({
            ...prev,
            backId: fileObj
        }));
    };

    const handleVerificationUpload = (file) => {
        const fileObj = createFileObject(file);
        setUploadedFiles(prev => ({
            ...prev,
            verification: fileObj
        }));
        setVerificationPhoto(fileObj.file);
    };

    const handleRemoveFile = (type, fileId) => {
        if (type === 'photos' && fileId) {
            setUploadedFiles(prev => {
                const updatedPhotos = Array.isArray(prev.photos) 
                    ? prev.photos.filter(photo => photo.id !== fileId)
                    : [];
                return {
                    ...prev,
                    photos: updatedPhotos
                };
            });
        } else {
            setUploadedFiles(prev => ({
                ...prev,
                [type]: null
            }));
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
                                    >
                                        {t("advance")}
                                    </Button>
                                            </ButtonContent>
                                        </>
                        )}

                        {infoOption === 'Appearance' && (
                                            <Content>
                                <AppearanceContainerStyled>
                                    <AppearanceTitleContainerStyled>
                                        <AppearanceTitleStyled>{t("upload_360_video")}</AppearanceTitleStyled>
                                        <AppearanceTextStyled>
                                            <Icon icon="doubt" /> {t("instruction_on_how")}
                                        </AppearanceTextStyled>
                                    </AppearanceTitleContainerStyled>
                                    <UploadFile
                                        accept="video/mp4,video/avi"
                                        onChange={handleVideo360Upload}
                                        files={uploadedFiles.video360 ? [uploadedFiles.video360] : []}
                                        onRemove={() => handleRemoveFile('video360')}
                                        dragText="drag_the_video_here_or_click_here"
                                        supportedFiles="MP4, AVI"
                                        maxFileSize="50mb"
                                    />
                                </AppearanceContainerStyled>

                                <AppearanceContainerStyled>
                                    <AppearanceTitleStyled>{t("send_photos")}</AppearanceTitleStyled>
                                    <UploadFile
                                        accept="image/*"
                                        multiple
                                        onChange={handleImagesUpload}
                                        files={uploadedFiles.photos}
                                        onRemove={(fileId) => handleRemoveFile('photos', fileId)}
                                        dragText="drag_the_photos_here_or_click_here"
                                        supportedFiles="JPG, PNG"
                                        maxFileSize="8mb. Minimum 4 photos."
                                    />
                                </AppearanceContainerStyled>

                                <AppearanceContainerStyled>
                                    <AppearanceTitleStyled>{t("upload_id_front")}</AppearanceTitleStyled>
                                    <UploadFile
                                        accept="image/*"
                                        onChange={handleFrontIdUpload}
                                        files={uploadedFiles.frontId ? [uploadedFiles.frontId] : []}
                                        onRemove={() => handleRemoveFile('frontId')}
                                        dragText="drag_the_id_front_here_or_click_here"
                                        supportedFiles="JPG, PNG"
                                        maxFileSize="8mb"
                                    />
                                </AppearanceContainerStyled>

                                <AppearanceContainerStyled>
                                    <AppearanceTitleStyled>{t("upload_id_back")}</AppearanceTitleStyled>
                                    <UploadFile
                                        accept="image/*"
                                        onChange={handleBackIdUpload}
                                        files={uploadedFiles.backId ? [uploadedFiles.backId] : []}
                                        onRemove={() => handleRemoveFile('backId')}
                                        dragText="drag_the_id_back_here_or_click_here"
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
                                                        {t('drag_the_id_back_here_or_click_here')}
                                                    </AppearanceTextStyled>
                                                </>
                                            )}
                                        </UploadFileContainer>
                                    </UploadFile>
                                </AppearanceContainerStyled>

                                                <VerificationUploadContainer>
                                    <AppearanceTitleStyled>{t("verification_photo")}</AppearanceTitleStyled>
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
                                            dragText="drag_the_verification_photo_here_or_click_here"
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
                            <Payment loading={loading} action={() => handleSuccess()} />
                        )}
                            </BodyContent>
                        </BodyContainer>
            )}
            </ContainerUnauthenticated>
    )
}