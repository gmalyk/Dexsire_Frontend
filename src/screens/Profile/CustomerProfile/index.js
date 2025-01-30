import Footer from 'components/Footer'
import ContainerAuthenticated from 'containers/Authenticated'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Background, Icon, Load, Title } from 'ui/styled'
import { BodyContainer, BodyContent, ButtonContainer, EscortsCardContainer, IconContainer, PreviewContainer, PreviewImg, UserEscortFavorite, UserHeader, UserInfoContainer, UserInfoContent } from './styled'
import UserInfo from 'components/UserInfo'
import Button from 'components/Form/Button'
import EscortsCard from 'components/Cards/EscortsCard'
import { CoreContext } from 'context/CoreContext'
import moment from 'moment'
import { RemoveMe, UpdateMe } from 'services/me'
import { toast } from 'react-toastify'
import { DoLogout } from 'services/authentication'
import { useHistory } from 'react-router-dom'
import { exposeStrapiError, normalizeStrapiList, normalizeStrapiRegister, parseStrapiImage } from 'utils'
import UploadFile from 'components/Form/UploadFile'
import { Read } from 'services/core'
import useI18n from 'hooks/useI18n'

// const escorts = [
//   {
//     name: "Sofia Oliveira",
//     emphasis: true,
//     location: {
//       city: "Florianópolis",
//       state: "Santa Catarina"
//     },
//     urls: [
//       '/images/escort2.jpeg',
//     ]
//   },
//   {
//     name: "Helena Pereira",
//     emphasis: false,
//     location: {
//       city: "São Paulo",
//       state: "São Paulo"
//     },
//     urls: [
//       '/images/escort.jpeg',
//     ]
//   },
//   {
//     name: "Amanda Silva",
//     emphasis: false,
//     location: {
//       city: "Rio de Janeiro",
//       state: "Rio de Janeiro"
//     },
//     urls: [
//       '/images/escort2.jpeg',
//     ]
//   },
//   {
//     name: "Amanda Silva",
//     emphasis: false,
//     location: {
//       city: "Rio de Janeiro",
//       state: "Rio de Janeiro"
//     },
//     urls: [
//       '/images/escort.jpeg',
//       '/images/escort2.jpeg',
//     ]
//   },
//   {
//     name: "Amanda Silva",
//     emphasis: false,
//     location: {
//       city: "Rio de Janeiro",
//       state: "Rio de Janeiro"
//     },
//     urls: [
//       '/images/escort.jpeg',
//       '/images/escort2.jpeg',
//     ]
//   },
//   {
//     name: "Amanda Silva",
//     emphasis: true,
//     location: {
//       city: "Rio de Janeiro",
//       state: "Rio de Janeiro"
//     },
//     urls: [
//       '/images/escort.jpeg',
//       '/images/escort2.jpeg',
//     ]
//   },
// ];

