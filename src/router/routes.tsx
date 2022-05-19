import { Navigate, RouteObject } from 'react-router-dom';
import About from '../pages/About';
import AuctionGallery from '../pages/AuctionGallery';
import Catalog from '../pages/Catalog';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProfileWallet from '../pages/ProfileWallet';
import ResetPassword from '../pages/ResetPassword';
import SignUp from '../pages/SignUp';
import Verify from '../pages/Verify';

export type RouteProps = Omit<RouteObject, 'element'> & {
  authorized?: boolean;
  onlyPublic?: boolean;
  element?: React.FC | React.ReactNode;
};

export type ExtendedRoute = RouteProps & {
  routes: Array<ExtendedRoute>;
};

export const routes = [
  {
    path: 'home',
    element: Home,
    authorized: true,
  },
  {
    path: 'login',
    element: Login,
    onlyPublic: true,
  },
  {
    path: 'sign-up',
    element: SignUp,
    onlyPublic: true,
  },
  {
    path: 'reset-password',
    element: ResetPassword,
  },
  {
    path: 'verify',
    element: Verify,
  },
  {
    path: 'profile-wallet',
    element: ProfileWallet,
    authorized: true,
  },

  {
    path: 'about',
    element: About,
  },
  {
    path: 'auctions-gallery',
    element: AuctionGallery,
    authorized: true,
  },
  {
    path: 'auctions',
    authorized: true,
    element: () => 'auctions',
  },
  {
    path: 'catalog',
    element: Catalog,
  },
  {
    index: true,
    element: <Navigate to="home" replace />,
  },
  {
    path: '*',
    element: () => 'not found page',
  },
] as Array<ExtendedRoute>;

export default routes;
