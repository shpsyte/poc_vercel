import HomePage from '@pages/home';
import AboutPage from '@pages/about';
import App from '../App';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        ...AboutPage,
        path: '/about',
        exact: true,
      },
      {
        ...AboutPage,
      },
    ],
  },
];
