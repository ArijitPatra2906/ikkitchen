import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import "./Register.css"
import { ToastContainer, toast } from "react-toastify"


function Register() {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState(false);
    const [picLoading, setPicLoading] = useState(false);
    const navigate = useNavigate();


    const submitHandler = async () => {
        setPicLoading(true);
        if (!username || !email || !password || !confirmPass) {
            toast.warning("Please Fill all the fields", {
                position: "bottom-middle",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            alert("Please Fill all the fields")

            setPicLoading(false);
            return;
        }
        if (password !== confirmPass) {
            alert("Password Do not match")

            return;
        }
        console.log(username, email, password)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "https://jeevmokshayogaadminportal.herokuapp.com/api/auth/register",
                { username, email, password },
                config
            );
            console.log(data);
            toast.success("Registration Successful", {
                position: "bottom-middle",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // alert("Registration successfull")
            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-middle",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setPicLoading(false);
        }
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid className='Register_container' item xs={12}>
                    <form>
                        <br />
                        <TextField
                            required
                            className='register_textfield'
                            type="name"
                            label="Enter Your User Name"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <TextField
                            required
                            className='register_textfield'
                            type="email"
                            label="Enter Your Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <TextField
                            required
                            className='password'
                            type="password"
                            label="Enter Password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <TextField
                            required
                            className='password'
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <br />
                        <Button
                            className="registerBttn"
                            onClick={submitHandler}
                            isLoading={picLoading}
                            variant="contained" color="primary">
                            Sign Up
                        </Button>
                        <Typography variant="h7" mt={2}>Already have an account? <Link style={{ textDecoration: "none" }} to="/">Login</Link></Typography>
                    </form>
                </Grid>
            </Grid>
            <ToastContainer />
        </Box >
    )
}

export default Register
