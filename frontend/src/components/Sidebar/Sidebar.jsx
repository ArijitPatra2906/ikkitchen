import React from 'react'
import "./Sidebar.css"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Link, useNavigate } from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';
import PostAddIcon from '@mui/icons-material/PostAdd';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("_token")
        navigate("/")
    };
    const user = JSON.parse(localStorage.getItem("userInfo"));
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <img src="https://designavenue.co.in/ikkitchen/assets/image/logo.png" alt="logo" className="logo" />
                </Link>
            </div>
            <br />
            <div className="center">
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
                    {/* <Link to="/faq" style={{ textDecoration: "none" }}>
                        <li>
                            <QuizIcon className="icon" />
                            <span>Faq</span>
                        </li>
                    </Link> */}
                    <p className="title">USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span style={{ textTransform: "capitalize" }}>{user.username}</span>
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
        </div>
    )
}

export default Sidebar
