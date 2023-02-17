import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Category.css"
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CategoryModal from './CategoryModal';
import { Link, useNavigate } from "react-router-dom";
import UpdateModal from './UpdateModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

function Faq() {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const [loading, setLoading] = useState(false)


    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [category, setCategory] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("_token"))
            navigate("/")
    }, [navigate])
    const [cat, setCat] = useState({})

    const getCat = async () => {
        try {
            setLoading(true)
            const result = await axios.get("http://localhost:7000/api/cat");
            setCategory(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getCat()
    }, [])

    const handle = (f) => {
        setCat(f)
        setOpenUpdate(true)
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:7000/api/cat/" + id);
            toast.success('Category deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            getCat()
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
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid className='faq_container' item xs={12}>
                    <div className="faq_top">
                        <Button color='success' onClick={handleOpen} className='btn_faq' variant="contained" endIcon={<AddIcon />}>
                            Add New Category
                        </Button>
                        <Typography fontSize="30px" mt={3} mb={3}>Category</Typography>
                    </div>
                    {loading === true ? (<div style={{ marginTop: "50px" }}>
                        <CircularProgress size={70} color="success" />
                    </div>) : (
                        <div className='categories'>
                            {category && category?.map((f) => (
                                <div className="category" >
                                    <img src={f.pic} alt="" />
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <Typography fontSize="20px" textTransform="capitalize" color="black" mt={3} mb={3}>{f.name}</Typography>
                                        <EditIcon style={{ cursor: "pointer" }} onClick={() => handle(f)} />
                                        <DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleDelete(f._id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Grid>
            </Grid>
            {open && <CategoryModal getCat={getCat} open={open} setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen} />}
            {openUpdate && <UpdateModal getCat={getCat} cat={cat} openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} handleCloseUpdate={handleCloseUpdate} handleOpenUpdate={handleOpenUpdate} />}
        </Box >
    )
}

export default Faq
