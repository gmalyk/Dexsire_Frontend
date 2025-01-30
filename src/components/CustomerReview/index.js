import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ButtonContainer, FormSpacer, Load, LoadCenter, Title } from 'ui/styled'
import { ReviewContainer } from './styled'
import CustomerReviewCard from 'components/Cards/CustomerReview'
import Button from 'components/Form/Button';
import { reviewsArray } from 'utils/options';
import { Container } from 'reactstrap';
import Core from 'components/Form/Core';
import { CoreContext } from 'context/CoreContext';
import { Create, Delete, Read, Update } from 'services/core';
import { exposeStrapiError, normalizeStrapiList, normalizeStrapiRegister, parseStrapiImage } from 'utils';
import { toast } from 'react-toastify';
import moment from 'moment';
import useI18n from 'hooks/useI18n';

export default function CustomerReview({ profile, noTitle, small, onTrash, title }) {

  const { user } = useContext(CoreContext)

  const { t } = useI18n()

  const formRef = useRef() 
  
  const [adding, setAdding] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [reviews, setReviews] = useState([])

  const canComment = useMemo(() => {
    return (profile && profile?.user?.id !== user?.id && !reviews?.map(m => m?.user?.id)?.includes(user?.id) )
  }, [])

  const reviewsArray = useMemo(() => {
    return reviews?.map(m => ({
        ...m,
        reviewer: {
            name: m?.user?.name,
            avatar: m?.user?.image?.url ? parseStrapiImage(m?.user?.image?.url) : "/images/image.png",
        },
        reviewText: m?.comment,
        date: moment(m?.createdAt)?.fromNow(),
        ratings: m?.rates?.reduce((p, c) => ({ ...p, [c?.title]:c?.rate }),{}) 
    })) 
  }, [reviews])

  const formItems = useMemo(() => [
    {
      type: 'rate',
      ref: 'service',
      placeholder: t("review_service"), 
      twenty: true,
    }, 
    {
      type: 'rate',
      ref: 'hygiene',
      placeholder: t("review_hygiene"),
      twenty: true,
    }, 
    {
      type: 'rate',
      ref: 'socialTime',
      placeholder: t("review_socialtime"),
      twenty: true,
    }, 
    {
      type: 'rate',
      ref: 'appearance',
      placeholder: t("review_apparence"),
      twenty: true,
    },  
    {
      type: 'rate',
      ref: 'location',
      placeholder: t("review_location"),
      twenty: true,
    },   
    {
      type: 'textarea',
      ref: 'comment',
      placeholder: t("review_comment"),
      required: true,
      full: true,
      outline: true,
    },
  ], [])

  const valid = (payload, array) => {
    for (let item of array) {
        if (item?.ref && !payload?.[item?.ref]) {
            toast.error( t("review_fill_all_fields") )
            return false;
        }
    } 
    return true;
  };

  const save = async () => {
    const form = formRef?.current?.getForm()
    if(!valid(form, formItems)){ return ;}

    const rate = parseFloat((
      form?.service +
      form?.hygiene +
      form?.socialTime +
      form?.appearance +
      form?.location
    ) / 5)

    const payload = {
      user: user?.id,
      model: profile?.id,
      comment: form?.comment,
      rate,
      rates: [
        { title: 'service', rate: form?.service },
        { title: 'hygiene', rate: form?.hygiene },
        { title: 'socialTime', rate: form?.socialTime },
        { title: 'appearance', rate: form?.appearance },
        { title: 'location', rate: form?.location },
      ]
    } 

    setSaving(true)
    const result = await Create("comments", { data: payload })
    setSaving(false)
    
    if(result && !exposeStrapiError(result)){ 
      // console.log("comments sent", result)
      setAdding(false)
      init();
    }

  }

  const init = async () => {
    if(profile?.id){
      setLoading(true)
      const result = await Read(`comments?filters[model][id][$eq]=${profile?.id}&populate[0]=user.image&populate[1]=rates`)
      setLoading(false)
      if(result && !exposeStrapiError(result)){
        const normalResult = normalizeStrapiList(result)?.map(m => ({
          ...m,
          user: normalizeStrapiRegister(m?.user)
        }))
        // console.log("comments found", normalResult)
        setReviews(normalResult)
      }
    }
  }

  const remove = async id => {
    const result = await Delete("comments", id)
    if(result && !exposeStrapiError(result)){
      init()
    }
  }

  useEffect(() => {
    const t = setTimeout(() => {  init() ;}, 600)
    return () => { clearTimeout(t) }
  }, [profile])

  return (
    <>
      <Container className='noPadding'>
        {
          loading ? <LoadCenter>
            <Load />
          </LoadCenter> : <>
          
              { 
                !reviewsArray?.length ? null : <>
                    {noTitle ? null : < Title small center> {title ? title : t("review_what_customer_saying") } </Title > }
                    <ReviewContainer>
                      {
                        reviewsArray?.map((review, index) => (
                          <CustomerReviewCard key={index} review={review} small={small} onTrash={onTrash ? () => remove(review?.id) : null} />
                        ))
                      }
                    </ReviewContainer>
                    <FormSpacer large />
                </>
              }
      
              {
                !canComment ? null : <>
                  {
                    !adding ? 
                      <ButtonContainer center>
                        <Button width={'179px'} outlineGradient nospace onClick={() => setAdding(true)}>
                          { t("review_left_comment") }
                        </Button>
                      </ButtonContainer> : <>
                          <FormSpacer />
                          <FormSpacer />
          
                          <Title small center>{ t("review_add_your_review") }</Title>
                          <Core ref={formRef} formItems={formItems} />
          
                          <ButtonContainer right>
                            <Button loading={saving} width={'179px'} outlineGradient nospace onClick={save}>
                              { t("review_sent_review") }
                            </Button>
                          </ButtonContainer>
                      </>
                  }
                </>
              }
          
          </>
        }

      </Container>
    </>
  )
}
