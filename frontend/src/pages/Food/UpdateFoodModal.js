import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import "./Food.css"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';

function UpdateFoodModal({ openFoodUpdate, handleCloseFoodUpdate, setOpenFoodUpdate, food, getFood }) {
    const [category, setCategory] = useState(food.category ?? "")
    const [name, setName] = useState(food.name ?? "")
    const [perportionrate, setPortionRate] = useState(food.perportionrate ?? "")
    const [halfkgRate, setHalfRate] = useState(food.halfkgRate ?? "")
    const [fullkgRate, setFullRate] = useState(food.fullkgRate ?? "")
    const [halfOfHalfkgRate, setHalfOfHalfRate] = useState(food.halfOfHalfkgRate ?? "")

    const updateFood = async () => {
        if (!category || !perportionrate || !halfkgRate || !fullkgRate) {
            toast.warning('Please Fill all the required fields', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            // alert("Please Fill all the required fields")
            return;
        }
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.put(
                "http://localhost:7000/api/product/" + food._id,
                { category, fullkgRate, name, perportionrate, halfkgRate },
                config
            );
            // console.log(data);
            // alert("Faq created successfully")
            toast.success(data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // navigate("/faq");
            setOpenFoodUpdate(false)
            getFood()
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong,try again!!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    const [cat, setCat] = useState([])
    useEffect(() => {
        const getCat = async () => {
            try {
                const result = await axios.get("http://localhost:7000/api/cat");
                setCat(result.data)
                // console.log(category)
            } catch (error) {
                console.log(error)
            }
        };
        getCat()
    }, [])

    return (
        <div>
            <Modal
                open={openFoodUpdate}
                onClose={handleCloseFoodUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal_main modal_food' p={5}>
                    <CloseIcon onClick={handleCloseFoodUpdate} className="modal_icon" />
                    <form >
                        <h3 className='headline' style={{ textAlign: "center", color: "black", marginTop: "-40px" }}>Update Food</h3>
                        <Stack spacing={2}>
                            <FormControl >
                                <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    className='faq_textfield'
                                    value={category}
                                    label="cat"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {cat.map((c) => (
                                        <MenuItem value={c.name}>{c.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                className='faq_textfield'
                                type="text"
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {category === ("Biriyani" || "Desserts") ? (
                                <TextField
                                    required
                                    className='faq_textfield'
                                    type="text"
                                    label="Per Portion Rate"
                                    variant="outlined"
                                    value={perportionrate}
                                    onChange={(e) => setPortionRate(e.target.value)}
                                />
                            ) : ("")}
                            {category === "Spices" ? (
                                <TextField
                                    required
                                    className='faq_textfield'
                                    type="text"
                                    label="250gm Rate"
                                    variant="outlined"
                                    value={halfOfHalfkgRate}
                                    onChange={(e) => setHalfOfHalfRate(e.target.value)}
                                />
                            ) : ("")}
                            <TextField
                                required
                                className='faq_textfield'
                                type="text"
                                label="500gm Rate"
                                variant="outlined"
                                value={halfkgRate}
                                onChange={(e) => setHalfRate(e.target.value)}
                            />
                            <TextField
                                required
                                className='faq_textfield'
                                type="text"
                                label="1kg Rate"
                                variant="outlined"
                                value={fullkgRate}
                                onChange={(e) => setFullRate(e.target.value)}
                            />
                            <Button style={{ marginTop: "10px", width: "100%" }} variant="contained" color="success" onClick={updateFood}>
                                Update
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
            <ToastContainer />

        </div>
    )
}

export default UpdateFoodModal
