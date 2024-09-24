import React from 'react'
import { element } from "prop-types";
import MainLayout from "../layout/mainlayout";
import Login from "../pages/authentication/login";
import MinimalLayout from "../layout/minimalLayout";

const AuthRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <Login />
        }
        ,{
            path:'*',
            element:<Login/>
          }
    ]
}

export default AuthRoutes