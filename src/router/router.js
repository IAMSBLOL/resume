
import * as React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import {
  APP_HOME, APP_TEST, APP_HOME_ONE, APP_HOME_TWO
} from './pathNames'

function SuspenseFn (Comp) {
  return (
    <React.Suspense>
      <Comp />
    </React.Suspense>
  )
}

const App = React.lazy(() => import('@src/views/container/app'));
const Test = React.lazy(() => import('@src/views/test'));
const Home = React.lazy(() => import('@src/views/home'));
const HomeN = React.lazy(() => import('@src/views/home/one'));
const HomeT = React.lazy(() => import('@src/views/home/two'));

const routes = [
  {
    path: '/',
    element: <Navigate to={APP_HOME} replace />
  },
  {
    // path: '/app',
    // exact: true,
    strict: true,
    element: SuspenseFn(App),
    children: [
      {
        path: APP_TEST,
        element: SuspenseFn(Test),

      },
      {
        path: APP_HOME,
        element: SuspenseFn(Home),
        children: [
          {
            path: APP_HOME_ONE,
            element: SuspenseFn(HomeN),
          },
          {
            path: APP_HOME_TWO,
            element: SuspenseFn(HomeT),
          },
        ]
      },
    ]
  }
]

function Routes () {
  const element = useRoutes(routes);

  // The returned element will render the entire element
  // hierarchy with all the appropriate context it needs

  return element
};

export default Routes;
