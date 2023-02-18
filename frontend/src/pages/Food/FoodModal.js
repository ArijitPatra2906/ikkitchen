import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import "./Food.css"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';

function FoodModal({ openFood, handleCloseFood, setOpenFood,getFood }) {
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [perportionrate, setPortionRate] = useState("")
    const [halfkgRate, setHalfRate] = useState("")
    const [fullkgRate, setFullRate] = useState("")
    const [halfOfHalfkgRate, setHalfOfHalfRate] = useState("")
    const user = JSON.parse(localStorage.getItem("userInfo"));



    const create = async () => {
        if (!category || !halfkgRate || !fullkgRate) {
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
            const { data } = await axios.post(
                "http://localhost:7000/api/product",
                { category, fullkgRate, name, perportionrate, halfkgRate, halfOfHalfkgRate, userId: user._id },
                config
            );
            console.log(data);
            getFood()
            // alert("Faq created successfully")
            toast.success('Food created successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // navigate("/faq");
            setOpenFood(false)
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
                open={openFood}
                onClose={handleCloseFood}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal_main modal_food' p={5}>
                    <CloseIcon onClick={handleCloseFood} className="modal_icon" />
                    <form >
                        <h3 className='headline' style={{ textAlign: "center", color: "black", marginTop: "-40px" }}>Add new Food</h3>
                        <Stack spacing={2}>
                            <FormControl >
                                <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    className='faq_textfield'
                                    value={category}
                                    label="Age"
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
                            <Button style={{ marginTop: "10px", width: "100%" }} variant="contained" color="success" onClick={create}>
                                Add
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
            <ToastContainer />

        </div>
    )
}

export default FoodModal
