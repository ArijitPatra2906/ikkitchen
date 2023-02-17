import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, TextField } from '@mui/material';
import "./Category.css"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';

function FaqModal({ open, handleClose, }) {
    const [question, setQuestion] = useState("")
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("_token"))
            navigate("/")
    }, [navigate])
    const create = async () => {
        if (!question || !pic) {
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
                "https://jeevmokshayogaadminportal.herokuapp.com/api/faq",
                { question, pic },
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
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <br />
                        <input type="file"
                            onChange={(e) => postDetails(e.target.files[0])}
                            style={{ margin: "5px",width:"400px" }}
                        />
                        <br />
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

export default FaqModal
