import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom'
import { useRef, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import * as XLSX from 'xlsx';

const defaultTheme = createTheme();

// const Item = forwardRef((props, ref) => {
//     return <input {...props} ref={ref} >MyItem</input>
// })

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Users() {
    const itemRef = useRef(null);
    const [accounts, setAccounts] = React.useState([])
    const [accountsdata, setAccountsdata] = React.useState([])

    const userInfo = useSelector((state) => state.users.loginedUserInfo)
    var config;
    const navigate = useNavigate()
    if (userInfo) {
        config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    }
    else {
        navigate('/signin')
    }

    const addAccount = () => {
        const addAccounts = async () => {
            const response = await axios.post('http://localhost:8000/api/admin/addAccounts/', {
                accountsdata
            }, config).then(res => {
                const aaa = res.data
                //console.log(aaa)
                setAccounts(aaa)
                setAccountsdata([])
            })
                .catch(error => console.log(error));
        }
        addAccounts();
    }

    const saveAccount = () => {
        const saveAccounts = async () => {
            const response = await axios.post('http://localhost:8000/api/admin/setAccounts/', {
                accountsdata
            }, config).then(res => {
                const aaa = res.data
                //console.log(aaa)
                setAccounts(aaa)
                setAccountsdata([])
            })
                .catch(error => console.log(error));
        }
        saveAccounts();
    }
    useEffect(() => {
        const fetchAverageValue = async () => {
            const res = await axios.get('http://localhost:8000/api/admin/getAccounts/', config).then(res => {
                const aaa = res.data
                setAccounts(aaa)
            });
        }
        fetchAverageValue();
    }, [])

    const loadXlsx = async (e) => {
        try {
            e.preventDefault();
            if (e.target.files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);
                    setAccountsdata(json)
                    //console.log(json);
                };
                reader.readAsArrayBuffer(e.target.files[0]);
            }
        }
        catch (error) {
            console.log(error)
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg" className='mt-3'>
                <CssBaseline />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6}>
                        <Item>
                            <Typography component="h2" variant="h5" className='mt-5 mb-3'>
                                Current Accounts
                            </Typography>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Telegram</th>
                                        <th scope="col">PhoneNumber</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((account, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{account.name}</td>
                                            <td>{account.telegram}</td>
                                            <td>{account.phonenumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>

                            <Typography component="h1" variant="h5" className='mt-5 mb-3'>
                                Import Accounts
                            </Typography>

                            <Button variant='contained' onClick={() => itemRef.current.click()}>
                                Import File
                                <input onChange={loadXlsx} ref={itemRef} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden />
                            </Button>
                            {accountsdata.length > 0 ? (<>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Telegram</th>
                                            <th scope="col">PhoneNumber</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accountsdata.map((account, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index}</th>
                                                <td>{account.Name}</td>
                                                <td>{account.Telegram}</td>
                                                <td>{account.Phonenumber}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Stack spacing={2} direction="row" justifyContent="center">
                                    <Button variant='contained' color='success' onClick={saveAccount}>Save</Button>
                                    <Button variant='contained' color='info' onClick={addAccount}>Add</Button>
                                </Stack>
                            </>) : (<></>)}
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}