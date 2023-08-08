import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import axios from 'axios';


function Setting() {
    const [averageValue, setAverageValue] = useState(0);

    const userInfo = useSelector((state) => state.users.loginedUserInfo)
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    useEffect(()=>{
        const fetchAverageValue = async () =>{
            const value = await axios.get('http://localhost:8000/api/admin/getAverageValue/1', config)
            .then(res => res.data                
            )
            setAverageValue(value.averageValue)
        }
        fetchAverageValue();
    },[])
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            let formObject = Object.fromEntries(data.entries())
            const averageValue = formObject.averageValue            
            const res = await axios.get(`http://localhost:8000/api/admin/setAverageValue/${averageValue}`, config)
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Setting
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={averageValue}
                        id="averageValue"
                        label="Average Value"
                        name="averageValue"
                        autoFocus
                        onChange={e=>setAverageValue(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save
                    </Button>

                </Box>
            </Box>
        </Container>
    )
}

export default Setting