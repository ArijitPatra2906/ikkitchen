import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Food from '../pages/Food/Food'

function FoodView() {
    return (
        <div className='faq'>
            <Sidebar />
            <div className="faqContainer">
                <Navbar />
                <Food />
            </div>
        </div>
    )
}

export default FoodView