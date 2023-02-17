import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Dashboard from '../pages/Dashboard/Dashboard'
import "./style.css"

function DashboardView() {
    return (
        <div className='dashboard'>
            <Sidebar />
            <div className="dashboardContainer">
                <Navbar />
                <Dashboard />
            </div>
        </div>
    )
}

export default DashboardView