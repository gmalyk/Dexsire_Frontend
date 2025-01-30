import React, { useCallback, useContext, useEffect } from "react";
import { CoreContext } from "context/CoreContext";

export default function useI18n(){
    
    const { language, setLanguage, translation, setTranslation } = useContext(CoreContext)
    
    const t = useCallback(ref => translation?.translations?.[ref] || ref, [language, translation]);

    const loadTranslation = async () => {
        const { static_translation } = (require(`utils/i18n/${language.toLowerCase()}`)||require(`utils/i18n/english`)||({ static_translation:[] }))
        const next_translation = {
            language: language,
            translations:{ ...static_translation }
        }
        setTranslation(next_translation)
    }

    useEffect(() => { 
        loadTranslation()
    }, [language])

    return {
        t,
        language,
        translation,
        setLanguage
    }
}