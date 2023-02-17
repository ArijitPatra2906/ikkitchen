import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css"

function Dashboard() {

    const [totalCourse, setTotalCourse] = useState("");
    const [totalContact, setTotalContact] = useState("");
    const [totalBlogs, setTotalBlogs] = useState("");
    const [totalFaq, setTotalFaq] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("_token"))
            navigate("/")
    }, [navigate])
    useEffect(() => {
        const getAllCardData = async () => {
            setLoading(true);
            const result = await axios.get("https://jeevmokshayogaadminportal.herokuapp.com/api/booking/count");
            const result2 = await axios.get("https://jeevmokshayogaadminportal.herokuapp.com/api/contact/count");
            const result3 = await axios.get("https://jeevmokshayogaadminportal.herokuapp.com/api/blogs/count");
            const result4 = await axios.get("https://jeevmokshayogaadminportal.herokuapp.com/api/faq/count");
            setTotalCourse(result.data)
            setTotalContact(result2.data)
            setTotalBlogs(result3.data)
            setTotalFaq(result4.data)
            setLoading(false);
            console.log(totalCourse)
            console.log(totalContact)
            console.log(totalBlogs)
            console.log(totalFaq)
        };
        getAllCardData()
    }, [totalBlogs, totalContact, totalCourse, totalFaq])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid className='dashboard_container' item xs={12}>
                    <Typography fontSize="26px" mt={4} pb={3} fontWeight="700">Dashboard</Typography>
                    {loading === true ? (<div style={{ marginTop: "50px" }}>
                        <CircularProgress size={70} color="inherit" />
                    </div>) : (
                        <Box className="dashMain">
                            <Card sx={{
                                minWidth: 356, height: 150, background: "#af8043",
                                boxShadow: "2px 3px 3px 2px rgb(190, 167, 123)",
                                borderRadius: 3,
                                cursor: "pointer",
                            }}>
                                <CardContent>
                                    <Link to="/courseinfo" style={{ textDecoration: "none" }}>
                                        <Typography fontWeight="700" sx={{ fontSize: 28, mt: 2 }} color="#3a3731" gutterBottom>
                                            Total Course Queries
                                        </Typography>

                                    </Link>
                                    <Typography fontWeight="700" fontSize={26} color="#3a3731">
                                        {totalCourse}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{
                                minWidth: 356, height: 150, background: "#af8043",
                                cursor: "pointer",
                                boxShadow: "2px 3px 3px 2px rgb(190, 167, 123)",
                                borderRadius: 3
                            }}>
                                <CardContent>
                                    <Link to="/contact" style={{ textDecoration: "none" }}>
                                        <Typography fontWeight="700" sx={{ fontSize: 28, mt: 2 }} color="#3a3731" gutterBottom>
                                            Total Contacts
                                        </Typography>
                                    </Link>
                                    <Typography fontWeight="700" fontSize={26} color="#3a3731">
                                        {totalContact}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{
                                minWidth: 356, height: 150, background: "#af8043",
                                cursor: "pointer",
                                boxShadow: "2px 3px 3px 2px rgb(190, 167, 123)",
                                borderRadius: 3
                            }}>
                                <CardContent>
                                    <Link to="/blog" style={{ textDecoration: "none" }}>
                                        <Typography fontWeight="700" sx={{ fontSize: 28, mt: 2 }} color="#3a3731" gutterBottom>
                                            Total Blogs
                                        </Typography>

                                    </Link>
                                    <Typography fontWeight="700" fontSize={26} color="#3a3731">
                                        {totalBlogs}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{
                                minWidth: 356, height: 150, background: "#af8043",
                                cursor: "pointer",
                                boxShadow: "2px 3px 3px 2px rgb(190, 167, 123)",
                                borderRadius: 3
                            }}>
                                <CardContent>
                                    <Link to="/faq" style={{ textDecoration: "none" }}>
                                        <Typography fontWeight="700" sx={{ fontSize: 28, mt: 2 }} color="#3a3731" gutterBottom>
                                            Total Faqs
                                        </Typography>

                                    </Link>
                                    <Typography fontWeight="700" fontSize={26} color="#3a3731">
                                        {totalFaq}
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
