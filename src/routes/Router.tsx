// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable.tsx';
import PrivateRoute from './PrivateRoute.tsx'; // Adjust the path as necessary
import PublicRoute from './PublicRoute.tsx'; // Adjust the path as necessary

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout.tsx')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout.tsx')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login.tsx')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register.tsx')));
const ForgotPassword = Loadable(
  lazy(() => import('../views/authentication/auth1/ForgotPassword.tsx')),
);

const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps.tsx')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance.tsx')));

// landingPage
const LandingPage = Loadable(lazy(() => import('../views/pages/landingpage/index.tsx')));

const ChatPage = Loadable(lazy(() => import('../views/pages/chats/ChatPage.tsx')));
const RepositoryPage = Loadable(lazy(() => import('../views/pages/repository/RepositoryPage.tsx')));
const NewRepositoryPage = Loadable(lazy(() => import('../components/apps/repository/CreateContent.tsx')));
const ViewRepositoryPage = Loadable(lazy(() => import('../components/apps/repository/ViewContent.tsx')));
const ViewGDrivePage = Loadable(lazy(() => import('../components/apps/repository/ViewGoogleDrive')));
const ViewSharepointPage = Loadable(lazy(() => import('../components/apps/repository/ViewSharepoint')));
const ViewNotionPage = Loadable(lazy(() => import('../components/apps/repository/ViewNotion')));
const ViewDrafts = Loadable(lazy(() => import('../components/apps/repository/ViewDraftList')));
const Error = Loadable(lazy(() => import('../views/authentication/Error.tsx')));
const PrivacyPolicy = Loadable(lazy(() => import('../views/pages/landingpage/layout/PrivacyPolicy.tsx')));

const Router = [
  { path: '/', element: <LandingPage /> },
  { path: '/privacy-policy', element: <PrivacyPolicy /> },
  {
    path: '/:id',
    element: <PrivateRoute children={<FullLayout />} />,
    children: [
      { path: '/:id/chats/*', exact: true, element: <PrivateRoute children={<ChatPage />} /> },
      {
        path: '/:id/repository/*',
        exact: true,
        element: <PrivateRoute children={<RepositoryPage />} />,
      },
      { path: '/:id/repository/new-page', exact: true, element: <PrivateRoute children={<NewRepositoryPage />} /> },
      { path: '/:id/repository/:id', exact: true, element: <PrivateRoute children={<ViewRepositoryPage />} /> },
      { path: '/:id/repository/google-drive', exact: true, element: <PrivateRoute children={<ViewGDrivePage />} /> },
      { path: '/:id/repository/sharepoint', exact: true, element: <PrivateRoute children={<ViewSharepointPage />} /> },
      { path: '/:id/repository/notion', exact: true, element: <PrivateRoute children={<ViewNotionPage />} /> },
      { path: '/:id/repository/drafts', exact: true, element: <PrivateRoute children={<ViewDrafts />} /> },
      { path: '/:id/agents', exact: true, element: <PrivateRoute children={<RepositoryPage />} /> },
      { path: '/:id/projects', exact: true, element: <PrivateRoute children={<RepositoryPage />} /> },
      { path: '/:id/analytics', exact: true, element: <PrivateRoute children={<RepositoryPage />} /> },
      { path: '/:id/*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <PublicRoute children={<Login />} /> },
      { path: '/auth/register', element: <PublicRoute children={<Register />} /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/maintenance', element: <Maintainance /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
];

const router = createBrowserRouter(Router);

export default router;
