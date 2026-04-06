import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

import GridViewIcon from "@mui/icons-material/GridView";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

import { NavLink } from "react-router-dom";

function Sidebar({
  open,
  setOpen,
  collapsed,
  setCollapsed,
  role
}) {

  const NAV = [
    { path: "/", label: "Dashboard", icon: <GridViewIcon /> },
    { path: "/transactions", label: "Transactions", icon: <ReceiptLongIcon /> },
    { path: "/insights", label: "Insights", icon: <BarChartIcon /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`sidebar 
        ${open ? "open" : ""} 
        ${collapsed ? "collapsed" : ""}`}
      >

        {/* collapse btn */}
        <div className="sidebar-header">
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <MenuIcon />
          </IconButton>
        </div>

        <div className='navigation'>
          {NAV.map(item => (
            <NavLink
              to={item.path}
              key={item.path}
              className="nav-item"
              onClick={() => setOpen(false)}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {!collapsed && (
          <div className='sidebar-footer'>
            <div className="role-badge">
              <span>Role</span>
              <span className={`role-tag ${role}`}>
                {role}
              </span>
            </div>
            <br />
            <hr />
            <h5>Made By: <br /> Divyansh Yadav</h5>
          </div>
        )}

      </div>
    </>
  )
}

export default Sidebar;