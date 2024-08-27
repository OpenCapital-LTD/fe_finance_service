// project import
// import pages from './pages';
import { DashboardOutlined, MenuOutlined, Receipt, SettingsOutlined } from '@mui/icons-material';
import dashboard from './dashboard';
import { DashOutlined } from '@ant-design/icons';
import { IoHomeOutline } from 'react-icons/io5';
import { TbGraph, TbReceipt, TbReportSearch } from 'react-icons/tb';
import { CiReceipt } from 'react-icons/ci';
// import accounts from './accounts';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [{
    title:'Dashboard ',
    url :'/',
    icon:<IoHomeOutline size={23}/>
  },{
    title:'Expense',
    url:'/expense',
    icon:<TbGraph size={23}/>
  }
  ,{
    title:'Reports',
    url:'/expense',
    icon:<TbReportSearch size={23}/>
  } 
  ,{
    title:'Receipts',
    url:'/reciepts',
    icon:<TbReceipt size={23}/>
  } 
  ,{
    title:'Settings',
    url:'/settings/users',
    icon:<SettingsOutlined size={23}/>
  }  ]
};

export default menuItems;
