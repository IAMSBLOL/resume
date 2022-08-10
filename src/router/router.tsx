
import { lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import {
  APP_TEST, APP_Resume
} from './pathNames'

import { SuspenseFn } from './utils'

const App = lazy(() => import('@src/views/container/app'));
const Test = lazy(() => import('@src/views/test'));
const NotFound = lazy(() => import('@src/views/NotFound'));
const Resume = lazy(() => import('@src/views/Resume'));

const routes = [
  {
    path: '/',
    element: <Navigate to={APP_Resume} replace />
  },
  {
    // path: '/app',
    // exact: true,
    // strict: true,
    element: SuspenseFn(App),
    children: [
      {
        path: APP_TEST,
        element: SuspenseFn(Test),

      },
      {
        path: APP_Resume,
        element: SuspenseFn(Resume),

      },
      {
        path: '*',
        element: SuspenseFn(NotFound),
      },
      // {
      //   path: APP_HOME,
      //   element: SuspenseFn(Home),
      //   children: [
      //     {
      //       path: APP_HOME_ONE,
      //       element: SuspenseFn(HomeN),
      //     },
      //     {
      //       path: APP_HOME_TWO,
      //       element: SuspenseFn(HomeT),
      //     },
      //   ]
      // },
    ]
  },
  {
    path: '*',
    element: SuspenseFn(NotFound),

  },
]

function Routes () {
  const element = useRoutes(routes);

  // The returned element will render the entire element
  // hierarchy with all the appropriate context it needs

  return element
}

export default Routes;
