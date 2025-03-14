import CreditsCard from 'components/Cards/Credits';
import PaymentCard from 'components/Cards/PaymentCard';
import MyCredits from 'components/MyCredits';
import React, { useContext, useMemo } from 'react';
import Button from 'components/Form/Button';
import { CardsContainer, CreditsContainer } from './styled';
import { CoreContext } from 'context/CoreContext';
import { CHECKOUT_ENDPOINT } from 'services/api';
import useI18n from 'hooks/useI18n';

export default function AdditionalCredits() {

  const { user } = useContext(CoreContext)

  const { t } = useI18n()

  const creditDays = [
    { title: '1 day', value: `1 ${ t("admin_dashboard_credits_credit") }` },
    { title: '7 days', value: `7 ${ t("admin_dashboard_credits_credit") }s` },
    { title: '30 days', value: `30 ${ t("admin_dashboard_credits_credit") }s` },
  ];

  const creditInfo = [
    { title: `5 ${ t("admin_dashboard_credits_credit") }s`, value:  `89,90 ${ t("admin_dashboard_credits_franc") }s`, action: () => window.open(`${ CHECKOUT_ENDPOINT }/buy?amount=89,90`, "new") },
    { title: `15 ${ t("admin_dashboard_credits_credit") }s`, value: `199,90 ${ t("admin_dashboard_credits_franc") }s`, action: () => window.open(`${ CHECKOUT_ENDPOINT }/buy?amount=199,90`, "new") },
    { title: `30 ${ t("admin_dashboard_credits_credit") }s`, value: `399,90 ${ t("admin_dashboard_credits_franc") }s`, action: () => window.open(`${ CHECKOUT_ENDPOINT }/buy?amount=399,90`, "new") },
  ];

  const creditItems = useMemo(() => [
    /* {
      title: t("admin_dashboard_credits_item1_title"),
      subtitle: t("admin_dashboard_credits_item1_subtitle"),
      type: 'button',
      buttonText: t("admin_dashboard_credits_item1_button"),
      infoFooter: t("admin_dashboard_credits_item1_footer"),
    }, */
    {
      title: t("admin_dashboard_credits_item3_title"),
      subtitle: t("admin_dashboard_credits_item3_subtitle"),
      type: 'purchase',
      options: creditInfo,
      light: true,
    },
    {
      title: t("admin_dashboard_credits_item2_title"),
      subtitle: t("admin_dashboard_credits_item2_subtitle"),
      type: 'list',
      list: creditDays,
      infoFooter: t("admin_dashboard_credits_item2_footer"),
    },
  ], []);

  return (
    <>
      <CreditsContainer>
        <MyCredits noChoose
          title={t("admin_dashboard_credits_title")} subtitle={t("admin_dashboard_credits_subtitle")} value={`${ user?.wallet?.credits || "0" } ${ t("admin_dashboard_credits_credit") }s`} noButton
        />
        <CardsContainer>
          {creditItems.map((item, index) => (
            <CreditsCard key={index} {...item} />
          ))}
        </CardsContainer>
        <PaymentCard action={() => window.open(CHECKOUT_ENDPOINT, "new")} />
      </CreditsContainer>
    </>
  );
}