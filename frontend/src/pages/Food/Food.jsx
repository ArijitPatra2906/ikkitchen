import React, { useEffect, useState } from 'react'
import "./Food.css"
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FoodModal from './FoodModal';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
function Food() {

    const [blog, setBlog] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("_token"))
            navigate("/")
    }, [navigate])
    useEffect(() => {
        const getBlogs = async () => {
            const result = await axios.get("");
            setBlog(result.data)
            // console.log(blog)
        };
        getBlogs()
    })
    const [openFood, setOpenFood] = useState(false);
    const handleOpenFood = () => setOpenFood(true);
    const handleCloseFood = () => setOpenFood(false);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid className='blog_container' item xs={12}>
                    <div className='blog_top'>
                            <Button onClick={handleOpenFood} className='btn_faq' variant="contained" endIcon={<AddIcon />}>
                                Add new food
                            </Button>
                        <Typography fontSize="30px" mt={3} mb={3}>All Foods</Typography>

                    </div>
                    <Grid className='blog_screen_2' item xs={12} >
                        <Box className="blog_Sec_card">

                            {blog && blog?.map((b) => (
                                <Box className='blog1'>
                                    <Card sx={{ maxWidth: 300, height: "fit-content", bgcolor: "#906A47" }} >
                                        <CardActionArea >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={b.pic}
                                                alt="green iguana"
                                            />
                                            <CardContent >
                                                <Typography fontFamily="inter" gutterBottom variant="h7" fontSize="18px" fontWeight="600" lineHeight={1.5} color="white" textAlign="left" component="div">
                                                    {b.title}
                                                </Typography>
                                                <div className="author">
                                                    <PersonOutlineIcon />
                                                    <Typography fontSize="12px" color="white">{new Date(b.createdAt).toDateString()} | {new Date(b.createdAt).toLocaleTimeString()}</Typography>
                                                </div>
                                                <Typography mt={1.5} fontSize="12px" color="white" textAlign="left" letterSpacing={1} fontWeight="500" variant="body2">
                                                    {b.desc}
                                                </Typography>
                                                {/* <Link to={`/blog/${b._id}`} style={{ textDecoration: "none" }}>
                                                    <button className='blog_card_btn'>
                                                        Action
                                                    </button>
                                                </Link> */}
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    {openFood && <FoodModal openFood={openFood} setOpenFood={setOpenFood} handleCloseFood={handleCloseFood} handleOpenFood={handleOpenFood} />}
                </Grid>
            </Grid>
        </Box>

    )
}

export default Food
