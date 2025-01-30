import React, { useContext, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landpage from 'screens/Landpage'
import NotFound from 'screens/NotFound'

import Login from 'screens/Authentication/Login'
import Forgot from 'screens/Authentication/Forgot'
import CreatePassword from 'screens/Authentication/CreatePassword'

import DashboardHome from 'screens/Dashboard/Home'

import { CoreContext } from "context/CoreContext";

import RegisterCustomer from "screens/Authentication/Register/RegisterCustomer";
import RegisterEscort from "screens/Authentication/Register/RegisterEscort";
import EscortProfile from "screens/Profile/EscortProfile";


import PurchaseCredits from "screens/PurchaseCredits";
import Announcement from "screens/Announcement";
import Contact from "screens/Contact";
import Faq from "screens/Faq";
import CustomerProfile from "screens/Profile/CustomerProfile";
import ModalCore from "components/Modal/Core";
import PreLogin from "screens/Authentication/PreLogin";
import EscortAdminHome from "screens/Admin/Escort/Home";
import EscortAdminAboutMe from "screens/Admin/Escort/AboutMe";
import EscortAdminDeleteAccount from "screens/Admin/Escort/DeleteAccount";
import EscortAdminSupport from "screens/Admin/Escort/Support";
import EscortAdminStatistics from "screens/Admin/Escort/Statistics";
import EscortAdminPlans from "screens/Admin/Escort/Plans";
import EscortAdminAdditionalCredits from "screens/Admin/Escort/AdditionalCredits";
import EscortAdminAdverts from "screens/Admin/Escort/Adverts";
import EscortAdminServices from "screens/Admin/Escort/Services";
import EscortAdminVideos from "screens/Admin/Escort/Videos";
import EscortAdminRatings from "screens/Admin/Escort/Ratings";
import OwnerAdminUsers from "screens/Admin/Owner/Users";
import OwnerAdminUsersDetails from "screens/Admin/Owner/UsersDetails";
import OwnerAdminReports from "screens/Admin/Owner/Reports";
import OwnerAdminEscorts from "screens/Admin/Owner/Escorts";
import OwnerAdminEscortsDetails from "screens/Admin/Owner/EscortsDetails";
import OwnerAdminHome from "screens/Admin/Owner/Home";
import EscortAdminPhotos from "screens/Admin/Escort/Photos";
import CGUPage from 'screens/CGU';
import ProviderAgreementPage from 'screens/ProviderAgreement';
import LegalNoticePage from 'screens/LegalNotice';
import HumanTraffickingReportPage from 'screens/HumanTraffickingReport';

export default function AppRouter() {
  
  const { setModal } = useContext(CoreContext);

  useEffect(() => {
    const modalShown = sessionStorage.getItem("ageverification");

    if (!modalShown) {
      setModal({ type: 'ageverification' });
      sessionStorage.setItem("ageverification", "true");
    }
  }, [setModal]);

  

  return (
    <Router>
      <div>
        <ModalCore />
        <Switch>
          <Route path="/" exact> <DashboardHome /> </Route>

          <Route path="/pre-login" exact> <PreLogin/> </Route>
          <Route path="/login" exact> <Login /> </Route>
          <Route path="/register/customer" exact> <RegisterCustomer /> </Route>
          <Route path="/register/escort" exact> <RegisterEscort /> </Route>

          <Route path="/forgot" exact> <Forgot /> </Route>
          <Route path="/create-password" exact> <CreatePassword /> </Route>

          <Route path="/purchase-of-credits" exact> <PurchaseCredits /> </Route>

          <Route path="/dashboard" exact> <DashboardHome /> </Route>

          <Route path="/profile/customer" exact> <CustomerProfile /> </Route>
          <Route path="/profile/escort" exact> <EscortProfile /> </Route>
          <Route path="/profile/escort/:id" exact> <EscortProfile /> </Route>

          <Route path="/admin/escort" exact> <EscortAdminHome /> </Route>
          <Route path="/admin/escort/about-me" exact> <EscortAdminAboutMe /> </Route>
          <Route path="/admin/escort/photos" exact> <EscortAdminPhotos /> </Route>
          <Route path="/admin/escort/videos" exact> <EscortAdminVideos /> </Route>
          <Route path="/admin/escort/ratings" exact> <EscortAdminRatings /> </Route>
          <Route path="/admin/escort/services" exact> <EscortAdminServices /> </Route>
          <Route path="/admin/escort/adverts" exact> <EscortAdminAdverts /> </Route>
          <Route path="/admin/escort/additional-credits" exact> <EscortAdminAdditionalCredits /> </Route>
          <Route path="/admin/escort/plans" exact> <EscortAdminPlans /> </Route>
          <Route path="/admin/escort/statistics" exact> <EscortAdminStatistics /> </Route>
          <Route path="/admin/escort/support" exact> <EscortAdminSupport /> </Route>
          <Route path="/admin/escort/delete-account" exact> <EscortAdminDeleteAccount /> </Route>

          <Route path="/admin/owner" exact> <OwnerAdminHome /> </Route>
          <Route path="/admin/owner/users" exact> <OwnerAdminUsers /> </Route>
          <Route path="/admin/owner/users/:id" exact> <OwnerAdminUsersDetails /> </Route>
          <Route path="/admin/owner/escorts" exact> <OwnerAdminEscorts /> </Route>
          <Route path="/admin/owner/escorts/:id" exact> <OwnerAdminEscortsDetails /> </Route>
          <Route path="/admin/owner/reports" exact> <OwnerAdminReports /> </Route>

          <Route path="/announcement" exact> <Announcement /> </Route>

          <Route path="/contact" exact> <Contact /> </Route>

          <Route path="/faq" exact> <Faq /> </Route>

          <Route path="/cgu" exact>
            <CGUPage />
          </Route>
          <Route path="/provider-agreement" exact>
            <ProviderAgreementPage />
          </Route>
          <Route path="/legal-notice" exact>
            <LegalNoticePage />
          </Route>

          <Route path="/human-trafficking-report" exact>
            <HumanTraffickingReportPage />
          </Route>

          <Route path="*" exact> <NotFound /> </Route>
        </Switch>
      </div>
    </Router>
  );
}