import { IndexPage } from '../pages/Index'
import { AboutPage } from '../pages/About'
import { FindLawyerPage } from '../pages/FindLawyer'
import { RightLawPage } from '../pages/RightLaw'
import { FaqPage } from '../pages/Faq'
import { ContactPage } from '../pages/Contact'
import { HowItWorksPage } from '../pages/HowItWorks'
import { CheckoutPage } from '../pages/Checkout'
import { SignUpPage } from '../pages/SignUp'
import { ForgotPasswordPage } from '../pages/ForgotPassword'
import { ResetPasswordPage } from '../pages/ResetPassword'
import { LoginPage } from '../pages/Login'
import { DashboardPage } from '../pages/Dashboard'
import { CalendarPage } from '../pages/Calendar'
import { ProfilePage } from '../pages/Profile'
import { HelpCenterPage } from '../pages/HelpCenter'
import { AvailabilityPage } from '../pages/Availability'
import { PriceSettingsPage } from '../pages/PriceSettings'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicy'
import { TermsConditionsPage } from '../pages/TermsConditions'
import { PurchasePage } from '../pages/Purchase'
import { TodoPage } from '../pages/Todo'
import { AccountingPage } from '../pages/Accounting'
import { ProfessionalListPage } from '../pages/ProfessionalList'
import { OverlayProfessional } from '../pages/OverlayProfessional'
import Error500 from '../components/Errors/Error500'
import Error404 from '../components/Errors/Error404'
import Confirmation from '../containers/Confirmation'
import PasswordResetPage from '../containers/PasswordReset'
import GeneratePdf from '../containers/GeneratePdf'

import { IRouteProps } from './router.types'

const routesMap: Array<IRouteProps> = [
  {
    path: '/',
    key: 'INDEX_PAGE',
    exact: true,
    component: IndexPage,
    meta: {},
  },
  {
    path: '/generate-pdf',
    key: 'GENERATEPDF',
    exact: false,
    component: GeneratePdf,
    meta: {},
  },
  {
    path: '/about-us',
    key: 'ABOUT_PAGE',
    exact: true,
    component: AboutPage,
    meta: {},
  },
  {
    path: '/find-lawyer',
    key: 'FINDLAWYER_PAGE',
    exact: true,
    component: FindLawyerPage,
    meta: {},
  },
  {
    path: '/right-law',
    key: 'RIGHTLAW_PAGE',
    exact: true,
    component: RightLawPage,
    meta: {},
  },
  {
    path: '/faq',
    key: 'FAQ_PAGE',
    exact: true,
    component: FaqPage,
    meta: {},
  },
  {
    path: '/how-it-works',
    key: 'HIW_PAGE',
    exact: true,
    component: HowItWorksPage,
    meta: {},
  },
  {
    path: '/contact',
    key: 'CONTACT_PAGE',
    exact: true,
    component: ContactPage,
    meta: {},
  },
  {
    path: '/checkout',
    key: 'CHECKOUT_PAGE',
    exact: true,
    component: CheckoutPage,
    meta: {},
  },
  {
    path: '/signup',
    key: 'SIGNUP',
    exact: true,
    component: SignUpPage,
    meta: {},
  },
  {
    path: '/forgot-password',
    key: 'FORGOT_PASSWORD',
    exact: true,
    component: ForgotPasswordPage,
    meta: {},
  },
  {
    path: '/reset-password',
    key: 'RESET_PASSWORD',
    exact: true,
    component: ResetPasswordPage,
    meta: {},
  },
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    component: LoginPage,
    meta: {
      isPrivate: false,
    },
  },
  {
    path: '/availability',
    key: 'AVAILABILITY',
    exact: true,
    component: AvailabilityPage,
    meta: {
      isPrivate: true,
      permissions: ['profAvailability'],
    },
  },
  {
    path: '/purchase',
    key: 'PURCHASE',
    exact: true,
    component: PurchasePage,
    meta: {
      isPrivate: true,
      permissions: ['userPurchases'],
    },
  },
  {
    path: '/sign-as-professional',
    key: 'SIGN_AS_PRO',
    exact: true,
    component: OverlayProfessional,
    meta: {
      isPrivate: true,
      permissions: ['userUpgrade'],
      roles: ['user-only'],
    },
  },
  {
    path: '/accounting',
    key: 'ACCOUNTING',
    exact: true,
    component: AccountingPage,
    meta: {
      isPrivate: true,
      permissions: ['firmAccounting'],
    },
  },
  {
    path: '/professional-list',
    key: 'PROFESSIONAL_LIST',
    exact: true,
    component: ProfessionalListPage,
    meta: {
      isPrivate: true,
      permissions: ['firmProfessionals'],
    },
  },
  {
    path: '/dashboard',
    key: 'DASHBOARD',
    exact: true,
    component: DashboardPage,
    meta: {
      isPrivate: true,
      permissions: ['firmDashboard', 'profDashboard'],
    },
  },
  {
    path: '/calendar',
    key: 'CALENDAR',
    exact: true,
    component: CalendarPage,
    meta: {
      isPrivate: true,
      permissions: ['firmCalendar', 'profCalendar'],
    },
  },
  {
    path: '/profile',
    key: 'PROFILE',
    exact: true,
    component: ProfilePage,
    meta: {
      isPrivate: true,
      permissions: ['firmProfile', 'profProfile', 'userProfile'],
    },
  },
  {
    path: '/help-center',
    key: 'HELP_CENTER',
    exact: true,
    component: HelpCenterPage,
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/price-settings',
    key: 'PRICE_SETTINGS',
    exact: true,
    component: PriceSettingsPage,
    meta: {
      isPrivate: true,
      permissions: ['firmPriceSettings', 'profPriceSettings'],
    },
  },
  {
    path: '/todo-list',
    key: 'TODO_LIST',
    exact: true,
    component: TodoPage,
    meta: {
      isPrivate: true,
      permissions: ['firmToDoList', 'profToDoList'],
    },
  },
  {
    path: '/privacy-policy',
    key: 'PRIVACY',
    exact: true,
    component: PrivacyPolicyPage,
    meta: {
      isPrivate: false,
    },
  },
  {
    path: '/terms-conditions',
    key: 'TERMS_CONDITIONS',
    exact: true,
    component: TermsConditionsPage,
    meta: {
      isPrivate: false,
    },
  },
  {
    path: '/password-reset',
    key: 'PASSWORD_RESET',
    exact: true,
    component: PasswordResetPage,
  },
  {
    path: '/confirmation',
    key: 'CONFIRMATION',
    exact: true,
    component: Confirmation,
  },
  {
    path: '/500-error',
    key: '500_ERROR',
    exact: true,
    component: Error500,
  },
  {
    path: '/404-error',
    key: '404_ERROR',
    exact: true,
    component: Error404,
  },
]

export default routesMap
