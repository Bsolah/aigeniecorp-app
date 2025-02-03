// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import  { lazy } from 'react';
import { Navigate, createBrowserRouter } from "react-router";
import PrivateRoute from './PrivateRoute.tsx'; // Adjust the path as necessary
import PublicRoute from './PublicRoute.tsx'; // Adjust the path as necessary
import Loadable from '../layouts/full/shared/loadable/Loadable.tsx';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout.tsx')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout.tsx')));


// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login.tsx')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register.tsx')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword.tsx')));

const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps.tsx')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance.tsx')));


// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpages/LandingPages.tsx')));


const ChatPage = Loadable(lazy(() => import('../views/pages/chats/ChatPage.tsx')));
const RepositoryPage = Loadable(lazy(() => import('../views/pages/repository/RepositoryPage.tsx')));
const Error = Loadable(lazy(() => import('../views/authentication/Error.tsx')));

const Router = [
  {
    path: '/',
    element: <PrivateRoute children={<FullLayout />} />,
    children: [
      { path: '/chats/*', exact: true, element: <PrivateRoute children={<ChatPage />} /> },
      { path: '/repository/*', exact: true, element: <PrivateRoute children={<RepositoryPage />} /> },
      { path: '/agents', exact: true, element: <PrivateRoute children={<RepositoryPage />} /> },
      { path: '/projects', exact: true, element: <PrivateRoute children={<RepositoryPage />} /> },
      { path: '/analytics', exact: true, element: <PrivateRoute children={<RepositoryPage />} /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <PublicRoute children={<Login />} /> },
      { path: '/auth/register', element: <Register />},
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/maintenance', element: <Maintainance /> },
      { path: '/landingpage', element: <Landingpage /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
  ,
];

const router = createBrowserRouter(Router)

export default router;
