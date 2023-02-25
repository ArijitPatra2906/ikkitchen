import React, { useEffect, useState } from 'react'
import "./Contact.css"
import { Box, Grid, Typography } from '@mui/material'
import axios from "axios"
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';


const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
    editable: false,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 180,
    editable: false,
  },
  {
    field: 'message',
    headerName: 'Message',
    width: 400,
    editable: false,

  },
];

function Contact() {

  const [contact, setContact] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userInfo"))
      navigate("/")
  }, [navigate])
  useEffect(() => {
    const getContact = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BASEURL}/api/contact`);
      setContact(result.data);
      console.log(contact)
    };
    getContact()
  }, [contact])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid className='contact_container' item xs={12}>
          <Typography fontSize="26px" mt={4} pb={3} fontWeight="700">Contact List</Typography>
          <Box sx={{ height: 400, width: '90%', margin: "0 auto" }}>
            <DataGrid
              rows={contact}
              columns={columns}
              getRowId={(row) => row.name + row.phone}
              pageSize={5}
              requiredHeight={200}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
            />

          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact
