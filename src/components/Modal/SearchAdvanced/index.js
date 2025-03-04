import { CoreContext } from 'context/CoreContext'
import React, { useContext, useMemo, useRef } from 'react'
import { SearchAdvancedContent, SearchAdvancedForm, SearchAdvancedTitle } from './styled'
import Wrapper from '../Wrapper';
import FormCore from '../../Form/Core';
import moment from 'moment';
import { optionsCategory } from 'utils/options';
import useI18n from 'hooks/useI18n';

const PREDEFINED_OPTIONS = {
  services: [
    "Anulingus (donne)", "Anulingus (reçois)", "Branlette seins", "Café Pipe",
    "Champagne doré", "Couple", "Cunnilingus", "Doigté anal", "Doigté vaginal",
    "Domination soft", "Double pénétration", "Duo", "Déjeuner/dîner", "Ejac Facial",
    "Ejac corps", "Ejac en bouche", "Ejac multiple OK", "Facesitting", 
    "Fellation nature", "Fellation protégée", "Fellation royale", "Femme fontaine",
    "Fessées acceptées", "Fisting (donne)", "Fisting (reçois)", "French kiss",
    "Fétichisme", "GFE", "Gorge profonde", "Groupe orgie", "Jeux de rôles",
    "Lingerie", "Massage érotique", "Masturbation", "Rapport sexuel", "Service VIP",
    "Sex tovs", "Sodomie (donne)", "Sodomie (reçois)", "Soumise", "Striptease"
  ].map(service => ({ id: service, title: service })),

  languages: [
    "English", "French", "German", "Spanish", "Russian", "Arabic", "Italian", "Portuguese"
  ].map(lang => ({ id: lang, title: lang })),

  nationalities: [
    "Switzerland", "France", "Spain", "Italy", "Portugal", "United Kingdom", "Germany",
    "Europe (Others)", "Latin America", "Asia", "Africa", "Russia", "Middle East",
    "Brazil", "Colombia", "Dominican Republic", "USA", "Puerto Rico", "Argentina",
    "Venezuela", "Mexico", "Australia", "Other"
  ].map(nationality => ({ id: nationality, title: nationality })),

  ages: Array.from({ length: 11 }, (_, i) => i + 18).map(age => ({ 
    id: age.toString(), 
    title: `${age} years` 
  })),

  cantons: [
    "Aarau",
    "Basel", 
    "Berne",
    "Fribourg",
    "Geneva",
    "Glaris",
    "Graubunden",
    "Luzern",
    "Neuchâtel",
    "Nidwald",
    "Solothurn", 
    "St. Gallen",
    "Thurgau",
    "Ticino",
    "Valais",
    "Vaud",
    "Zurich"
  ].map(canton => ({ id: canton, title: canton })),

  categories: [
    "Escorte", "BDSM / Domina", "Transexual", "Gay"
  ].map(category => ({ id: category, title: category }))
};

export default function ModalSearchAdvanced() {
  const { setModal, filter, setFilter } = useContext(CoreContext)
  const { t } = useI18n()
  const formRef = useRef()

  const formItems = useMemo(() => [
    {
      ref: 'region',
      placeholder: t("advancedsearch_canton"),
      options: PREDEFINED_OPTIONS.cantons,
      quarter: true,
    },
    {
      ref: 'age',
      placeholder: t("advancedsearch_age"),
      options: PREDEFINED_OPTIONS.ages,
      quarter: true,
    },
    {
      ref: 'service',
      placeholder: t("advancedsearch_services"),
      options: PREDEFINED_OPTIONS.services,
      quarter: true,
    },
    {
      ref: 'category',
      placeholder: t("advancedsearch_category"),
      options: PREDEFINED_OPTIONS.categories,
      quarter: true,
    },
    {
      ref: 'nationality',
      placeholder: t("advancedsearch_nationality"),
      options: PREDEFINED_OPTIONS.nationalities,
    },
    {
      ref: 'languages',
      placeholder: t("advancedsearch_lang"),
      options: PREDEFINED_OPTIONS.languages,
    },
    {
      button: true,
      label: t("advancedsearch_find"),
      quarter: true,
      outilineGradient: true,
      action: () => save(),
    },
  ], [t])

  const save = () => {
    const form = formRef?.current?.getForm()
    setFilter({ ...form })
    window.scrollTo(0, 720)
    setModal(null)
  }

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Wrapper background="/images/background3.jpeg" logo>
      <SearchAdvancedContent onClick={handleContainerClick}>
        <SearchAdvancedTitle>{t("advancedsearch_title")}</SearchAdvancedTitle>
        <SearchAdvancedForm>
          <FormCore ref={formRef} register={filter} formItems={formItems} />
        </SearchAdvancedForm>
      </SearchAdvancedContent>
    </Wrapper>
  )
}
