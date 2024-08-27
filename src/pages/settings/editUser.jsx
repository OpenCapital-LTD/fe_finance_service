import { CloseOutlined, EditOutlined } from '@mui/icons-material'
import '../../assets/styles/users.scss'
import { useEffect, useState } from 'react'
import { Switch } from '@mui/material'
import { MdModeEditOutline } from 'react-icons/md'
import { useGiraf } from '../../giraff'
import MessageBox from '../../components/message'
import Loading from '../../components/loading'
import usePushMessage from '../../hooks/pushmessage'
import appConfig from '../../config'
import useGetApi from '../../hooks/getapi'
const EditUser = () => {
    const [menu, setMenu] = useState("ACCOUNT")
    const [g_floater, setGFloater] = useState(false)
    const [edit, setEdit] = useState(false)
    const { gHead, addGHead } = useGiraf()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const { actionRequest } = useGetApi()
    const { messageType, response, pushMessage } = usePushMessage()
    const [loading, setLoading] = useState(false)
    const [role_list, setRoleList] = useState()
    const [country_list, setCountryList] = useState()
    const [office, setCountryOffice] = useState()

    // const [name, setName] = useState('')
    useEffect(() => {
        if (gHead.focused_user) {
            setFirstName(gHead.focused_user.firstName)
            setLastName(gHead.focused_user.lastName)
            setPhone(gHead.focused_user.phone)
            setCountryOffice(gHead.focused_user.country)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        actionRequest({ endPoint: `${appConfig.api}settings/roles` }).then((res) => {
            setRoleList(res.data)
        }).catch((err) => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
        actionRequest({ endPoint: `${appConfig.api}settings/countries` }).then((res) => {
            setCountryList(res.data)
        }).catch((err) => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <div className="edit_floater">
            {response && <MessageBox type={messageType} txt={response} />}
            {loading && <Loading />}

            <div className="header top">
                <div className='avator'>
                    <div className='init'>{gHead?.focused_user?.firstName[0]}{gHead?.focused_user?.lastName[0]}</div>
                    <div className='desc'>
                        <h5>{gHead?.focused_user?.firstName} {gHead?.focused_user?.lastName}</h5>
                        <p>{gHead?.focused_user?.email}</p>
                    </div>
                </div>
                <div className='close' onClick={() => {
                    addGHead('edit_user', false)
                }}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='menu'>
                <p style={{
                    backgroundColor: menu === 'ACCOUNT' && '#2D3E50',
                    color: menu === 'ACCOUNT' ? 'white' : '#2D3E50'
                }}
                    onClick={() => {
                        setMenu('ACCOUNT')
                    }}
                >ACCOUNT</p>
                <p style={{
                    backgroundColor: menu === 'ROLES' && '#2D3E50',
                    color: menu === 'ROLES' ? 'white' : '#2D3E50'
                }}
                    onClick={() => {
                        setMenu('ROLES')
                    }}>ROLES</p>
                <p style={{
                    backgroundColor: menu === 'DETAILS' && '#2D3E50',
                    color: menu === 'DETAILS' ? 'white' : '#2D3E50'
                }}
                    onClick={() => {
                        setMenu('DETAILS')
                    }}>DETAILS</p>
                <p style={{
                    backgroundColor: menu === 'REFERENCES' && '#2D3E50',
                    color: menu === 'REFERENCES' ? 'white' : '#2D3E50'
                }}
                    onClick={() => {
                        setMenu('REFERENCES')
                    }}></p>
            </div>
            {menu === 'ACCOUNT' && <div className='accounts'>
                <div className='groups'>
                    {g_floater && <div className='float_box'>
                        <p onClick={() => {
                            setGFloater(false)
                        }}>x</p>
                        <p>SELECT GROUP</p>
                        {
                            country_list?.map(l => {
                                return (
                                    <div>{l.name}</div>
                                )
                            })
                        }
                    </div>}
                    <div className='header' style={{ marginTop: '30px' }}>
                        <h4>Country Office</h4>
                        <div className='add' onClick={() => {
                            setGFloater(t => true)
                        }}>+ edit</div>
                    </div>
                    <div className='lister'>
                        <p className='tt'>CURRENT OFFICE</p>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '12px'
                        }}>{office}</p>
                    </div>
                </div>

            </div>}
            {menu === 'ROLES' && <div className='roles'>
                <p className='hd'>ALL ROLES</p>
                <br></br>
                {role_list?.map(l => {
                    return (
                        <div className='role_list'>
                            <div className='desc'>
                                <p className='p1'>{l.name}</p>
                            </div>
                            <input type='checkbox' className='check' checked={gHead.user.UserRoles.map(l => l.role_id).includes(l.id)} />
                        </div>
                    )
                })}
            </div>}
            {menu === 'DETAILS' && <div className='details'>
                <div className='header' style={{
                    // alignItems:'space-around'
                }}>
                    <h4>Personal Info</h4>
                    <div className='add' onClick={() => {
                        setEdit(l => {
                            if (l) return false
                            if (!l) return true
                        })
                    }}><MdModeEditOutline size={10} /> {edit ? 'save' : 'edit'}</div>
                </div>
                <div className='container'>
                    <div className='list'>
                        <p>First Name</p>
                        <input value={firstName} placeholder='- -' disabled={!edit} />
                    </div>
                    <div className='list'>
                        <p>Last Name</p>
                        <input value={lastName} placeholder='- -' disabled={!edit} />
                    </div>
                    <div className='list'>
                        <p>Phone</p>
                        <input value={phone} placeholder='- -' disabled={!edit} />
                    </div>
                </div>

            </div>}
        </div>
    )
}
export default EditUser