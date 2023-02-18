import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, Button, Grid, TextField, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const submitHandler = async () => {
        setPicLoading(true);
        if (!email || !password) {
            toast.warning("Please Fill all the fields", {
                position: "bottom-middle",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setPicLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/auth/login",
                { email, password },
                config
            );
            toast.success("Login Successful", {
                position: "bottom-middle",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(data)
            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response.data, {
                position: "bottom-middle",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(error);
            setPicLoading(false);
        }
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid className='blog_container' item xs={12}>
                    <Box className="loginForm">
                        <form>
                            <Stack spacing={2}>
                                <TextField
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    // fullWidth
                                    sx={{width:"500px"}}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    autoComplete="on"
                                    name="password"
                                    password="password"
                                    required
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    // fullWidth
                                    sx={{width:"500px",marginBottom:"30px"}}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PasswordIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                            <Button className="loginBttn"
                            sx={{marginTop:"30px"}}
                                isLoading={picLoading}
                                onClick={submitHandler} variant="contained" color="primary">
                                {picLoading ? "Loading..." : "Login"}
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <ToastContainer />
        </Box>
    )
}

export default Login
