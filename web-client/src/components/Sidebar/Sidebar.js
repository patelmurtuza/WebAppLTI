import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useState} from 'react';
import './Sidebar.css';
import PersonIcon from '@material-ui/icons/Person';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import WorkIcon from '@material-ui/icons/Work';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';





const Sidebar = ({changeFunction})=> {

    const WindReload = () => {
        window.location.reload();
    }

  
    const [MenuName,setMenuName]=useState('Dashboard');
    
    return (
        <div className="PSide">
            <ProSidebar>
                <SidebarHeader>{MenuName}</SidebarHeader>
                <SidebarContent>
                <Menu >
                    <MenuItem className="Submenu" onClick={WindReload}>Dashboard</MenuItem>
                    <SubMenu title="Add Entry" className="Submenu" onClick = {() => setMenuName("Add Entry")}>
                        <MenuItem onClick = {() => {setMenuName("Dashboard")
                                                    changeFunction("Add Person",null,null,1)}}> <PersonAddIcon/> Add Person </MenuItem>
                        <MenuItem onClick = {() => {setMenuName("Dashboard")
                                                    changeFunction("Add Service",null,null,1)}} > <PostAddIcon/> Add Service </MenuItem>
                        <MenuItem onClick = {() => {setMenuName("Dashboard")
                                                    changeFunction("Add Item",null,null,1)}} > <AddShoppingCartIcon/> Add Item </MenuItem>
                    </SubMenu>
                    <SubMenu title="Tables" className="Submenu" onClick = {() => setMenuName("Tables")}>
                        <MenuItem onClick = {() => {setMenuName("Tables")
                                                    changeFunction("Person",null,null,1)
                                                    }}> <PersonIcon/> Person </MenuItem>
                        <MenuItem onClick = {() => {setMenuName("Tables")
                                                    changeFunction("Service",null,null,1)}}> <WorkIcon/>Service </MenuItem>
                        <MenuItem onClick = {() => {setMenuName("Tables")
                                                    changeFunction("Item",null,null,1)}}> <ShoppingCartIcon/>Item </MenuItem>
                        <MenuItem onClick = {() => {setMenuName("Tables")
                                                    changeFunction("Transaction",null,null,1)}}> <LocalAtmIcon/> Transaction </MenuItem>
                    </SubMenu>
                </Menu>
                </SidebarContent>
                {/* <SidebarFooter>Footer</SidebarFooter> */}
            </ProSidebar>
      </div>
    );
};

export default Sidebar;












