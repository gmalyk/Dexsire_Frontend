import React, { useEffect, useState } from 'react'  

import Button from 'components/Form/Button'

import useI18n from 'hooks/useI18n'

import { optionsLanguage } from 'utils/options'
import { LangContent, LangItem, LangScroll, WrapLanguages } from './styled'

export default function LangSelector({ footer }) { 

  const { t, language, setLanguage } = useI18n() 

  const [open, setOpen] = useState(false)

  const action = async (m) => { 
    setLanguage(m?.id)
    setOpen(false)
  } 

  return (
    <> 
        <WrapLanguages>
          <Button nospace primary small leftIcon={'globelang'} rightIcon={`chevron-${ open ? `up` : `down` }`} onClick={() => setOpen(!open)}>
              { language }
          </Button>
          {
            !open ? null :
              <LangContent>
                <LangScroll footer={footer}>
                    {
                      optionsLanguage?.map((m, k) => 
                        <LangItem key={k} onClick={() => action(m)}>{ m.title }</LangItem>
                      )
                    }
                </LangScroll>
              </LangContent>
          }
        </WrapLanguages>
    </>
  )
}
