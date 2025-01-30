import React, { useContext } from 'react'
import { DeleteAccountContainer, DeleteAccountText, DeleteAccountTitle } from './styled'
import Button from 'components/Form/Button';
import { CoreContext } from 'context/CoreContext';
import useI18n from 'hooks/useI18n';

export default function DeleteAccounts() {
  const { setModal } = useContext(CoreContext);

  const { t } = useI18n()

  const deleteText = t("admin_dashboard_delete_text");
  const formattedText = deleteText.split('\n').map((str, index) => (
    <React.Fragment key={index}>
      {str}
      <br />
    </React.Fragment>
  ));

  return (
    <>
      <DeleteAccountContainer>
        <DeleteAccountTitle>
          { t("admin_dashboard_delete_title") }
        </DeleteAccountTitle>
        <DeleteAccountText>
          {formattedText}
        </DeleteAccountText>
        <Button outline small width={'fit-content'} color={'info'} white leftIcon={'trash'} onClick={() => setModal({ type: 'deleteaccount' })}>{ t("admin_dashboard_delete_action") }</Button>
      </DeleteAccountContainer>
    </>
  )
}
