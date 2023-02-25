import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Contact from '../pages/Contact/Contact'
import "./style.css"

function ContactView() {
    return (
        <div className='contact'>
            <Sidebar />
            <div className="contactContainer">
                <Navbar />
                <Contact />
            </div>
        </div >
    )
}

export default ContactView
