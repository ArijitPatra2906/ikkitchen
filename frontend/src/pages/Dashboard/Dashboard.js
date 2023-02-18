import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css"

function Dashboard() {

    const [totalFood, setTotalFood] = useState("");
    const [totalCategory, setTotalCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("userInfo"))
            navigate("/")
    }, [navigate])
    useEffect(() => {
        const getAllCardData = async () => {
            setLoading(true);
            const result = await axios.get("http://localhost:7000/api/product/count");
            const result2 = await axios.get("http://localhost:7000/api/cat/count");
            setTotalFood(result.data)
            setTotalCategory(result2.data)
            setLoading(false);
        };
        getAllCardData()
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid className='dashboard_container' item xs={12}>
                    <Typography fontSize="26px" mt={4} pb={3} fontWeight="700">Dashboard</Typography>
                    {loading === true ? (<div style={{ marginTop: "50px" }}>
                        <CircularProgress size={70} color="success" />
                    </div>) : (
                        <Box className="dashMain">
                            <Card sx={{
                                minWidth: 356, height: 150, background: "#2f7056",
                                boxShadow: "2px 3px 3px 2px rgb(190, 167, 123)",
                                borderRadius: 3,
                                cursor: "pointer",
                            }}>
                                <CardContent>
                                    <Link to="/food" style={{ textDecoration: "none" }}>
                                        <Typography fontWeight="700" sx={{ fontSize: 28, mt: 2 }} color="#fff" gutterBottom>
                                            Total Food Items
                                        </Typography>

                                    </Link>
                                    <Typography fontWeight="700" fontSize={26} color="#fff">
                                        {totalFood}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{
                                minWidth: 356, height: 150, background: "#2f7056",
                                cursor: "pointer",
                                boxShadow: "2px 3px 3px 2px rgb(190, 167, 123)",
                                borderRadius: 3
                            }}>
                                <CardContent>
                                    <Link to="/category" style={{ textDecoration: "none" }}>
                                        <Typography fontWeight="700" sx={{ fontSize: 28, mt: 2 }} color="#fff" gutterBottom>
                                            Total Categories
                                        </Typography>
                                    </Link>
                                    <Typography fontWeight="700" fontSize={26} color="#fff">
                                        {totalCategory}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard
