import React, { useEffect, useState } from 'react';
import { AvailabilityCard, ButtonEditing, CardSection, CardText, IconContainer, SectionTitle, ServiceInfoCardContainer } from './styled';
import { Icon } from 'ui/styled';
import Input from 'components/Form/Input';
import useI18n from 'hooks/useI18n';

export default function ServiceInfoCard({ availability, prices, locations, editing, superForm, save }) {
  const [isEditing, setIsEditing] = useState([false, false, false]);

  const { t } = useI18n()

  const handleEdit =async  (index) => {

    if(isEditing[index]){
      // save
      await save()

    } 


    setIsEditing(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });


  };

  const addMore = index => {
    setCombinatedData(combinedData?.map((m,i) => i === index ? { ...m, data:[...m?.data, ""] } : m))
  }

  const [combinedData, setCombinatedData] = useState([ ]);

  const [form, setForm] = useState({ })
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

  useEffect(() => {
    if(superForm && typeof superForm === 'function'){ superForm(form) ;}
  }, [form])

  useEffect(() => {
    if(availability && prices && locations){
      // console.log("combined", availability , prices , locations)
      setCombinatedData([
        { title: t("availability_hours"), icon: 'clock', data: [availability], placeholders:[t("availability")] },
        { title: t("price"), icon: 'price-tag', data: prices.map(price => `${price.time} - ${price.amount}`), placeholders:[t("duration"), t("value")] },
        { title: t("where_do_you_serve"), icon: 'location', data: locations, placeholders:[t("location")] }
      ]);

      setForm({
        [`title-0-0`]: availability,
        ...prices?.map(price => `${price.time}`)?.reduce((p, c, i) => ({ ...p, [`title-1-${i}`]: c }),{}),
        ...prices?.map(price => `${price.amount}`)?.reduce((p, c, i) => ({ ...p, [`text-1-${i}`]: c }),{}),
        ...locations?.reduce((p, c, i) => ({ ...p, [`title-2-${i}`]: c }),{})
      })

    }else {
      // console.log("availability && prices && locations", availability , prices , locations)
    }
  }, [availability, prices, locations])

  return (
    <ServiceInfoCardContainer>
      {combinedData.map((section, index) => (
        <AvailabilityCard key={index}>
          {
            !editing ? null :
              <ButtonEditing abs onClick={() => handleEdit(index)}>
                <Icon icon={isEditing[index] ? 'save' : 'pencil'} />
              </ButtonEditing>
          }

          <IconContainer>
            <Icon icon={section.icon} />
          </IconContainer>
          <SectionTitle>{section.title}</SectionTitle>

          <CardSection>
            {section.data.map((item, idx) => (<>
              {
                !isEditing[index] ? 
                  <CardText key={idx}>{item}</CardText>
                : <> 
                    { index === 1 ? <Input noHolder type outline placeholder={section?.placeholders['1']} value={formValue(`text-${index}-${idx}`)} onChange={e => changeForm(e.target.value, `text-${index}-${idx}`)} /> : null }
                    <IconContainer>
                        <Input noHolder outline placeholder={section?.placeholders['0']} value={formValue(`title-${index}-${idx}`)} onChange={e => changeForm(e.target.value, `title-${index}-${idx}`)} />
                        {
                          index > 0 && (idx === section?.data?.length - 1 ) ? 
                          <ButtonEditing onClick={() => addMore(index)}>
                            <Icon icon={'plus-add'} />
                          </ButtonEditing> : null
                        }
                    </IconContainer>
                </>
              }
            </>
            ))}
          </CardSection>
        </AvailabilityCard>
      ))}
    </ServiceInfoCardContainer>
  );
}