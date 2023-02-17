import { Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';

function UpdateModal({ openUpdate, setOpenUpdate, handleOpenUpdate, handleCloseUpdate, cat ,getCat}) {

    const [name, setName] = useState(cat.name ?? "")
    const [pic, setPic] = useState(cat.pic ?? "");
    const [picLoading, setPicLoading] = useState(false)

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

    const updateCat = async () => {
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
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.put(
                "http://localhost:7000/api/cat/" + cat._id,
                { name, pic },
                config
            );
            console.log(data);
            // alert("Faq created successfully")
            toast.success('Category updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setOpenUpdate(false)
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

    return (
        <div>
            <Modal
                open={openUpdate}
                onClose={handleCloseUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal_main modal_cat_update' p={5}>
                    <CloseIcon onClick={handleCloseUpdate} className="modal_icon" />
                    <form >
                        <h3 className='headline' style={{ textAlign: "center", color: "black", marginTop: "-40px" }}>Update Category</h3>
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
                        <img className='updateCatImg' src={pic} alt="" />
                        <br />
                        <input type="file"
                            // value={pic}
                            onChange={(e) => postDetails(e.target.files[0])}
                            style={{ margin: "5px", width: "400px" }}
                        />
                        <br />
                        <LoadingButton loading={picLoading} style={{ margin: "5px", width: "100%" }} variant="contained" color="success" onClick={updateCat}>
                            Update
                        </LoadingButton>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default UpdateModal