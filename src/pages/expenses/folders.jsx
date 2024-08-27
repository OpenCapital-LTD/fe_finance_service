import { AddOutlined, CloseOutlined, DeleteOutline, Download, DownloadOutlined, FolderOutlined } from '@mui/icons-material'
import '../../assets/styles/folders.scss'
import { useEffect, useState } from 'react'
import MessageBox from '../../components/message'
import Loading from '../../components/loading'
import useGetApi from '../../hooks/getapi'
import usePostApi from '../../hooks/postapi'
import usePushMessage from '../../hooks/pushmessage'
import appConfig from '../../config'
import { getDate, shortenWord } from '../../BFF/utils'
import { useGiraf } from '../../giraff'
import { Tooltip } from '@mui/material'

const Folders = () => {
    const { gHead, addGHead } = useGiraf()
    const [folders, setFolders] = useState([])
    const [loading, setLoading] = useState(false)
    const { actionRequest } = useGetApi()
    const { actionRequest: actionPostRequest } = usePostApi()
    const { messageType, response, pushMessage } = usePushMessage()
    const [country, setCountry] = useState(gHead.countries[0]?.office_id)
    const [folderItems, setFolderItems] = useState([])
    const [folderName, setFolderName] = useState('')

    useEffect(() => {
        setLoading(true)
        actionRequest({ endPoint: `${appConfig.api}folders` }).then((res) => {
            setFolders(res.data)
            console.log(res.data)
        }).catch((err) => {
            pushMessage(err.message, 'error')

        }).finally(() => {
            setLoading(false)
        })
        return addGHead('refresh_folders', null)
    }, [gHead.refresh_folders])

    const createFolder = () => {
        setLoading(true)
        const now = new Date()
        const month = getDate(now).month
        actionPostRequest({
            endPoint: `${appConfig.api}folders`, params: {
                month,
                country
            }
        }).then((res) => {
            pushMessage(res.message, 'success')
            addGHead('refresh_folders', true)
        }).catch((res) => {
            pushMessage(res.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="folders">
            {response && <MessageBox type={messageType} txt={response} sytles={{
                right: '20px',
                top: '10%',
                height: 'fit-content'
            }} />}
            {loading && <Loading />}
            {gHead.folder_pane && <div className='folder_list'>
                <div className='main'>
                    <div className='header'>
                        <p>{country}, {folderName}</p>
                        <div className='button_d'>Forward</div>
                        <DownloadOutlined style={{
                            fontSize: '20px',
                            border: '1px solid grey',
                            padding: '5px',
                            cursor: 'pointer'
                        }} />
                        <CloseOutlined className='close' style={{
                            marginLeft: '10%'
                        }} onClick={() => {
                            addGHead('folder_pane', false)
                        }} />
                    </div>
                    <div className='body'>
                        < div className="e_lister">
                            <div className="e_row e_header" style={{
                                marginLeft: '2%',
                                width: '66%',
                            }}>
                                <p className="e_ind"></p>
                                <p className="e_d">Amount</p>
                                <p className="e_d">Invoice</p>
                                <p className="e_d">Time Code</p>
                                <p className="e_d">Category</p>
                                <p className="e_d">Status</p>
                                <p className="e_d">Date</p>
                            </div>
                            {folderItems.map(l => {
                                l = {
                                    ...l,
                                    ...l.Expense
                                }
                                return (
                                    <>
                                        <Tooltip title={l.status.toLowerCase()}>
                                            <div className="e_row" >
                                                <p className="e_ind" style={{
                                                }}></p>
                                                <p className="e_d"><span style={{
                                                    fontSize: '10px'
                                                }}>KES</span> {l.amount || '0'}</p>
                                                <p className="e_d">{l.invoice}</p>
                                                <p className="e_d">{shortenWord(l.time_code || '', 20)}</p>
                                                <p className="e_d">{l.category}</p>
                                                <p className="e_d">{l.status.toLowerCase()}</p>
                                                <p className="e_d">{l.expense_date}</p>
                                                <p className="e_d" style={{
                                                    marginLeft: '5%',

                                                }}>
                                                    <DeleteOutline onClick={() => {

                                                    }} style={{
                                                        fontSize: '15px',
                                                        border: '1px solid rgb(201, 0, 0)',
                                                        padding: '3px',
                                                        cursor: 'pointer',
                                                        color: 'rgb(201, 0, 0)'

                                                    }} />
                                                </p>
                                            </div>
                                        </Tooltip>
                                    </>
                                )
                            })}
                        </div>

                    </div>

                </div>
            </div>}

            <select value={country} className='s_country' onChange={(e) => {
                setCountry(e.target.value)
            }}>
                <option>~ select country ~</option>
                {gHead.countries?.map((l) => {
                    return (
                        <option value={l.office_id}>{l.name} </option>
                    )
                })}
            </select>
            <div className='main'>
                <div className='folder create_folder' onClick={() => {
                    createFolder()
                }}>
                    <AddOutlined className='icon' />
                    <p>Generate</p>
                </div>
                {folders.map((l) => {
                    return (
                        <div className='folder' onClick={() => {
                            setFolderName(l.month + " " + l.year)

                            setFolderItems(l.FolderItems)
                            addGHead('folder_pane', true)

                        }}>
                            <p>{l.month}</p>
                            <FolderOutlined className='icon' />
                        </div>
                    )
                })}
            </div>

        </div>
    )

}

export default Folders