export default function CustomerProfile() {

  const history = useHistory(); 
  const navigate = to => history.push(`/${ to }`); 

  const { t } = useI18n()

  const { user, reloadMe, setModal, setTracker, setUser } = useContext(CoreContext)
  const [beggining, setBeggining] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [preview, setPreview] = useState(user?.image?.url ? parseStrapiImage(user?.image?.url) : null)
  const [fetching, setFetching] = useState(false)
  
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({})
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

  const [escorts, setEscorts] = useState([])

  const handleEditing = () => {
    setIsEditing(!isEditing)
    if(isEditing){
      save()
    }else{
      setTimeout(() => { document.getElementById('focus-Name')?.focus() }, 100)
    }
  }

  const takePic = async (result) => { 
    setFetching(true)  
    console.log(result)
    if(result?.id){
        await UpdateMe({ image: result.id })
        setPreview( parseStrapiImage(result?.url) )
    } 
    setFetching(false) 
  }

  const useInfos = useMemo(() => {
    setForm({ ...form, Name: user?.name }) 
    if(user?.image?.url){ setPreview(parseStrapiImage(user?.image?.url)); }
    return [
      { text: t("customer_profile_name"), value: user?.name },
      { text: t("customer_profile_user"), value: moment(user?.createdAt)?.format("MMMM DD, YYYY"), noEdit: true },
      { text: t("customer_profile_status"), value: user?.status ? 'Active' : 'Inactive', noEdit: true },
      { text: t("customer_profile_email"), value: user?.email, noEdit: true },
      { text: t("customer_profile_subs_type"), value: user?.plan?.title, noEdit: true },
      { text: t("customer_profile_subs_value"), value: `${ user?.plan?.price || "0" } francs`, noEdit: true },
    ]
  }, [user])

  const save = async () => {  
    setLoading(true)
      const payload = {
        name: form?.Name
      }

      const result = await UpdateMe({ ...payload })

      if(result && !exposeStrapiError(result)){
        toast.success( t("customer_profile_saved") )
        reloadMe()
      }

    setLoading(false)
  }

  const exit = async () => {  
    await DoLogout()  
        setUser(null)
        setTracker(null)
    navigate('login');
  }  

  const deleteAccount = () => { 
      setModal({ type: 'deleteaccount' })
  }

  const init = async () => {
    if(user?.id){ 
      const result = await Read(`likes?filters[user]=${user?.id}&populate[0]=model.photos&populate[1]=model.region&populate[2]=model.user`)
      const normalresult = normalizeStrapiList(result).map(m => ({ ...m, model: normalizeStrapiRegister(m?.model)}))
      // console.log("likex", normalresult)

      const next = normalresult?.filter(f => f?.model?.user)?.map(m => ({
        name: m?.model?.user?.name,
        // emphasis: true,
        location: {
          city: m?.model?.region?.title,
          // state: "Santa Catarina"
        },
        urls: m?.model?.photos?.map(m => parseStrapiImage(m?.url)),
        verified: m?.model?.verified,
        profile: m?.model
      }))

      setEscorts(next)
    }
  }

  useEffect(() => { 
    if(!beggining){ 
      setBeggining(true)
      reloadMe() ; 
    }
  }, [])
  
  useEffect(() => { init() }, [user])

  return (
    <>
      <ContainerAuthenticated>
        <BodyContainer>
          <Background />
          <BodyContent>
            <UserHeader>
              <PreviewContainer>
                <UploadFile onChange={takePic} onPreview={setPreview}>
                  { fetching ? <Load /> : <PreviewImg src={ preview ? preview : '/images/image.png'} /> }
                </UploadFile>
              </PreviewContainer>
              <UserInfoContainer>
                {
                  useInfos?.map((item, index) => (
                    <UserInfoContent>
                      <UserInfo
                        key={index}
                        text={item?.text}
                        value={item?.value}
                        medium={item?.medium}
                        noEdit={item?.noEdit}
                        isEditing={isEditing}
                        formValue={formValue}
                        changeForm={changeForm}
                      />
                    </UserInfoContent>
                  ))
                }
              </UserInfoContainer>
              <ButtonContainer>
                <Button onClick={handleEditing} nospace small leftIcon={'pencil-small'} color={'lightBlue'}>
                  {isEditing ? t("customer_profile_save") : t("customer_profile_edit") }
                </Button>
                <Button onClick={deleteAccount} loading={loading} nospace outline small leftIcon={'trash'} color={'info'}>
                  { t("customer_profile_delete") }
                </Button>
              </ButtonContainer>
            </UserHeader>
            <UserEscortFavorite>
              <IconContainer>
                <Icon icon={'heart-white'} width={25} />
              </IconContainer>
              <Title maxwidth={403}>
                { t("customer_profile_fav") }
              </Title>
            </UserEscortFavorite>
            <EscortsCardContainer>
              {
                escorts.map((m, k) => (
                  <EscortsCard {...m} key={k} reload={init} user={user} />
                ))
              }
            </EscortsCardContainer>
          </BodyContent>
        </BodyContainer>
        <Footer />
      </ContainerAuthenticated>
    </>
  )
}
