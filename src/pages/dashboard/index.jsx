import { LoadingOutlined, MenuOutlined } from "@ant-design/icons"
import './../../assets/styles/dashboard.scss'
import oca from './../../assets/images/oca_logo.svg'
import expense_ava from './../../assets/images/fin_avatar.png'
import spending_ava from './../../assets/images/Wallet-pana.png'
import { RiMoneyDollarBoxFill } from "react-icons/ri"
import { FaMoneyBills } from "react-icons/fa6"
import { LuListTodo } from "react-icons/lu"
import Filler from "../filler"
import { useGiraf } from "../../giraff"
import { useEffect, useState } from "react"
import useGetApi from "../../hooks/getapi"
import appConfig from "../../config"
import MessageBox from "../../components/message"
import Loading from "../../components/loading"
import usePushMessage from "../../hooks/pushmessage"
import { Tooltip } from "@mui/material"
import { shortenWord } from "../../BFF/utils"
import { Gauge } from "@mui/x-charts"
import CGuage from "../../components/guage"
import { AddOutlined, DeleteOutline } from "@mui/icons-material"
import { TiBackspace, TiTick, TiTickOutline } from "react-icons/ti"
import usePostApi from "../../hooks/postapi"
import Tasks from "./tasks"
const DashboardDefault = () => {
    const { gHead, addGHead } = useGiraf()
    const [loading, setLoading] = useState(false)
    const { actionRequest } = useGetApi()
    const { actionRequest: actionPostRequest } = usePostApi()
    const { messageType, response, pushMessage } = usePushMessage()
    const [loadingItem, setLoadingItem] = useState('')
    const [task_menu_id, setTaskMenuId] = useState('')
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })


    useEffect(() => {
        addGHead('toolbar', true)
        addGHead("header", true)
    }, [])

    useEffect(() => {
        if (gHead.expense == true) pushMessage('record expensed successfully', 'success')
        return addGHead('expense', false)
    }, [gHead.expense])

    const deleteTask = (id) => {
        setLoadingItem(id)
        setLoading(true)

        actionPostRequest({
            endPoint: `${appConfig.api.BASE_URL}tasks/delete`, params: {
                id
            }
        }).then((res) => {
            pushMessage(res.message, 'success')
            addGHead('expense_ref', true)
        }).catch((err) => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
            setLoadingItem(t => '')
        })

    }
    const handleContextMenu = (e, id) => {
        e.preventDefault()
        setTaskMenuId(id)
        setMenuPosition({
            x: e.clientX,
            y: e.clientY
        })
    }
    useEffect(() => {
        addGHead("header", true)

    }, [])
    return (
        <div className="dashboard">
            {response && <MessageBox type={messageType} txt={response} />}
            {loading && <Loading />}
            {gHead.task_box && <Tasks />}

            <div className="cardHolder">
                <div className="card">
                    {/* { <Filler/>} */}
                    {gHead.filer && <Filler />}
                    <div className="card_title">
                        <LuListTodo />
                        <p>To-Do</p>
                        <p className="separator"></p>
                        <AddOutlined className="add" onClick={() => {
                            addGHead('task_box', true)
                        }} />
                    </div>
                    {(gHead.user_tasks && gHead.user_tasks?.length > 0) ?
                        <div className="e_lister to_do">
                            <div className="e_row e_header">
                                <p className="e_ind"></p>
                                <p className="e_d e_k">Task</p>
                                <p className="e_d e_k1">Due</p>
                                <p className="e_d e_k2">Status</p>
                            </div>
                            {gHead.user_tasks?.map(l => {
                                return (
                                    <>
                                        <Tooltip key={l.id} title={l.status.toLowerCase()}>
                                            <div className="e_row"
                                                onContextMenu={(e) => {
                                                    handleContextMenu(e, l.id)
                                                }}
                                                onClick={() => {
                                                    setTaskMenuId(t => '')
                                                }}>
                                                <p className="e_ind" style={{
                                                    background: l.status == 'APPROVED' || l.status == 'REIMBURSED' ? 'green' : l.status == 'DRAFT' ? '#ca7300' : 'grey'
                                                }}></p>
                                                <p className="e_d e_k">{l.name}</p>
                                                <p className="e_d e_k1">{l.due_date}</p>
                                                <p className="e_d e_k2">{l.status.toLowerCase()}</p>
                                                <Tooltip title={Math.floor((l.curr_value / l.value) * 100) + "% Done"}>
                                                    {l.status != 'DONE' ?
                                                        <CGuage count={Math.floor((l.curr_value / l.value) * 100)} />
                                                        :
                                                        <div className="done_fill" style={{
                                                            marginLeft: '1%'
                                                        }}>
                                                            <TiTick className="tick" />
                                                        </div>}
                                                </Tooltip>
                                                <p style={{
                                                    fontSize: '10px'
                                                }} onClick={() => {
                                                    if (loading) return
                                                    deleteTask(l.id)
                                                }}>{loadingItem == l.id ? <LoadingOutlined className="del" /> : <DeleteOutline className="del" />}</p>

                                            </div>
                                        </Tooltip>
                                        {task_menu_id == l.id && <div style={{
                                            top: menuPosition.y,
                                            left: `${menuPosition.x - 10}px`
                                        }} className="hover_menu" onClick={() => {
                                            setTaskMenuId(t => '')
                                            addGHead('expense_ref', true)
                                        }}>
                                            <p>restart</p>
                                            <p>mark done</p>
                                            <p>delete</p>
                                        </div>}
                                    </>
                                )
                            })}
                        </div>
                        :
                        loading
                            ?
                            <div className="loading" style={{
                                marginTop: '20%'
                            }}>
                                <LoadingOutlined />
                            </div>
                            :
                            <>

                                <img src={expense_ava} className="cardImage" />
                                <p>You don't have any items here</p>
                            </>}
                </div>
                <div className="card">
                    <div className="card_title">
                        <FaMoneyBills />
                        <p>Spendings</p>
                    </div>
                    {gHead.user_expenses && gHead.user_expenses.length != 0
                        ?
                        <div className="e_lister">
                            <div className="e_row e_header">
                                <p className="e_ind"></p>
                                <p className="e_d" style={{
                                    marginLeft: '2%'
                                }}>Amount</p>
                                <p className="e_d">Invoice</p>
                                <p className="e_d">Time Code</p>
                                <p className="e_d">Category</p>
                                <p className="e_d">Status</p>
                                <p className="e_d">Date</p>
                            </div>
                            {gHead.user_expenses.sort((a, b) => (new Date(b.log_date).getTime()) - (new Date(a.log_date).getTime())).map(l => {
                                console.log()
                                return (
                                    <>
                                        <Tooltip title={l.status.toLowerCase()}>
                                            <div className="e_row" onClick={() => {
                                                const rp = l.report_period.split(', ')
                                                const d = [
                                                    l.id,
                                                    rp[0] || '',
                                                    rp[1] || '',
                                                    l.country,
                                                    l.merchant,
                                                    l.amount,
                                                    l.status,
                                                    l.expense_date,
                                                    l.invoice,
                                                    l.category,
                                                    l.time_code,
                                                    l.description,
                                                    l.pin,
                                                    l.etr,
                                                    l.file_url
                                                ];
                                                addGHead('focused_expense', d)
                                                addGHead('filer', true)
                                            }}>
                                                <p className="e_ind" style={{
                                                    background: l.status == 'APPROVED' || l.status == 'REIMBURSED' ? 'green' : l.status == 'DRAFT' ? 'grey' : l.status == 'REJECTED' ? 'red' : '#ca7300'
                                                    // background: l.status == 'APPROVED' || l.status == 'REIMBURSED' ? 'green' : l.status == 'DRAFT' ? '#ca7300' : l.status == 'REJECTED' ? 'red' : 'grey'
                                                }}></p>
                                                <p className="e_d"><span style={{
                                                    fontSize: '10px'
                                                }}>KES</span> {l.amount || '0'}</p>
                                                <p className="e_d">{shortenWord(l.invoice + "ADSFASD", 8)}</p>
                                                <p className="e_d">{shortenWord(l.time_code || '', 11)}</p>
                                                <p className="e_d">{l.category}</p>
                                                <p className="e_d">{shortenWord(l.status.toLowerCase(), 5)}</p>
                                                <p className="e_d">{l.expense_date}</p>
                                            </div>
                                        </Tooltip>
                                    </>
                                )
                            })}
                        </div>
                        :
                        loading
                            ?
                            <div className="loading" style={{
                                marginTop: '20%'
                            }}>
                                <LoadingOutlined />
                            </div>
                            :
                            <>
                                <img src={spending_ava} className="cardImage" style={{
                                    width: '40%',
                                    marginTop: '-3%'
                                }} />
                                <p>You don't have any items here</p>
                            </>}
                </div>
            </div>
            <div className="footerHolder">
                <div className="expense">
                    <div className="wedge"></div>
                    <div className="lister first">
                        <RiMoneyDollarBoxFill className="wed" />
                        <p>Expense Tracker</p>
                    </div>
                    <div className="lister">
                        <p className="desc">Submitted</p>
                        <p className="mon"><span className="curr">KES</span> {(gHead.user_expenses && gHead.user_expenses.length > 0) ? gHead.user_expenses.filter(l => {
                            if (!l.amount || l.status == 'DRAFT') return false
                            return true
                        }).reduce((a, b) => parseInt(a) + parseInt(b?.amount), 0) : '0.00'}</p>
                        {/* currency should be country office */}
                    </div>

                    <div className="lister">
                        <p className="desc">Advances</p>
                        <p className="mon"><span className="curr">KES</span> 0</p>
                    </div>
                    <div className="lister">
                        <p className="desc">Pending Approval</p>
                        <p className="mon"><span className="curr">KES</span> {(gHead.user_expenses && gHead.user_expenses.length > 0) ? gHead.user_expenses.filter(l => l.status == 'PENDING' || l.status == 'FORWARDED').reduce((a, b) => parseInt(a) + parseInt(b?.amount), 0) : '0.00'}</p>
                    </div>
                    <div className="lister">
                        <p className="desc">Approved</p>
                        <p className="mon"><span className="curr">KES</span> {(gHead.user_expenses && gHead.user_expenses.length > 0) ? gHead.user_expenses.filter(l => l.status == 'APPROVED').reduce((a, b) => parseInt(a) + parseInt(b?.amount), 0) : '0.00'}</p>
                    </div>

                    <div className="lister">
                        <p className="desc">Reimbursed</p>
                        <p className="mon"><span className="curr">KES</span> {(gHead.user_expenses && gHead.user_expenses.length > 0) ? gHead.user_expenses.filter(l => l.status == 'REIMBURSED').reduce((a, b) => parseInt(a) + parseInt(b?.amount), 0) : '0.00'}</p>
                        {/* currency should be country office */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardDefault