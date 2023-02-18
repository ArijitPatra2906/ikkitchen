import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, TextField } from '@mui/material';
import "./Category.css"
import axios from 'axios';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

function FaqModal({ open, handleClose, setOpen, getCat }) {
    const [name, setName] = useState("")
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const create = async () => {
        if (!name || !pic) {
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
        console.log({ name, pic })
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.post(
                "http://localhost:7000/api/cat",
                { name, pic, userId: user._id },
                config
            );
            console.log(data);
            // alert("Faq created successfully")
            toast.success('Category created successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setOpen(false)
            getCat()
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


    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast.warning('Please select an image!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        console.log(pics);
        if (
            pics.type === "image/jpeg" ||
            pics.type === "image/jpg" ||
            pics.type === "image/png"
        ) {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "jeevmoksha");
            data.append("cloud_name", "ar1stin");
            fetch("https://api.cloudinary.com/v1_1/ar1stin/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast.warning('Please select an image!', {
                position: "top-right",
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
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal_main modal_cat' p={5}>
                    <CloseIcon onClick={handleClose} className="modal_icon" />
                    <form >
                        <h3 className='headline' style={{ textAlign: "center", color: "black", marginTop: "-40px" }}>Add new Category</h3>
                        <TextField
                            required
                            className='faq_textfield'
                            type="text"
                            label="Category Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        <input type="file"
                            onChange={(e) => postDetails(e.target.files[0])}
                            style={{ margin: "5px", width: "400px" }}
                        />
                        <br />
                        <LoadingButton loading={picLoading} style={{ margin: "5px", width: "100%" }} variant="contained" onClick={create} color='success'>
                            Add
                        </LoadingButton>
                    </form>
                </Box>
            </Modal>

        </div>
    )
}

export default FaqModal
