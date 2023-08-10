import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/users';

function Header() {
    const dispatch = useDispatch()
    const logined = useSelector((state) => state.users.loginedUserInfo)

    return (
        <AppBar position="static" color='primary' enableColorOnDark style={{ display: 'flex', justifyContent: 'center', height: '7vh' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PinterestIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <LinkContainer to={'/'}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Bet
                        </Typography>
                    </LinkContainer>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {logined.isAdmin  ?(<>
                        <LinkContainer
                            to={`score`}
                        >
                            <Button
                                variant='text'
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Score
                            </Button>
                        </LinkContainer>
                        <LinkContainer
                            to={`setting`}
                        >
                            <Button
                                variant='text'
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Setting
                            </Button>
                        </LinkContainer>
                        <LinkContainer
                            to={`users`}
                        >
                            <Button
                                variant='text'
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Users
                            </Button>
                        </LinkContainer></>):(<></>)}
                    </Box>
                    {logined ? (<>
                        <Box sx={{ flexGrow: 0 }}>
                                <Button variant='contained' color='primary' onClick={()=>dispatch(logout())}>Log out</Button>
                        </Box>
                        </>) : (<>
                        <Box sx={{ flexGrow: 0 }}>
                            <LinkContainer to={'/signin'}>
                                <Button variant='contained' color='primary'>Sign In</Button>
                            </LinkContainer>
                        </Box>
                    </>)}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;