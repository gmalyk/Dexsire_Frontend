import { HomeHeaderContainer } from 'components/Admin/Owner/Home/styled';
import DashboardCard from 'components/Cards/DashboardCard';
import useI18n from 'hooks/useI18n';
import React, { useMemo } from 'react'
import { parseStrapiImage } from 'utils';

export default function OwnerHeader({ noPayment, infos }) {

  const { t } = useI18n()

  const dashboardData = useMemo(() => {
    return [
      {
        title: t("admin_dashboardowner_item1_title"),
        subtitle: t("admin_dashboardowner_item1_subtitle"),
        images: (infos?.users||[])?.map(m => ({
          src: m?.image?.url ? parseStrapiImage(m?.image?.url) : null
        }))?.filter(f => f.src)?.slice(0,3),
        legend: `${ (infos?.users||[])?.length } ${ t("admin_dashboardowner_item1_legend") }`,
        secondary: true,
      },
      {
        title: t("admin_dashboardowner_item2_title"),
        subtitle: t("admin_dashboardowner_item2_subtitle"),
        images: (infos?.models||[])?.map(m => ({
          src: m?.user?.image?.url ? parseStrapiImage(m?.user?.image?.url) : null
        }))?.filter(f => f.src)?.slice(0,3),
        legend: `${ (infos?.models||[])?.length } ${ t("admin_dashboardowner_item2_legend") }`,
        secondary: true,
      },
      {
        title: t("admin_dashboardowner_item3_title"),
        subtitle: t("admin_dashboardowner_item3_subtitle"),
        value: `${ (infos?.visits||[])?.length }`,
        secondary: true,
      },
      noPayment ? null : {
        title: t("admin_dashboardowner_item4_title"),
        subtitle: t("admin_dashboardowner_item4_subtitle"),
        value: t("admin_dashboardowner_item4_value"),
        secondary: true,
      },
    ].filter(f => f);
  }, [ infos ]);

  return (
    <>
      <HomeHeaderContainer >
        {dashboardData?.map((item, index) => (
          <DashboardCard
            three={noPayment}
            key={index}
            {...item}
          />
        ))}
      </HomeHeaderContainer>
    </>
  )
}
