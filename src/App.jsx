import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/styles/global.scss'
import './assets/styles/components.scss'
import './App.css'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ScrollTop from './components/scrolltop.'
import Routes from './routes'
function App() {
  const [count, setCount] = useState(0)
  const { collapseSidebar } = useProSidebar();

  return (
    <ScrollTop>
      <Routes/>
    </ScrollTop>
  )
}

export default App
