import { CloseOutlined } from '@mui/icons-material'
import '../../assets/styles/users.scss'
import { useGiraf } from '../../giraff'
import { useEffect, useState } from 'react'
import MessageBox from '../../components/message'
import Loading from '../../components/loading'
import usePostApi from '../../hooks/postapi'
import usePushMessage from '../../hooks/pushmessage'
import appConfig from '../../config'
const AddRole = () => {
    const { gHead, addGHead } = useGiraf()
    const [permissionList, setPermissionList] = useState(new Set([]))
    const { messageType, response, pushMessage } = usePushMessage()
    const [loading, setLoading] = useState(false)
    const { actionRequest } = usePostApi()
    const [role, setRole] = useState('')
    const [type, setType] = useState('')

    const postRole = () => {
        setLoading(true)
        if (!role || permissionList.size == 0) return pushMessage('missings roles or permissions')
        actionRequest({
            endPoint: `${appConfig.api}settings/roles`, params: {
                name: role,
                type,
                permissions: [...permissionList]
            }
        }).then(res => {
            pushMessage(res.message, 'success')
            addGHead('addRole', false)
        }).catch(err => {
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="add_user_cont add_office">
            {response && <MessageBox type={messageType} txt={response} />}
            {loading && <Loading />}
            <div className="form">
                <h2>Add Role</h2>
                <CloseOutlined className='close' onClick={() => {
                    addGHead('addRole', false)
                }} />
                <div className='fields'>

                    <div className='holder'>
                        <p>Role Name</p>
                        <input placeholder='role name' onChange={(e) => {
                            setRole(e.target.value)
                        }} />
                    </div>
                    <div className='holder'>
                        <p>Permissions</p>
                        <div className='role_list'>
                            {[...permissionList].map((p, x) => {
                                return (
                                    <div >
                                        <p>{p}</p>
                                        <CloseOutlined className='close' onClick={() => {
                                            let new_arr = [...permissionList]
                                            new_arr.splice(x, 1)
                                            setPermissionList(new Set([...new_arr]))
                                        }} />
                                    </div>
                                )
                            })}
                        </div>
                        <select onChange={(e) => {
                            setPermissionList(l => {

                                return new Set([...l, e.target.value])
                            })
                        }}>
                            <option selected disabled>~ select permission ~</option>
                            {gHead.permissions && gHead.permissions.map(l => {
                                return (
                                    <option value={l.key}>{l.key}</option>
                                )
                            })}
                        </select>

                        <select style={{
                            marginTop: '2%'
                        }} onChange={(e) => {
                            setType(e.target.value)
                        }}>
                            <option selected disabled>~ Role Type ~</option>
                            <option value={'USER'}> user </option>
                            <option value={'ADMIN'}> admin </option>
                            <option value={'APPROVER'}> approver </option>

                        </select>


                    </div>


                    <div className='buttons'>
                        <div className='sub' onClick={() => {
                            addGHead('addRole', false)
                        }}>Cancel</div>
                        <div className='sub' onClick={() => {
                            postRole()
                        }}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRole