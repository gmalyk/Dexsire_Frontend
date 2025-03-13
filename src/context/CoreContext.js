import React, { useState, createContext, useEffect } from 'react'
import { ReadObject, SaveObject } from '../services/storage'
import { ReadMe } from 'services/me'
import { ReadOne } from 'services/core'
import { exposeStrapiError, normalizeStrapiRegister } from 'utils'
import { optionsLanguage } from 'utils/options'
 
export const CoreContext = createContext({})

export const CoreState = ({ children }) => { 
 
	const [loading, setLoading] = useState(null)
	const [modal, setModal] = useState(null)
	const [superModal, setSuperModal] = useState(null)

	const [escorts, setEscorts] = useState([]) 

	const [cities, setCities] = useState([])
	const [regions, setRegions] = useState([])
	const [services, setServices] = useState([])
	const [contactUs, setContactUs] = useState(null)
	const [filter, setFilter] = useState(null)
	
	const [adminPages, setAdminPages] = useState([])
	const [currentProfile, setCurrentProfile] = useState(null) 

	const [user, setUser] = useState(ReadObject('user') ? ReadObject('user') : [])
	const [aged, setAged] = useState(ReadObject('aged') ? ReadObject('aged') : false)
	const [tracker, setTracker] = useState(ReadObject('tracker') ? ReadObject('tracker') : null)

	const [language, setLanguage] = useState(ReadObject('language') ? ReadObject('language') : optionsLanguage?.[0]?.id)
	const [translation, setTranslation] = useState(ReadObject('translation') ? ReadObject('translation') : null)

	useEffect(() => {
		if (modal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [modal]);


    const reloadMe = async () => {
        const result = await ReadMe()
        if(result?.id){
            setUser(result)
        } 
		return result
    }

	const reloadProfile = async (searchableId) => {
      
		setLoading(true)
		const result = await ReadOne("models", searchableId)
		setLoading(false)
	
		if(result && !exposeStrapiError(result)){
		  const normalResult = normalizeStrapiRegister(result)
		  const user = await ReadOne("users", normalResult?.user?.id)
		  const normalUser = normalizeStrapiRegister(user)
		  const nextResult = { ...normalResult, user: normalUser }
		  setCurrentProfile(nextResult)
		} 
	}

	const contextValue = {
		user, setUser,
		modal, setModal,
		aged, setAged,
		reloadMe, 
		services, setServices,
		cities, setCities,
		regions, setRegions,
		contactUs, setContactUs,
		filter, setFilter,
		adminPages, setAdminPages,
		currentProfile, setCurrentProfile,
		reloadProfile,
		loading, setLoading,
		tracker, setTracker,
		escorts, setEscorts,
		superModal, setSuperModal,

		language, setLanguage,
		translation, setTranslation,

	}

	// to persist state when app reload  
	useEffect(() => { SaveObject('user', user); }, [user])
	useEffect(() => { SaveObject('aged', aged); }, [aged])
	useEffect(() => { SaveObject('tracker', tracker); }, [tracker])
	useEffect(() => { SaveObject('language', language); }, [language])
	useEffect(() => { SaveObject('translation', translation); }, [translation])

	return <CoreContext.Provider value={contextValue}>{children}</CoreContext.Provider>
}
