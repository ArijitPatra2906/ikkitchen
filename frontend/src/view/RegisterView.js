import { Typography } from '@mui/material'
import React from 'react'
import Register from '../components/Register/Register'
import loginImage from "../assets/jeevmoksha-banner-1 mobile.jpg"

function RegisterView() {
    return (
        <div style={{ display: "flex" }}>
            <div className='homeleft'>
                <Typography variant='h3' alignItems="center" mb={3} textAlign="center">Register</Typography>
                <Register />
            </div>
            <div className='home_right'>
                <img src={loginImage} alt="" />
            </div>
        </div>
    )
}

export default RegisterView
