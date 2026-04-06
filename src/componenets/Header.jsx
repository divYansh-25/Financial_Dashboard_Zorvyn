import React, { useState } from 'react'
import { Avatar ,IconButton } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

import './section.css'

function Header({ toggleSidebar }) {

  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className='header'>

      <div className='left-header'>
        <IconButton onClick={toggleSidebar} className="menu-btn">
          <MenuIcon />
        </IconButton>

      </div>
      <div className='logo'>
        <div className="logo-icon">F</div>
        <h1>FinTrack</h1>

      </div>

      <div className='profile'>
        <IconButton onClick={toggleTheme}>
          {dark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Avatar>
          <PersonIcon />
        </Avatar>

        <h3 className='name'>Divyansh Yadav</h3>
      </div>

    </div>
  )
}

export default Header;