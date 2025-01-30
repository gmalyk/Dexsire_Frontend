import React, { useContext } from 'react'
import { CloseContainer, CloseIconContent, CompanyDataContainer } from './styled'
import { CoreContext } from 'context/CoreContext'
import { Icon, ModalContainer, ModalContent, Overlay } from 'ui/styled'

export default function Wrapper({ children, noClose, center, background3, logo, background }) {
  const { setModal, superModal, setSuperModal } = useContext(CoreContext)

  const close = () => { 
    if(superModal?.type){
      setSuperModal(null);
      return;
    }
    setModal(null); 
  }

  const handleClose = (e) => {
    const mc = document.getElementById('modal-content');
    if (!mc?.contains(e?.target) && !(e?.target.tagName === 'LI')) {
      close()
    }
  }

  return (
    <>
      <Overlay onClick={handleClose}>
        <ModalContainer>
          <ModalContent id="modal-content" center={center} background3={background3} background={background}>
            {noClose ? null : <CloseContainer logo={logo}>
              {!logo ? null : <Icon icon="logo" />}
              <CloseIconContent onClick={close}>
                <Icon icon="close-white" />
              </CloseIconContent>
            </CloseContainer>
            }
            <CompanyDataContainer>
              {children}
            </CompanyDataContainer>
          </ModalContent>
        </ModalContainer>
      </Overlay>
    </>
  )
}
