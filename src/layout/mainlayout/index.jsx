import React from 'react'
import { Box, Breadcrumbs, Toolbar } from "@mui/material"
import Header from "./header"
import MainDrawer from "./drawer"
import navigation from '../../menu-items'
import { Outlet } from "react-router-dom"
import './../../assets/styles/global.scss'
import { useGiraf } from "../../giraff"
import CustomizeDrawer from "./customise"
import { useEffect, useState } from "react"
import useGetApi from "../../hooks/getapi"
import usePushMessage from "../../hooks/pushmessage"
import MessageBox from "../../components/message"
import Loading from "../../components/loading"
import appConfig from "../../config"
const MainLayout = () => {

    const { gHead, addGHead } = useGiraf()
    const [loading, setLoading] = useState(true)
    
    const { actionRequest } = useGetApi()
    const { messageType, response, pushMessage } = usePushMessage()
   
    useEffect(() => {
        setLoading(true)
        actionRequest({ endPoint: `${appConfig.api.AUTH_URL}accounts/countries` }).then((res) => {
            addGHead('countries', res.data)
        }).catch((err) => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
        actionRequest({ endPoint: `${appConfig.api.BASE_URL}settings/categories` }).then((res) => {
            addGHead('categories', res.data)

        }).catch((err) => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
        actionRequest({ endPoint: `${appConfig.api.BASE_URL}settings/projects` }).then((res) => {
            addGHead('projects', res.data)

        }).catch((err) => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })

        actionRequest({ endPoint: `${appConfig.api.BASE_URL}expense/user` }).then((res) => {
            addGHead('user_expenses', res.data)

        }).catch((err) => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })


        actionRequest({ endPoint: `${appConfig.api.BASE_URL}tasks/user` }).then((res) => {
            addGHead('user_tasks', res.data)

        }).catch((err) => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })

        return addGHead('expense_ref', false)
    }, [gHead.expense_ref])

    
    return (
        <div className="app_container">
            {response && <MessageBox type={messageType} txt={response} />}
            {loading && <Loading />}
            
            <MainDrawer />
            <div className="right_pane">
            {gHead.sett === true && <CustomizeDrawer/>}
            {gHead.header == true?<Header />:<></>}
            <Box component="main" className="main">
                {/* {gHead.toolbar && <Toolbar />} */}
                {/* one */}
                <Breadcrumbs navigation={navigation} title />
                <Outlet />

            </Box>
            </div>
        </div>
    )
}

export default MainLayout