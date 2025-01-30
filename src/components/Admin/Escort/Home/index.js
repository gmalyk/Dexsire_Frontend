import DashboardCard from 'components/Cards/DashboardCard';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';
import { HomeBodyContainer, HomeHeaderContainer, ReviewContainer } from './styled';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Announcement from 'components/Announcement';
import RenderBarChart from 'components/BarChart';
import BarChartWrapper from 'components/BarChartWrapper';
import Accordion from 'components/Accordion';
import MyCredits from 'components/MyCredits';
import { Container } from 'reactstrap';
import { FormTitle } from 'ui/styled';
import Button from 'components/Form/Button';
import CustomerReviewCard from 'components/Cards/CustomerReview';
import { reviewsArray } from 'utils/options';
import CustomerReview from 'components/CustomerReview';

import { CoreContext } from 'context/CoreContext';
import { Read, ReadOne } from 'services/core';
import { capitalize, exposeStrapiError, normalizeStrapiList, normalizeStrapiRegister } from 'utils';
import useI18n from 'hooks/useI18n';



export default function AdminHome() {
  const [activeReviewOption, setReviewOption] = useState(null);
  const [activeOption, setActiveOption] = useState(null);

  const { user, currentProfile, setCurrentProfile} = useContext(CoreContext)

  const { t } = useI18n()

  const [visits, setVisits] = useState([])

  const handleOptionClick = (value) => {
    setActiveOption(value);
  };

  const dashboardData = useMemo(() => {
    // console.log("currentProfile", currentProfile)
    return [
      {
        icon: 'heart',
        title: t("admin_dashboard_title1"),
        subtitle: t("admin_dashboard_subtitle1"),
        value: currentProfile?.likes?.length || "0",
      },
      {
        icon: 'megaphone',
        title: t("admin_dashboard_title2"),
        subtitle: t("admin_dashboard_subtitle2"),
        value: visits?.length || '0',
      },
      {
        icon: 'coins',
        title: t("admin_dashboard_title3"),
        subtitle: t("admin_dashboard_subtitle3"),
        value: `${ user?.wallet?.credits || "0" } ${ t("admin_dashboard_credit") }`,
      },
      {
        icon: 'diamond',
        title: t("admin_dashboard_title4"),
        subtitle: t("admin_dashboard_subtitle4"),
        // buttonText: 'Make new subscription',
        white: true,
      },
    ];
  }, [currentProfile, visits]);

  const announcementData = useMemo(() => {
    return {
      announcementTitle: t("admin_dashboard_announcement"),
      activeAdCount: 1,
      // description: "You can pause this ad and stop the credits from counting.",
      // buttonLabel: "Pause ad",
      // action: () => console.log("Ad paused"),
    };
  }, []);

  const data = useMemo(() => {

    const getMonthlyCounts = (data) => {
        const currentYear = new Date().getFullYear();
        const monthlyCounts = Array(12).fill(0); // Initialize counts for each month
    
        data.forEach(item => {
            const createdAt = new Date(item.createdAt);
            if (createdAt.getFullYear() === currentYear) {
                const month = createdAt.getMonth(); // 0 for January, 11 for December
                monthlyCounts[month]++;
            }
        });
    
        const result = monthlyCounts.map((value, index) => ({
            name: capitalize(new Date(0, index).toLocaleString('default', { month: 'short' })),
            value
        }));
    
        return result;
    }
    
    const transformedData = getMonthlyCounts(visits)
    return transformedData; 
  }, [visits])

  const options = []
  
  // const options = [
  //   { value: 'Everytime' },
  //   { value: '12 months' },
  //   { value: '6 months' },
  //   { value: '30 days' },
  //   { value: '7 days' },
  // ];

  const reviewOptions = [
    { value: '2 months' },
    { value: '30 days' },
    { value: '7 days' },
  ];

  const init = async () => {
    if(currentProfile?.id){
      const result = await Read(`actions?filters[model]=${currentProfile?.id}`)
      const normalResult = normalizeStrapiList(result)
      setVisits(normalResult)
    }
  }

  useEffect(() => { init() ;}, [currentProfile])

  return (
    <>
      <HomeBodyContainer>
        <HomeHeaderContainer>
          {dashboardData?.map((item, index) => (
            <DashboardCard key={index} {...item} />
          ))}
        </HomeHeaderContainer>

        <Announcement {...announcementData} />

        <BarChartWrapper
          title={ t("admin_dashboard_visit") }
          options={options}
          value={`${ visits?.length } ${ t("admin_dashboard_visits") }`}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        >
          <RenderBarChart data={data} height={273} />
        </BarChartWrapper>

        {/* <Accordion title="Additional credits">
          <MyCredits title={'Your credits'} subtitle={'You have enough credits to choose 1 plan.'} value={'7 credits'} />
        </Accordion>
        <Accordion title="Active plan">
          <Container className='no-padding'>
            <FormTitle white left>
              There are currently no active plans.
            </FormTitle>
            <Button small width={'fit-content'} rightIcon="chevron-right" outlineGradient onClick={() => null}>Choose plan</Button>
          </Container>
        </Accordion> */}

        {/* <Accordion title="Latest reviews" noBorder noPadding>
          <BarChartWrapper noBorder noPadding title={'Select the period'} options={reviewOptions} onOptionClick={setReviewOption} activeOption={activeReviewOption}>
            <CustomerReview noTitle small onTrash={() => null} />
          </BarChartWrapper>
        </Accordion> */}
      </HomeBodyContainer>
    </>
  )
}
