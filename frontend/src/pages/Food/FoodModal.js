import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import "./Food.css"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';

function FoodModal({ openFood, handleCloseFood, }) {
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [portionRate, setPortionRate] = useState("")
    const [halfRate, setHalfRate] = useState("")
    const [fullRate, setFullRate] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("_token"))
            navigate("/")
    }, [navigate])
    const create = async () => {
        if (!category || !portionRate) {
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
                "",
                { category },
                config
            );
            console.log(data);
            // alert("Faq created successfully")
            toast.success('Faq created successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // navigate("/faq");
            window.location.reload()


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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                        <TextField
                            required
                            className='faq_textfield'
                            type="text"
                            label="Per Portion Rate"
                            variant="outlined"
                            value={portionRate}
                            onChange={(e) => setPortionRate(e.target.value)}
                        />
                        <TextField
                            required
                            className='faq_textfield'
                            type="text"
                            label="500gm Rate"
                            variant="outlined"
                            value={halfRate}
                            onChange={(e) => setHalfRate(e.target.value)}
                        />
                        <TextField
                            required
                            className='faq_textfield'
                            type="text"
                            label="1kg Rate"
                            variant="outlined"
                            value={fullRate}
                            onChange={(e) => setFullRate(e.target.value)}
                        />
                        </Stack>
                        <Button style={{ margin: "5px", width: "150px" }} variant="contained" color="primary" onClick={create}>
                            Add
                        </Button>
                    </form>
                </Box>
            </Modal>
            <ToastContainer />

        </div>
    )
}

export default FoodModal
