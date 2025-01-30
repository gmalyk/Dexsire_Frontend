import ContainerAuthenticated from 'containers/Authenticated'
import React, { useContext, useEffect, useState } from 'react'
import { Background, BodyContainer, BodyContent } from './styled'
import EscortProfileHeader from 'components/Profile/EscortProfileHeader'
import Footer from 'components/Footer'
import EscortInfo from 'components/EscortInfo'
import { CoreContext } from 'context/CoreContext'
import { useParams } from 'react-router-dom'
import { Read, ReadOne } from 'services/core'
import { exposeStrapiError, normalizeStrapiList, normalizeStrapiRegister } from 'utils'
import { Load, LoadCenter } from 'ui/styled'
import useTracker from 'hooks/useTracker'


export default function EscortProfile() {

  const { id } = useParams()
  const { user } = useContext(CoreContext)

  const { track } = useTracker(true)

  const [loading, setLoading] = useState(null)
  const [currentProfile, setCurrentProfile] = useState(null)
  const [allservices, setAllservices] = useState([])

  const init = async () => {
    const searchableId = id ? id : user?.model?.id
    
    setLoading(true)
    const result = await ReadOne("models", searchableId)
    setLoading(false)

    if(result && !exposeStrapiError(result)){
      const normalResult = normalizeStrapiRegister(result)
      const user = await ReadOne("users", normalResult?.user?.id)
      const normalUser = normalizeStrapiRegister(user)
      const nextResult = { ...normalResult, user: normalUser }
      // console.log("model", nextResult)
      setCurrentProfile(nextResult)

      track("click", { model: searchableId })
    }

    const rs = await Read("services")
    const nrs = normalizeStrapiList(rs)
    setAllservices(nrs)

  }

  useEffect(() => { init() ;}, [id, user])

  return (
    <>
      <ContainerAuthenticated free>
        <BodyContainer>
          <Background />
          <BodyContent>
            {
              loading ? <LoadCenter><Load /></LoadCenter> : <>
                <EscortProfileHeader profile={currentProfile} reload={init} /> 
                <EscortInfo profile={currentProfile} allservices={allservices} />
              </>
            }
          </BodyContent>
        </BodyContainer>
        <Footer />
      </ContainerAuthenticated>
    </>
  )
}
