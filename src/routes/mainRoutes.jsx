
import React, { lazy } from 'react';
import MainLayout from '../layout/mainlayout'
import Loadable from './../components/loadable'
import { element } from 'prop-types';
import Menu from '../pages/menu_w';
import DashboardDefault from '../pages/dashboard';
import Expense from '../pages/expenses';
import Reciepts from '../pages/reciepts';
import Settings from '../pages/settings';
import Groups from '../pages/settings/groups';
import Office from '../pages/settings/offices';
import Roles from '../pages/settings/roles';
import BulkUploads from '../pages/expenses/bulkuploads';
import Categories from '../pages/settings/categories';
import ExpenseRules from '../pages/settings/expense';
// const DashboardDefault = Loadable(lazy(() => import('./../pages/dashboard')));
// const Menu = Loadable(lazy(()=>import('./../pages/menu_w')))

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/expense',
      element: <Expense />
    },
    
    {
      path: '/bulk',
      element: <BulkUploads />
    },

    {
      path: '/reciepts',
      element: <Reciepts />
    },

    {
      path: '/settings',
      // element: <Settings />,
      children: [
        {
          path: '/settings/users',
          element: <Settings />,

        }, {
          path: '/settings/office',
          element: <Groups />,

        }, {
          path: '/settings/roles',
          element: <Roles />,
        }, {
          path: '/settings/category',
          element: <Categories />,
        }, {
          path: '/settings/expense_rules',
          element: <ExpenseRules />,
        }
      ]
    },
    {
      path:'*',
      element:<DashboardDefault/>
    }

  ]
}

export default MainRoutes