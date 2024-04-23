import React, { useState } from 'react'
import './Sidebar.css'
import { AiFillDashboard, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { FaBars, FaUser, FaPowerOff} from "react-icons/fa"
import { FaDroplet } from "react-icons/fa6"
import { BiSolidDonateBlood } from "react-icons/bi"
import { VscFeedback } from "react-icons/vsc"
import { NavLink } from 'react-router-dom'

function Sidebar({children}) {
    // Define state variable to control sidebar opening/closing
    const[isOpen, setIsOpen] = useState(false);

    // Function to toggle sidebar state
    const toggle = () => setIsOpen (!isOpen);

    // Array of menu items with paths, names, and corresponding icons
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <AiFillDashboard />
        },
        {
            path: "/donordashboard",
            name: "Donors",
            icon: <FaUser />
        },
        {
            path: "/bloods",
            name: "Bloods",
            icon: <FaDroplet />
        },
        {
            path: "/bloodrequest",
            name: "Blood Request",
            icon: <AiOutlineUsergroupAdd />
        },
        {
            path: "/createsupply",
            name: "Supply",
            icon: <BiSolidDonateBlood />
        },
        {
            path: "/feedback",
            name: "Feedback",
            icon: <VscFeedback />
        },
        {
            path: "/logoutpop",
            name: "Logout",
            icon: <FaPowerOff />
        },
    ]
  return (
    <div className='container'>
         {/* Sidebar container */}
        <div className="sidebar mr-2" style={{width: isOpen ? "200px" : "50px"}}>
            {/* Top section of the sidebar */}
            <div className="top_section ml-2">
                {/* Bars icon to toggle sidebar */}
                <div className="bars" style={{marginLeft: isOpen ? "150px" : "0px"}}>
                    <FaBars onClick={toggle}/>
                </div>
            </div>

            {/* Navigation links */}
            {
                 // Map through menu items and create NavLink for each item
                menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        {/* Icon */}
                        <div className="icon">{item.icon}</div>

                         {/* Link text */}
                        <div className="link_text" style={{display: isOpen ? "block" : "none"}}>{item.name}</div>
                    </NavLink>
                ))
            }
            
        </div>
        {/* Main content */}
        <main>{children}</main>
    </div>
  )
}

export default Sidebar