import React, { useState } from 'react'
import "./Navbar.css"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Link, useNavigate } from "react-router-dom"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailIcon from '@mui/icons-material/Email';
import PostAddIcon from '@mui/icons-material/PostAdd';

function Navbar() {

    const [isOpen, setIsOpen] = useState(false)
    const [bar, setBar] = useState(true)
    const [close, setClose] = useState(false)

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userInfo")
        navigate("/")
    };
    const user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div className='navbar'>
            <div className="navbar_wrapper">
                <div className="header">
                    Admin dashboard for Ikkitchen
                </div>
                <div className="navlogo">
                    <img src="https://designavenue.co.in/ikkitchen/assets/image/logo.png" alt="" />
                </div>
            </div>
            <div div className="Navbar" >
                <div className={`nav-items ${isOpen && "open"}`}>
                    <ul>
                        <Link to="/dashboard" style={{ textDecoration: "none" }}>
                            <li>
                                <DashboardIcon className="icon" />
                                <span>Dashboard</span>
                            </li>
                        </Link>
                        <Link to="/category" style={{ textDecoration: "none" }}>
                            <li>
                                <ContactPageIcon className="icon" />
                                <span>Categories</span>
                            </li>
                        </Link>
                        <Link to="/contact" style={{ textDecoration: "none" }}>
                            <li>
                                <PostAddIcon className="icon" />
                                <span>Contact</span>
                            </li>
                        </Link>
                        <Link to="/food" style={{ textDecoration: "none" }}>
                            <li>
                                <CreditCardIcon className="icon" />
                                <span>Food Items</span>
                            </li>
                        </Link>
                        <p className="title">USER</p>
                        <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span style={{textTransform:"capitalize"}}>{user.username}</span>
                    </li>
                    <li>
                        <EmailIcon className="icon" />
                        <span>{user.email}</span>
                    </li>
                        <li onClick={handleLogout}>
                            <ExitToAppIcon className="icon" />
                            <span>Logout</span>
                        </li>
                    </ul>


                </div>
                <div
                    className={`nav-toggle ${isOpen && "open"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="menubar"
                        onClick={() => {
                            setBar(!bar)
                            // setClose(true)
                        }}>
                        {bar && (
                            <MenuIcon onClick={() => setClose(!close)} />
                        )}
                        {
                            close && (
                                <CloseIcon onClick={() => {
                                    setClose(!close)
                                    setBar(!bar)
                                }}
                                />
                            )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar
