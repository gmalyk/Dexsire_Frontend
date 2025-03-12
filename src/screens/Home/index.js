import React, { useContext, useEffect, useRef } from 'react'
import { CoreContext } from 'context/CoreContext'
import { Read } from 'services/core'

export default function Home() {
  const { setCities, setRegions, setServices, setEscorts } = useContext(CoreContext)
  const dataFetched = useRef(false)
  
  useEffect(() => {
    // Only fetch data once when the component mounts
    if (!dataFetched.current) {
      fetchInitialData()
      dataFetched.current = true
    }
  }, [])
  
  const fetchInitialData = async () => {
    try {
      // Fetch all necessary data in parallel
      const [regionsData, citiesData, servicesData, escortsData] = await Promise.all([
        Read('regions'),
        Read('cities'),
        Read('services'),
        Read('escorts')
      ])
      
      // Update context with fetched data
      setRegions(regionsData?.data || [])
      setCities(citiesData?.data || [])
      setServices(servicesData?.data || [])
      setEscorts(escortsData?.data || [])
    } catch (error) {
      console.error('Error fetching initial data:', error)
    }
  }
  
  // Rest of your component...
} 