import React from 'react'
import Login from '../components/Login/Login'
import { Typography } from '@mui/material'

function LoginView() {
    return (
        <div style={{ display: "flex",alignItems:"center",backgroundColor:"#f7f7f7"}}>
            <div className='homeleft'>
                <Typography variant='h3' alignItems="center" mb={3} textAlign="center">Login</Typography>
                <Login />
            </div>
            <div className='home_right'>
                <img src="https://img.freepik.com/free-photo/side-view-chef-baking-delicious-pizza_23-2150134245.jpg?w=740&t=st=1676566972~exp=1676567572~hmac=79cfc7511f48533b30a7bdc1ff4a7ff4a0335164f2bd937aca125cf59df3a430" alt="" />
            </div>
        </div>
    )
}

export default LoginView
