import React from "react";
import { NavLink } from 'react-router-dom';
import "./header.css";
import NetflixLogo from "../../Assets/images/Netflixlogo.png";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// // Icons (assuming you're using MUI or similar)
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header() {
  return (
    <div className="header_outer_container">
      <div className="header_container">
        {/* LEFT SIDE */}
        <div className="header_left">
          <ul>
            <li>
              <img
                 src={NetflixLogo}
                alt="Netflix Logo"
                 width="100"
              />
            </li>
            <li><NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
            <li><NavLink to="/category/tvshows" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>TV Shows</NavLink></li>
            <li><NavLink to="/category/movies" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Movies</NavLink></li>
            <li><span className="nav-link disabled">Latest</span></li>
            <li><span className="nav-link disabled">My List</span></li>
            <li><span className="nav-link disabled">Browse by Languages</span></li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="header_right">
          <ul>
            <li><SearchIcon /></li>
            <li><NotificationsNoneIcon /></li>
            <li><AccountBoxIcon /></li>
            <li><ArrowDropDownIcon /></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
export default Header