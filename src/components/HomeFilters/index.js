import React, { useContext, useMemo, useRef, useState, useEffect } from 'react'
import { FiltersContainer, FilterTitle, FormContainer } from './styled'
import Button from 'components/Form/Button'
import FormCore from '../../components/Form/Core'
import { CoreContext } from 'context/CoreContext'
import { optionsCategory } from 'utils/options'
import useI18n from 'hooks/useI18n'

// Define the cantons and cities
const CANTONS_AND_CITIES = {
  all: { id: 'all', title: 'All Regions', cities: [] },
  vaud: {
    id: 'vaud',
    title: 'Vaud',
    cities: [
      'Aigle', 'Aubonne', 'Bex', 'Bussigny', 'Chavannes-Renens', 'Clarens', 'Coppet',
      'Corcelles-près-Payerne', 'Crissier', 'Gland', 'Lausanne', 'Montreux', 'Morges',
      'Moudon', 'Nyon', 'Oron', 'Payerne', 'Prilly', 'Renens', 'Roche', 'Vevey',
      'Villeneuve', 'Yverdon-les-bains'
    ]
  },
  geneve: {
    id: 'geneve',
    title: 'Genève',
    cities: [
      'Genève', 'Carouge', 'Champel', 'Cité-Centre', 'Cornavin', 'Eaux-vives',
      'Plainpalais', 'Plan-les-ouates', 'Servette', 'Thônex', 'Versoix'
    ]
  },
  valais: {
    id: 'valais',
    title: 'Valais',
    cities: [
      'Aproz', 'Ardon', 'Brig', 'Collombey', 'Conthey', 'Crans-Montana', 'Gampel',
      'Grône', 'Leuk', 'Martigny', 'Monthey', 'Naters', 'Nendaz', 'Raron', 'Riddes',
      'Saillon', 'Saint-Léonard', 'Saint-Maurice', 'Saxon', 'Sierre', 'Sion',
      'Turtmann', 'Verbier', 'Vétroz', 'Visp', 'Zermatt'
    ]
  },
  neuchatel: {
    id: 'neuchatel',
    title: 'Neuchâtel',
    cities: ['Cortaillod', 'La Chaux-de Fonds', 'Le Locle', 'Neuchâtel']
  },
  fribourg: {
    id: 'fribourg',
    title: 'Fribourg',
    cities: [
      'Bulle', 'Châtel-Saint-Denis', 'Düdingen', 'Estavayer-le-Lac',
      'Fribourg', 'Marly', 'Romont'
    ]
  },
  aarau: {
    id: 'aarau',
    title: 'Aarau',
    cities: [
      'Aarau', 'Baden', 'Bremgarten', 'Brugg', 'Frick', 'Klingnau', 'Künten',
      'Lenzburg', 'Muri', 'Oftringen', 'Rheinfelden', 'Schinznach-Bad',
      'Wettingen', 'Wohlen', 'Zofingen'
    ]
  },
  basel: {
    id: 'basel',
    title: 'Basel',
    cities: [
      'Basel', 'Aesch', 'Allschwil', 'Binningen', 'Birsfelden', 'Liestal',
      'Muttenz', 'Oberwil', 'Pratteln', 'Reinach'
    ]
  },
  zurich: {
    id: 'zurich',
    title: 'Zürich',
    cities: [
      'Zürich', 'Adliswil', 'Bülach', 'Dällikon', 'Dietikon', 'Dübendorf',
      'Embrach', 'Horgen', 'Kloten', 'Meilen', 'Opfikon', 'Regensdorf',
      'Rümlang', 'Schlieren', 'Uster', 'Volketswil', 'Wallisellen',
      'Wädenswil', 'Wetzikon', 'Winterthour'
    ]
  },
  solothurn: {
    id: 'solothurn',
    title: 'Solothurn',
    cities: [
      'Solothurn', 'Balsthal', 'Bellach', 'Biberist', 'Derendingen',
      'Grenchen', 'Langendorf', 'Olten', 'Trimbach', 'Zuchwil'
    ]
  },
  luzern: {
    id: 'luzern',
    title: 'Luzern',
    cities: [
      'Luzern', 'Emmen', 'Gisikon', 'Hochdorf', 'Horw', 'Kriens',
      'Meggen', 'Sarnen', 'Sursee', 'Willisau'
    ]
  },
  graubunden: {
    id: 'graubunden',
    title: 'Graubünden',
    cities: [
      'Arosa', 'Chur', 'Davos', 'Flims', 'Laax', 'Landquart',
      'Malans', 'Prättigau/Davos', 'Samedan', 'St. Moritz'
    ]
  },
  berne: {
    id: 'berne',
    title: 'Berne',
    cities: [
      'Berne', 'Biel/Bienne', 'Burgdorf', 'Interlaken', 'Köniz',
      'Langnau im Emmental', 'Ittigen', 'Muri bei Bern', 'Thun', 'Wichtrach'
    ]
  },
  thurgau: {
    id: 'thurgau',
    title: 'Thurgau',
    cities: ['Arbon', 'Frauenfeld', 'Kreuzlingen', 'Romanshorn', 'Weinfelden']
  },
  stgallen: {
    id: 'stgallen',
    title: 'St. Gallen',
    cities: [
      'St. Gallen', 'Altstätten', 'Buchs', 'Gossau', 'Lenzburg',
      'Rorschach', 'Wittenbach', 'Wil'
    ]
  },
  ticino: {
    id: 'ticino',
    title: 'Ticino',
    cities: [
      'Ascona', 'Bellinzone', 'Biasca', 'Chiasso', 'Giubiasco',
      'Lugano', 'Locarno', 'Mendrisio', 'Riviera', 'Taverne'
    ]
  },
  nidwald: {
    id: 'nidwald',
    title: 'Nidwald',
    cities: ['Buochs', 'Ennetbürgen', 'Hergiswil', 'Stans', 'Wolfenschiessen']
  },
  glaris: {
    id: 'glaris',
    title: 'Glaris',
    cities: ['Betschwanden', 'Glaris', 'Mitlödi', 'Näfels', 'Schwanden']
  }
};

