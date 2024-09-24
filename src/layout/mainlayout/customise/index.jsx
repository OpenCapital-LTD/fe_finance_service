import React, { useState } from 'react'
import '../../../assets/styles/drawer.scss'
import settings_menu from '../../../menu-items/settigns'
import { useNavigate } from 'react-router-dom'

const CustomizeDrawer = () => {
    const [selected, setSelected] = useState('Users')
    const navigate = useNavigate()
    return (
        <div className='custom_drawer'>

            {settings_menu.items.map(l => {
                return (
                    <div className='lister_sect'>
                        <br />
                        <p className='lister_tt'>{l.title.toUpperCase()}</p>
                        <div className='lister_nav'>
                            {l.children.map(k => {
                                return (

                                    <p className='lister' style={{
                                        backgroundColor: selected === k.title ? "rgba(128, 128, 128, 0.274)" : 'inherit'
                                    }}
                                        onClick={() => {
                                            setSelected(k.title)
                                            const url =  k.url
                                            // const url = '/settings' + k.url
                                            navigate(url)
                                        }}
                                    >{k.title}</p>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CustomizeDrawer