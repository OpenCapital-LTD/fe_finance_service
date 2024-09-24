// import {useGiraf} from '../giraff'

import React, { useEffect, useState } from "react"
import { useGiraf } from "../giraff"
import { useRoutes } from "react-router-dom"
import MainRoutes from "./mainRoutes"
import AuthRoutes from "./authRoutes"
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode"
import { LoadingOutlined } from "@ant-design/icons"
import usePushMessage from "../hooks/pushmessage"
import useGetApi from "../hooks/getapi"

const ThemeRoutes = () => {
    const [logedIn, setLogedIn] = useState(false)
    const { gHead, addGHead } = useGiraf()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        addGHead("header", true)
        addGHead("toolbar", true)
        console.log('')
        const token = Cookies.get('auth_token')
        if (!token) return setLoading(false)
        addGHead('logedIn', true)
        addGHead('auth_token', token)
        addGHead('user', jwtDecode(token.split(" ")[1]))
        console.log(jwtDecode(token.split(" ")[1]))
        setLoading(false)
    }, [])


    if (loading) return (
        <div style={{
            fontSize: '30px',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <LoadingOutlined size={40} style={{
                fontSize: '35px',
            }} /></div>
    )
    return useRoutes([MainRoutes])
    // return useRoutes([gHead.logedIn ? MainRoutes : AuthRoutes])

}
export default ThemeRoutes