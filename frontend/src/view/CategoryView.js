import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Category from '../pages/Category/Category'
import "./style.css"
function CategoryView() {
    return (
        <div className='course'>
            <Sidebar />
            <div className="courseContainer">
                <Navbar />
                <Category />
            </div>
        </div >
    )
}

export default CategoryView;