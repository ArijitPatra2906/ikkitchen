import React, { useEffect, useState } from 'react'
import "./Food.css"
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FoodModal from './FoodModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import UpdateFoodModal from './UpdateFoodModal';

function Food() {

    const [food, setFood] = useState([])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("_token"))
            navigate("/")
    }, [navigate])
    const getFoods = async () => {
        try {
            setLoading(true)
            const result = await axios.get("http://localhost:7000/api/product");
            setFood(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)

        }
    };
    useEffect(() => {
        getFoods()
    })
    const [openFood, setOpenFood] = useState(false);
    const [uFood, setUFood] = useState(false);

    const handleOpenFood = () => setOpenFood(true);
    const handleCloseFood = () => setOpenFood(false);
    const [openFoodUpdate, setOpenFoodUpdate] = useState(false);
    const handleOpenFoodUpdate = () => setOpenFoodUpdate(true);
    const handleCloseFoodUpdate = () => setOpenFoodUpdate(false);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:7000/api/product/" + id);
            toast.success('Food deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            getFoods()
        } catch (err) {
            toast.error('Something went wrong!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const handle = (f) => {
        setUFood(f)
        setOpenFoodUpdate(true)
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid className='blog_container' item xs={12}>
                    <div className='blog_top'>
                        <Button onClick={handleOpenFood} className='btn_faq' variant="contained" color='success' endIcon={<AddIcon />}>
                            Add new food
                        </Button>
                        <Typography fontSize="30px" mt={3} mb={3}>All Foods</Typography>
                    </div>
                    
                    <Grid className='blog_screen_2' item xs={12} >
                       
                        <Box className="blog_Sec_card">
                            {food && food?.map((b) => (
                                <Box className='blog1'>
                                    <Card sx={{ maxWidth: 300, height: "fit-content", bgcolor: "#ffffb3" }} >
                                        <CardActionArea >
                                            <CardContent >
                                                <Typography fontFamily="inter" gutterBottom variant="h7" fontSize="18px" fontWeight="600" lineHeight={1.5} color="black" textAlign="left" component="div">
                                                    Category : {b.category}
                                                </Typography>
                                                <Typography fontFamily="inter" mt={1.5} fontSize="16px" color="black" textAlign="left" letterSpacing={1} fontWeight="500" variant="body2">
                                                    {b.name}
                                                </Typography>
                                                <Typography mt={1.5} fontSize="12px" color="black" textAlign="left" letterSpacing={1} fontWeight="500" variant="body2">
                                                    Perportion Rate : {b.perportionrate}
                                                </Typography>
                                                <Typography mt={1.5} fontSize="12px" color="black" textAlign="left" letterSpacing={1} fontWeight="500" variant="body2">
                                                    500GM Rate : {b.halfkgRate}
                                                </Typography>
                                                <Typography mt={1.5} fontSize="12px" color="black" textAlign="left" letterSpacing={1} fontWeight="500" variant="body2">
                                                    1KG Rate : {b.fullkgRate}
                                                </Typography>
                                            </CardContent>
                                            <div className='icons'>
                                                <EditIcon onClick={() => handle(b)}/>
                                                <DeleteIcon className='deleteIcon' onClick={() => handleDelete(b._id)} />
                                            </div>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    {openFood && <FoodModal openFood={openFood} setOpenFood={setOpenFood} handleCloseFood={handleCloseFood} handleOpenFood={handleOpenFood} />}
                    {openFoodUpdate && <UpdateFoodModal getFood={getFoods} food={uFood} openFoodUpdate={openFoodUpdate} setOpenFoodUpdate={setOpenFoodUpdate} handleCloseFoodUpdate={handleCloseFoodUpdate} handleOpenFoodUpdate={handleOpenFoodUpdate} />}
                </Grid>
            </Grid>
        </Box>

    )
}

export default Food
