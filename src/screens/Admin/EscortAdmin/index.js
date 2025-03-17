import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CoreContext } from 'context/CoreContext';
import useI18n from 'hooks/useI18n';
import { 
  AdminContainer, 
  DashboardContainer,
  MainContent,
  StatsGrid,
  StatCard,
  CardTitle,
  CardValue,
  CardIcon,
  VisitsChart,
  ChartContainer,
  ChartTitle,
  AdSection,
  AdCard,
  AdInfo,
  AdActions,
  CreditsSection,
  CreditsCard,
  CreditsInfo,
  CreditsValue,
  CreditsActions,
  MobileAdminView
} from './styled';
import Button from 'components/Form/Button';
import { Icon } from 'ui/styled';
import { useMediaQuery } from 'react-responsive';
import ContainerAuthenticated from 'containers/Authenticated';

export default function EscortAdmin() {
  const { user, model } = useContext(CoreContext);
  const { t } = useI18n();
  const history = useHistory();
  const [activeAds, setActiveAds] = useState(1);
  const [favorites, setFavorites] = useState(120);
  const [adClicks, setAdClicks] = useState(146);
  const [credits, setCredits] = useState(7);
  const [visits, setVisits] = useState(1752);
  
  // Use media query to determine if we should show mobile or desktop version
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Sample data for the visits chart
  const chartData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [120, 80, 150, 90, 110, 180, 160, 140, 100, 130, 90, 110]
  };
  
  // Navigate to credits purchase page
  const handleBuyCredits = () => {
    history.push('/purchase-of-credits');
  };
  
  // Pause active ad
  const handlePauseAd = () => {
    // Implementation for pausing ad
    console.log('Pausing ad');
  };
  
  // Choose plan
  const handleChoosePlan = () => {
    history.push('/subscription-plans');
  };
  
  // Mobile version content
  const MobileContent = () => (
    <div>
      {/* Keep your existing mobile content here */}
      <h1>Mobile Dashboard</h1>
      {/* ... existing mobile content ... */}
    </div>
  );
  
  // Desktop version content
  const DesktopContent = () => (
    <AdminContainer>
      <DashboardContainer>
        <MainContent>
          {/* Stats Grid */}
          <StatsGrid>
            <StatCard>
              <CardIcon>
                <Icon icon="heart" size={24} color="#FF4D4F" />
              </CardIcon>
              <div>
                <CardTitle>{t('favorites')}</CardTitle>
                <CardValue>{favorites}</CardValue>
                <small>{t('users_following_you')}</small>
              </div>
            </StatCard>
            
            <StatCard>
              <CardIcon>
                <Icon icon="click" size={24} color="#FF4D4F" />
              </CardIcon>
              <div>
                <CardTitle>{t('ad_clicks')}</CardTitle>
                <CardValue>{adClicks}</CardValue>
                <small>{t('last_30_days')}</small>
              </div>
            </StatCard>
            
            <StatCard>
              <CardIcon>
                <Icon icon="credit" size={24} color="#FF4D4F" />
              </CardIcon>
              <div>
                <CardTitle>{t('your_credits')}</CardTitle>
                <CardValue>{credits} {t('credit')}</CardValue>
                <small>{t('no_credits_are_counting')}</small>
              </div>
            </StatCard>
          </StatsGrid>
          
          {/* Active Ad Section */}
          <AdSection>
            <AdCard>
              <AdInfo>
                <h3>{activeAds} {t('active_ad')}</h3>
                <p>{t('you_can_pause_this_ad')}</p>
              </AdInfo>
              <AdActions>
                <Button onClick={handlePauseAd} outlineGradient>
                  {t('pause_ad')}
                </Button>
              </AdActions>
            </AdCard>
          </AdSection>
          
          {/* Visits Chart */}
          <ChartContainer>
            <ChartTitle>
              <h3>{t('visits_to_your_profile')}</h3>
              <div className="time-filters">
                <span className="active">{t('everyone')}</span>
                <span>{t('12_months')}</span>
                <span>{t('6_months')}</span>
                <span>{t('30_days')}</span>
                <span>{t('7_days')}</span>
              </div>
              <div className="visits-count">{visits} {t('visits')}</div>
            </ChartTitle>
            
            <VisitsChart>
              {chartData.months.map((month, index) => (
                <div key={month} className="chart-column">
                  <div 
                    className={`chart-bar ${month === 'Jun' ? 'highlight' : ''}`}
                    style={{ height: `${chartData.values[index] / 2}px` }}
                  />
                  <div className="chart-label">{month}</div>
                </div>
              ))}
            </VisitsChart>
          </ChartContainer>
          
          {/* Additional Credits Section */}
          <CreditsSection>
            <h3>{t('additional_credits')}</h3>
            
            <CreditsCard>
              <CreditsInfo>
                <h3>{t('your_credits')}</h3>
                <CreditsValue>{credits} {t('credits')}</CreditsValue>
                <p>{t('you_have_enough_for')} {credits} {t('days')}</p>
              </CreditsInfo>
              <CreditsActions>
                <Button onClick={handleChoosePlan} outlineGradient>
                  {t('choose_plan')}
                </Button>
                <Button onClick={handleBuyCredits} gradient>
                  {t('buy_more_credits')}
                </Button>
              </CreditsActions>
            </CreditsCard>
          </CreditsSection>
        </MainContent>
      </DashboardContainer>
    </AdminContainer>
  );
  
  return (
    <ContainerAuthenticated admin title="Dashboard">
      {isMobile ? <MobileContent /> : <DesktopContent />}
    </ContainerAuthenticated>
  );
} 