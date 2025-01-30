import { CoreContext } from 'context/CoreContext'
import React, { useContext, useState } from 'react'
import { FormText, Icon, Title } from 'ui/styled'
import { AgeVerification, ButtonContent, CloseContainer, CompanyButtonContainer, DeleteAccountContainer, Logo, ModalText, ModalTitle, PlanValue, PurchaseDetails, SubValue, TermContainer, Value } from './styled'
import Wrapper from '../Wrapper';
import Button from 'components/Form/Button';
import { Container } from 'reactstrap';
import { RemoveMe } from 'services/me';
import { toast } from 'react-toastify';
import { DoLogout } from 'services/authentication';
import { useHistory } from 'react-router-dom';
import useI18n from 'hooks/useI18n';

export default function ModalDeleteAccounts() {

  const history = useHistory(); 
  const navigate = to => history.push(`/${ to }`); 

  const { modal,setTracker, setModal, setUser } = useContext(CoreContext)

  const { t } = useI18n()

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)


  const close = () => {
    setModal(null)
  }
 

  const exit = async () => {  
    await DoLogout()  
        setUser(null)
        setTracker(null)
    navigate('login');
  }  

  const deleteAccount = async () => { 
      setLoading(true)
      await RemoveMe();
      toast.error('Account deleted successfully')
      exit();
      close()
      setLoading(false)  
  }

  return (
    <>
      <Wrapper background={'/images/success.png'}>
        <DeleteAccountContainer>
          <Logo icon={"logo"} />
          {
            success ? null : <>
              <ModalTitle>
                { t("deleteaccount_title") }
              </ModalTitle>
              <ModalText>
              { t("deleteaccount_text") }
              </ModalText>
              <ButtonContent>
                <Button loading={loading} onClick={deleteAccount} small outline color={'info'} width={'fit-content'} leftIcon={'trash'}>
                { t("deleteaccount_confirm") }
                </Button>
                <Button onClick={close} small color={'lightBlue'} width={'fit-content'} leftIcon={'trash-white'}>
                { t("deleteaccount_cancel") }
                </Button>
              </ButtonContent>
            </>
          }
          {
            !success ? null : <>
              <ModalTitle>
              { t("deleteaccount_success_title") }
              </ModalTitle>
              <ModalText>
              { t("deleteaccount_success_text") }
              </ModalText>
            </>}
        </DeleteAccountContainer>
      </Wrapper >
    </>
  )
}
