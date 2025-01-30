import PaymentCard from 'components/Cards/PaymentCard';
import MyCredits from 'components/MyCredits';
import React, { useContext, useMemo } from 'react';
import Button from 'components/Form/Button';
import { CardsContainer, CreditsContainer } from './styled';
import EscortPlansCard from 'components/Cards/EscortPlans';
import { CoreContext } from 'context/CoreContext';
import useI18n from 'hooks/useI18n';

export default function Plans() {
  const { setModal, user } = useContext(CoreContext);

  const { t } = useI18n()


  const plansItem = useMemo(() => [
    {
      icon: 'basic',
      title: t("admin_dashboard_plans1_title"),
      subtitle: t("admin_dashboard_plans1_subtitle"),
      text: t("admin_dashboard_plans1_text"),
      value: `5 ${ t("admin_dashboard_credits_credit") }s`,
      price: '89,90',
      label: t("admin_dashboard_plans1_label"),
      action: (item) => setModal({ type: 'purchasedetails', data: { ...item } }),
    },
    {
      icon: 'bronze',
      title: t("admin_dashboard_plans2_title"),
      subtitle: t("admin_dashboard_plans2_subtitle"),
      text: t("admin_dashboard_plans2_text"),
      value: `15 ${ t("admin_dashboard_credits_credit") }s`,
      price: '199,90',
      label: t("admin_dashboard_plans2_label"),
      action: (item) => setModal({ type: 'purchasedetails', data: { ...item } }),
    },
    {
      icon: 'premium',
      title: t("admin_dashboard_plans3_title"),
      subtitle: t("admin_dashboard_plans3_subtitle"),
      text: t("admin_dashboard_plans3_text"),
      value: `30 ${ t("admin_dashboard_credits_credit") }s`,
      price: '399,90',
      label: t("admin_dashboard_plans3_label"),
      action: (item) => setModal({ type: 'purchasedetails', data: { ...item } }),
    },

  ], []);

  return (
    <>
      <CreditsContainer>
        <MyCredits noChoose
          title={t("admin_dashboard_plans_title")}
          subtitle={t("admin_dashboard_plans_subtitle")}
          value={`${ user?.wallet?.credits || "0" } ${ t("admin_dashboard_credits_credit") }s`}
        />
        <CardsContainer>
          {
            plansItem?.map((item, index) => (
              <EscortPlansCard key={index} {...item} />
            ))
          }
        </CardsContainer>
      </CreditsContainer>
    </>
  );
}