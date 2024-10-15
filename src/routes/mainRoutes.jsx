
import React, { lazy } from 'react';
import MainLayout from '../layout/mainlayout'
import DashboardDefault from '../pages/dashboard';
import Expense from '../pages/expenses';
import Reciepts from '../pages/reciepts';
import Settings from '../pages/settings';
import Groups from '../pages/settings/groups';
import Roles from '../pages/settings/roles';
import BulkUploads from '../pages/expenses/bulkuploads';
import Categories from '../pages/settings/categories';
import ExpenseRules from '../pages/settings/expense';

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
          path: '/settings',
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
        },
        {
          path: '/settings/blank',
          element: <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
              width:'75%',
            height:'100%',
          }}>
            <div style={{
              background:'white',
              minHeight:'80%',
              minWidth:'80%',
              borderRadius:'5px'
            }}></div>
          </div>
        }
      ]
    },
    {
      path: '*',
      element: <DashboardDefault />
    }

  ]
}

export default MainRoutes