import React, { useContext, useMemo, useRef, useState } from 'react'
import { FiltersContainer, FilterTitle, FormContainer } from './styled'
import Button from 'components/Form/Button'
import FormCore from '../../components/Form/Core'
import { CoreContext } from 'context/CoreContext'
import { optionsCategory } from 'utils/options'
import useI18n from 'hooks/useI18n'

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

export default function HomeFilters() {
  const { setModal, regions, cities, services, filter, setFilter, escorts } = useContext(CoreContext)
  const { t } = useI18n()
  const [changed, setChanged] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('all')
  const formRef = useRef()

  const formItems = useMemo(() => {
    const allRegionsOptions = [
        { id: 'all', title: t('All Cantons') },
        ...[ // Rest of cantons sorted alphabetically
            { id: 'aarau', title: t('Aarau') },
            { id: 'basel', title: t('Basel') },
            { id: 'berne', title: t('Berne') },
            { id: 'fribourg', title: t('Fribourg') },
            { id: 'geneva', title: t('Geneva') },
            { id: 'glaris', title: t('Glaris') },
            { id: 'graubunden', title: t('Graubunden') },
            { id: 'luzern', title: t('Luzern') },
            { id: 'neuchatel', title: t('Neuchâtel') },
            { id: 'nidwald', title: t('Nidwald') },
            { id: 'solothurn', title: t('Solothurn') },
            { id: 'stgallen', title: t('St. Gallen') },
            { id: 'thurgau', title: t('Thurgau') },
            { id: 'ticino', title: t('Ticino') },
            { id: 'valais', title: t('Valais') },
            { id: 'vaud', title: t('Vaud') },
            { id: 'zurich', title: t('Zurich') }
        ].sort((a, b) => a.title.localeCompare(b.title))
    ];

    const citiesByRegion = {
        vaud: [
            { id: 'aigle', title: 'Aigle' },
            { id: 'aubonne', title: 'Aubonne' },
            { id: 'bex', title: 'Bex' },
            { id: 'bussigny', title: 'Bussigny' },
            { id: 'chavannes', title: 'Chavannes-Renens' },
            { id: 'clarens', title: 'Clarens' },
            { id: 'coppet', title: 'Coppet' },
            { id: 'corcelles', title: 'Corcelles-près-Payerne' },
            { id: 'crissier', title: 'Crissier' },
            { id: 'gland', title: 'Gland' },
            { id: 'lausanne', title: 'Lausanne' },
            { id: 'montreux', title: 'Montreux' },
            { id: 'morges', title: 'Morges' },
            { id: 'moudon', title: 'Moudon' },
            { id: 'nyon', title: 'Nyon' },
            { id: 'oron', title: 'Oron' },
            { id: 'payerne', title: 'Payerne' },
            { id: 'prilly', title: 'Prilly' },
            { id: 'renens', title: 'Renens' },
            { id: 'roche', title: 'Roche' },
            { id: 'vevey', title: 'Vevey' },
            { id: 'villeneuve', title: 'Villeneuve' },
            { id: 'yverdon', title: 'Yverdon-les-bains' }
        ],
        geneva: [
            { id: 'geneve', title: 'Genève' },
            { id: 'carouge', title: 'Carouge' },
            { id: 'champel', title: 'Champel' },
            { id: 'cite', title: 'Cité-Centre' },
            { id: 'cornavin', title: 'Cornavin' },
            { id: 'eauxvives', title: 'Eaux-vives' },
            { id: 'plainpalais', title: 'Plainpalais' },
            { id: 'planlesouates', title: 'Plan-les-ouates' },
            { id: 'servette', title: 'Servette' },
            { id: 'thonex', title: 'Thônex' },
            { id: 'versoix', title: 'Versoix' }
        ],
        valais: [
            { id: 'aproz', title: 'Aproz' },
            { id: 'ardon', title: 'Ardon' },
            { id: 'brig', title: 'Brig' },
            { id: 'collombey', title: 'Collombey' },
            { id: 'conthey', title: 'Conthey' },
            { id: 'cransmontana', title: 'Crans-Montana' },
            { id: 'gampel', title: 'Gampel' },
            { id: 'grone', title: 'Grône' },
            { id: 'leuk', title: 'Leuk' },
            { id: 'martigny', title: 'Martigny' },
            { id: 'monthey', title: 'Monthey' },
            { id: 'naters', title: 'Naters' },
            { id: 'nendaz', title: 'Nendaz' },
            { id: 'raron', title: 'Raron' },
            { id: 'riddes', title: 'Riddes' },
            { id: 'saillon', title: 'Saillon' },
            { id: 'saintleonard', title: 'Saint-Léonard' },
            { id: 'saintmaurice', title: 'Saint-Maurice' },
            { id: 'saxon', title: 'Saxon' },
            { id: 'sierre', title: 'Sierre' },
            { id: 'sion', title: 'Sion' },
            { id: 'turtmann', title: 'Turtmann' },
            { id: 'verbier', title: 'Verbier' },
            { id: 'vetroz', title: 'Vétroz' },
            { id: 'visp', title: 'Visp' },
            { id: 'zermatt', title: 'Zermatt' }
        ],
        neuchatel: [
            { id: 'cortaillod', title: 'Cortaillod' },
            { id: 'chaux', title: 'La Chaux-de Fonds' },
            { id: 'locle', title: 'Le Locle' },
            { id: 'neuchatel', title: 'Neuchâtel' }
        ],
        fribourg: [
            { id: 'bulle', title: 'Bulle' },
            { id: 'chatel', title: 'Châtel-Saint-Denis' },
            { id: 'dudingen', title: 'Düdingen' },
            { id: 'estavayer', title: 'Estavayer-le-Lac' },
            { id: 'fribourg', title: 'Fribourg' },
            { id: 'marly', title: 'Marly' },
            { id: 'romont', title: 'Romont' }
        ],
        aarau: [
            { id: 'aarau', title: 'Aarau' },
            { id: 'baden', title: 'Baden' },
            { id: 'bremgarten', title: 'Bremgarten' },
            { id: 'brugg', title: 'Brugg' },
            { id: 'frick', title: 'Frick' },
            { id: 'klingnau', title: 'Klingnau' },
            { id: 'kunten', title: 'Künten' },
            { id: 'lenzburg', title: 'Lenzburg' },
            { id: 'muri', title: 'Muri' },
            { id: 'oftringen', title: 'Oftringen' },
            { id: 'rheinfelden', title: 'Rheinfelden' },
            { id: 'schinznach', title: 'Schinznach-Bad' },
            { id: 'wettingen', title: 'Wettingen' },
            { id: 'wohlen', title: 'Wohlen' },
            { id: 'zofingen', title: 'Zofingen' }
        ],
        basel: [
            { id: 'basel', title: 'Basel' },
            { id: 'aesch', title: 'Aesch' },
            { id: 'allschwil', title: 'Allschwil' },
            { id: 'binningen', title: 'Binningen' },
            { id: 'birsfelden', title: 'Birsfelden' },
            { id: 'liestal', title: 'Liestal' },
            { id: 'muttenz', title: 'Muttenz' },
            { id: 'oberwil', title: 'Oberwil' },
            { id: 'pratteln', title: 'Pratteln' },
            { id: 'reinach', title: 'Reinach' }
        ],
        zurich: [
            { id: 'zurich', title: 'Zürich' },
            { id: 'adliswil', title: 'Adliswil' },
            { id: 'bulach', title: 'Bülach' },
            { id: 'dallikon', title: 'Dällikon' },
            { id: 'dietikon', title: 'Dietikon' },
            { id: 'dubendorf', title: 'Dübendorf' },
            { id: 'embrach', title: 'Embrach' },
            { id: 'horgen', title: 'Horgen' },
            { id: 'kloten', title: 'Kloten' },
            { id: 'meilen', title: 'Meilen' },
            { id: 'opfikon', title: 'Opfikon' },
            { id: 'regensdorf', title: 'Regensdorf' },
            { id: 'rumlang', title: 'Rümlang' },
            { id: 'schlieren', title: 'Schlieren' },
            { id: 'uster', title: 'Uster' },
            { id: 'volketswil', title: 'Volketswil' },
            { id: 'wallisellen', title: 'Wallisellen' },
            { id: 'wadenswil', title: 'Wädenswil' },
            { id: 'wetzikon', title: 'Wetzikon' },
            { id: 'winterthour', title: 'Winterthour' }
        ],
        solothurn: [
            { id: 'solothurn', title: 'Solothurn' },
            { id: 'balsthal', title: 'Balsthal' },
            { id: 'bellach', title: 'Bellach' },
            { id: 'biberist', title: 'Biberist' },
            { id: 'derendingen', title: 'Derendingen' },
            { id: 'grenchen', title: 'Grenchen' },
            { id: 'langendorf', title: 'Langendorf' },
            { id: 'olten', title: 'Olten' },
            { id: 'trimbach', title: 'Trimbach' },
            { id: 'zuchwil', title: 'Zuchwil' }
        ],
        luzern: [
            { id: 'luzern', title: 'Luzern' },
            { id: 'emmen', title: 'Emmen' },
            { id: 'gisikon', title: 'Gisikon' },
            { id: 'hochdorf', title: 'Hochdorf' },
            { id: 'horw', title: 'Horw' },
            { id: 'kriens', title: 'Kriens' },
            { id: 'meggen', title: 'Meggen' },
            { id: 'sarnen', title: 'Sarnen' },
            { id: 'sursee', title: 'Sursee' },
            { id: 'willisau', title: 'Willisau' }
        ],
        graubunden: [
            { id: 'arosa', title: 'Arosa' },
            { id: 'chur', title: 'Chur' },
            { id: 'davos', title: 'Davos' },
            { id: 'flims', title: 'Flims' },
            { id: 'laax', title: 'Laax' },
            { id: 'landquart', title: 'Landquart' },
            { id: 'malans', title: 'Malans' },
            { id: 'prattigau', title: 'Prättigau/Davos' },
            { id: 'samedan', title: 'Samedan' },
            { id: 'stmoritz', title: 'St. Moritz' }
        ],
        berne: [
            { id: 'berne', title: 'Berne' },
            { id: 'biel', title: 'Biel/Bienne' },
            { id: 'burgdorf', title: 'Burgdorf' },
            { id: 'interlaken', title: 'Interlaken' },
            { id: 'koniz', title: 'Köniz' },
            { id: 'langnau', title: 'Langnau im Emmental' },
            { id: 'ittigen', title: 'Ittigen' },
            { id: 'muri', title: 'Muri bei Bern' },
            { id: 'thun', title: 'Thun' },
            { id: 'wichtrach', title: 'Wichtrach' }
        ],
        thurgau: [
            { id: 'arbon', title: 'Arbon' },
            { id: 'frauenfeld', title: 'Frauenfeld' },
            { id: 'kreuzlingen', title: 'Kreuzlingen' },
            { id: 'romanshorn', title: 'Romanshorn' },
            { id: 'weinfelden', title: 'Weinfelden' }
        ],
        stgallen: [
            { id: 'stgallen', title: 'St. Gallen' },
            { id: 'altstatten', title: 'Altstätten' },
            { id: 'buchs', title: 'Buchs' },
            { id: 'gossau', title: 'Gossau' },
            { id: 'lenzburg', title: 'Lenzburg' },
            { id: 'rorschach', title: 'Rorschach' },
            { id: 'wittenbach', title: 'Wittenbach' },
            { id: 'wil', title: 'Wil' }
        ],
        ticino: [
            { id: 'ascona', title: 'Ascona' },
            { id: 'bellinzone', title: 'Bellinzone' },
            { id: 'biasca', title: 'Biasca' },
            { id: 'chiasso', title: 'Chiasso' },
            { id: 'giubiasco', title: 'Giubiasco' },
            { id: 'lugano', title: 'Lugano' },
            { id: 'locarno', title: 'Locarno' },
            { id: 'mendrisio', title: 'Mendrisio' },
            { id: 'riviera', title: 'Riviera' },
            { id: 'taverne', title: 'Taverne' }
        ],
        nidwald: [
            { id: 'buochs', title: 'Buochs' },
            { id: 'ennetburgen', title: 'Ennetbürgen' },
            { id: 'hergiswil', title: 'Hergiswil' },
            { id: 'stans', title: 'Stans' },
            { id: 'wolfenschiessen', title: 'Wolfenschiessen' }
        ],
        glaris: [
            { id: 'betschwanden', title: 'Betschwanden' },
            { id: 'glaris', title: 'Glaris' },
            { id: 'mitlodi', title: 'Mitlödi' },
            { id: 'nafels', title: 'Näfels' },
            { id: 'schwanden', title: 'Schwanden' }
        ]
    };

    // Create a flat array of all cities with their region information
    const allCities = Object.entries(citiesByRegion).flatMap(([region, cities]) => 
        cities.map(city => ({
            ...city,
            region: region
        }))
    ).sort((a, b) => a.title.localeCompare(b.title));

    // Get filtered cities based on selected region
    const filteredCities = selectedRegion === 'all' 
        ? allCities 
        : allCities.filter(city => city.region === selectedRegion);

    return [
      {
        ref: 'region',
            placeholder: t('All Cantons'),
            options: allRegionsOptions,
        customer: true,
            defaultValue: 'all',
            onChange: (value) => {
                setSelectedRegion(value)
                const form = formRef?.current?.getForm()
                if (form) {
                    form.city = ''
                    if (value === 'all') {
                        delete form.region
                    } else {
                        form.region = value
                    }
                    setChanged(!changed)
                }
            }
      }, 
      {
        ref: 'city',
            placeholder: t('Select City'),
            options: selectedRegion === 'all' 
                ? Object.values(citiesByRegion).flat() // Show all cities when "All Cantons" is selected
                : citiesByRegion[selectedRegion] || [], // Show only cities for the selected canton
            customer: true,
            onChange: (value) => {
                const form = formRef?.current?.getForm()
                if (form) {
                    form.city = value
                    
                    // If a city is selected and we're showing all cities,
                    // update the region to match the city's region
                    if (value && selectedRegion === 'all') {
                        // Find which region this city belongs to
                        for (const [region, cities] of Object.entries(citiesByRegion)) {
                            if (cities.some(city => city.id === value)) {
                                form.region = region
                                setSelectedRegion(region)
                                break
                            }
                        }
                    }
                    
                    setChanged(!changed)
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
            setFilter(prev => ({
                ...prev,
                services: values ? values.map(v => v.id) : []
            }));
            setChanged(true);
        },
        value: filter && filter.services ? filter.services.map(id => 
            SERVICE_OPTIONS.find(option => option.id === id)
        ).filter(Boolean) : []
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
                // Reset filter state
                setFilter(null)
                
                // Reset region selection
                setSelectedRegion('all')
                
                // Reset form values if getForm is available
                const form = formRef?.current?.getForm()
                if (form) {
                    form.region = 'all'
                    form.city = ''
                    form.category = 'Escort'
                }
                
                // Trigger re-render
                setChanged(!changed)
            }
      },
      {
        button: true,
        label: t('find_escorts'),
        quarter: !filter,
        customer: !!filter,
        action: () => save(),
      },
    ].filter(f => f)
}, [regions, services, escorts, cities, filter, changed, selectedRegion, t])

  const save = () => {
    const form = formRef?.current?.getForm()
    if (form && form.region === 'all') {
        const { region, ...restForm } = form
        setFilter(restForm)
    } else {
    setFilter({ ...form })
    }
    window.scrollTo(0, 720)
  }

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
  )
}