export default function HomeFilters() {
  const { setModal, services, filter, setFilter } = useContext(CoreContext)
  const { t } = useI18n()
  const [changed, setChanged] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(filter?.region || 'all')
  const [cityOptions, setCityOptions] = useState([])
  const [selectedServices, setSelectedServices] = useState(
    filter?.services?.length 
      ? filter.services.map(id => SERVICE_OPTIONS.find(option => option.id === id)).filter(Boolean)
      : []
  )
  const formRef = useRef()

  // Create region options for the dropdown
  const REGION_OPTIONS = useMemo(() => {
    const allOption = { id: 'all', title: t('All Regions'), value: 'all' }
    
    const regionOptions = Object.values(CANTONS_AND_CITIES)
      .filter(canton => canton.id !== 'all')
      .map(canton => ({
        id: canton.id,
        title: canton.title,
        value: canton.id
      }));
    
    return [allOption, ...regionOptions];
  }, [t]);

  // Update city options when region changes
  useEffect(() => {
    if (selectedRegion === 'all') {
      // For "All Regions", we can either show all cities or an empty list
      // Here we'll show all cities
      const allCities = [];
      Object.values(CANTONS_AND_CITIES).forEach(canton => {
        if (canton.id !== 'all' && canton.cities) {
          canton.cities.forEach(city => {
            allCities.push({
              id: `${city.toLowerCase().replace(/\s+/g, '-')}-${canton.id}`,
              title: city,
              value: `${city.toLowerCase().replace(/\s+/g, '-')}-${canton.id}`,
              canton: canton.id
            });
          });
        }
      });
      setCityOptions(allCities);
    } else {
      // Get cities for the selected canton
      const canton = CANTONS_AND_CITIES[selectedRegion];
      if (!canton || !canton.cities) {
        setCityOptions([]);
      } else {
        const filteredCities = canton.cities.map(city => ({
          id: `${city.toLowerCase().replace(/\s+/g, '-')}-${canton.id}`,
          title: city,
          value: `${city.toLowerCase().replace(/\s+/g, '-')}-${canton.id}`,
          canton: canton.id
        }));
        setCityOptions(filteredCities);
      }
    }
  }, [selectedRegion]);

  // Debug logging
  useEffect(() => {
    console.log('Selected region:', selectedRegion);
    console.log('City options:', cityOptions);
  }, [selectedRegion, cityOptions]);

  const SERVICE_OPTIONS = [
    { id: '69', title: '69' },
    { id: 'anulingus_recois', title: 'Anulingus (reçois)' },
    { id: 'cafe_pipe', title: 'Café Pipe' },
    { id: 'couple', title: 'Couple' },
    { id: 'doigte_anal', title: 'Doigté anal' },
    { id: 'domination_soft', title: 'Domination soft' },
    { id: 'duo', title: 'Duo' },
    { id: 'ejac_facial', title: 'Ejac Facial' },
    { id: 'ejac_en_bouche', title: 'Ejac en bouche' },
    { id: 'facesitting', title: 'Facesitting' },
    { id: 'fellation_protegee', title: 'Fellation protégée' },
    { id: 'femme_fontaine', title: 'Femme fontaine' },
    { id: 'fisting_donne', title: 'Fisting (donne)' },
    { id: 'french_kiss', title: 'French kiss' },
    { id: 'gfe', title: 'GFE' },
    { id: 'groupe_orgie', title: 'Groupe orgie' },
    { id: 'lingerie', title: 'Lingerie' },
    { id: 'masturbation', title: 'Masturbation' },
    { id: 'service_vip', title: 'Service VIP' },
    { id: 'sodomie_donne', title: 'Sodomie (donne)' },
    { id: 'soumise', title: 'Soumise' },
    { id: 'anulingus_donne', title: 'Anulingus (donne)' },
    { id: 'branlette_seins', title: 'Branlette seins' },
    { id: 'champagne_dore', title: 'Champagne doré' },
    { id: 'cunnilingus', title: 'Cunnilingus' },
    { id: 'doigte_vaginal', title: 'Doigté vaginal' },
    { id: 'double_penetration', title: 'Double pénétration' },
    { id: 'dejeuner_diner', title: 'Déjeuner/dîner' },
    { id: 'ejac_corps', title: 'Ejac corps' },
    { id: 'ejac_multiple_ok', title: 'Ejac multiple OK' },
    { id: 'fellation_nature', title: 'Fellation nature' },
    { id: 'fellation_royale', title: 'Fellation royale' },
    { id: 'fessees_acceptees', title: 'Fessées acceptées' },
    { id: 'fisting_recois', title: 'Fisting (reçois)' },
    { id: 'fetichisme', title: 'Fétichisme' },
    { id: 'gorge_profonde', title: 'Gorge profonde' },
    { id: 'jeux_de_roles', title: 'Jeux de rôles' },
    { id: 'massage_erotique', title: 'Massage érotique' },
    { id: 'rapport_sexuel', title: 'Rapport sexuel' },
    { id: 'sex_tovs', title: 'Sex tovs' },
    { id: 'sodomie_recois', title: 'Sodomie (reçois)' },
    { id: 'striptease', title: 'Striptease' }
  ];

  // Update selectedServices when filter changes
  useEffect(() => {
    if (filter && filter.services && Array.isArray(filter.services)) {
      setSelectedServices(
        filter.services.map(id => SERVICE_OPTIONS.find(option => option.id === id)).filter(Boolean)
      );
    } else {
      setSelectedServices([]);
    }
  }, [filter]);

  const formItems = useMemo(() => {
    return [
      {
        ref: 'region',
        placeholder: t('Select Region'),
        options: REGION_OPTIONS,
        customer: true,
        defaultValue: selectedRegion,
        value: selectedRegion,
        onChange: (value) => {
          console.log('Region changed to:', value);
          setSelectedRegion(value);
          
          const form = formRef?.current?.getForm();
          if (form) {
            form.region = value;
            // Clear city when region changes
            form.city = '';
            setChanged(!changed);
          }
        }
      },
      {
        ref: 'city',
        placeholder: t('Select City'),
        options: cityOptions,
        customer: true,
        onChange: (value) => {
          console.log('City changed to:', value);
          const form = formRef?.current?.getForm();
          if (form) {
            form.city = value;
            
            // If a city is selected and region is 'all', update the region
            if (value && selectedRegion === 'all') {
              // Extract canton from city value (format: city-canton)
              const cantonFromCity = value.split('-').pop();
              if (cantonFromCity && CANTONS_AND_CITIES[cantonFromCity]) {
                console.log('Setting region to:', cantonFromCity, 'based on city:', value);
                form.region = cantonFromCity;
                setSelectedRegion(cantonFromCity);
              }
            }
            
            setChanged(!changed);
          }
        }
      },
      {
        ref: 'services',
        placeholder: t('Services'),
        type: 'select',
        options: SERVICE_OPTIONS,
        isMulti: true,
        quarter: !filter,
        customer: !!filter,
        onChange: (values) => {
          setSelectedServices(values || []);
          setFilter(prev => ({
            ...prev,
            services: values ? values.map(v => v.id) : []
          }));
          setChanged(true);
        },
        value: selectedServices
      },
      {
        ref: 'category',
        placeholder: t('Escort'),
        options: optionsCategory,
        customer: true,
        defaultValue: 'Escort',
        value: 'Escort'
      },
      !filter ? null : {
        button: true,
        label: t('clear_filter'),
        customer: !!filter,
        action: () => {
          // Reset the filter state completely
          setFilter(null);
          
          // Reset the region selection
          setSelectedRegion('all');
          
          // Reset selected services
          setSelectedServices([]);
          
          // Reset the form values
          const form = formRef?.current?.getForm();
          if (form) {
            form.region = 'all';
            form.city = '';
            form.category = 'Escort';
            form.services = []; // Clear services in the form
          }
          
          // Force re-render to update the UI
          setChanged(!changed);
        }
      },
      {
        button: true,
        label: t('find_escorts'),
        quarter: !filter,
        customer: !!filter,
        action: () => save(),
      },
    ].filter(f => f);
  }, [t, REGION_OPTIONS, selectedRegion, cityOptions, changed, filter, SERVICE_OPTIONS, setFilter, selectedServices]);

  const save = () => {
    const form = formRef?.current?.getForm();
    if (form && form.region === 'all') {
      const { region, ...restForm } = form;
      setFilter(restForm);
    } else {
      setFilter({ ...form });
    }
    window.scrollTo(0, 720);
  };

  return (
    <FiltersContainer>
      <FilterTitle>
        {t('find_the_ideal_model')}
      </FilterTitle>
      <FormContainer>
        <FormCore ref={formRef} register={filter} formItems={formItems} />
        <Button outlineGradient nospace onClick={() => setModal({ type: 'searchadvanced' })}>
          <strong>{t('advanced_search')}</strong>
        </Button>
      </FormContainer>
    </FiltersContainer>
  );
}