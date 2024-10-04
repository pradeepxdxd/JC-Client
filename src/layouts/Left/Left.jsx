import React, { useEffect, useState } from 'react'
import { Badge, Grid, Menu, MenuItem, Typography } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoComplete from '../../components/Search/CustomAutoComplete';
import PostCard from '../../components/Post/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/auth.slice'
import { handleBackDropClose, handleBackDropOpen } from '../../store/ui/backdrop/backdrop.slice';
import BackDrop from '../../animations/BackDrop';
import { getUserId } from '../../utils/auth';
import BasicModal from '../../components/Modal/Modal';
import { getUserById } from '../../store/auth/user.slice';
import Notification from '../../components/Notification/Notification';
import { clearLogger, resetProfile } from '../../store/profile/profile.slice';
import { clearState } from '../../store/friend/friend.slice';

// import AddCommentIcon from '@mui/icons-material/AddComment';
// import Tabs from '../../components/Tabs/Tabs';

export default function Left() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const [openProfile, setOpenProfile] = useState(false)
    const isMenuOpen = Boolean(anchorEl);
    const isNotificationMenuOpen = Boolean(anchorElNotification);

    const { backdrop } = useSelector(state => state.backdrop)

    const dispatch = useDispatch()

    useEffect(() => {
        let spinner;
        if (backdrop) {
            spinner = setTimeout(() => {
                dispatch(handleBackDropClose())
            }, 7000);
        }
        return () => {
            clearInterval(spinner)
        }
    }, [backdrop, dispatch])

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationMenuOpen = (event) => {
        setAnchorElNotification(event.currentTarget);
    };

    const handleProfile = () => {
        setOpenProfile(true)
        handleMenuClose()
        dispatch(getUserById(getUserId()))
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationMenuClose = () => {
        setAnchorElNotification(null);
    };

    const handleLogout = () => {
        handleMenuClose()
        dispatch(logout())
        dispatch(handleBackDropOpen())
        dispatch(resetProfile())
        dispatch(clearLogger())
        dispatch(clearState())
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="menuId"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                '& .MuiList-root': {
                    backgroundColor: '#2c343d',
                    color: '#d2d3d2'
                }
            }}
        >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Setting</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    return (
        <div>
            <Grid container m={2}>
                <Grid item xs={8}>
                    <Typography variant='h5' fontWeight={'bold'} color={'white'}>
                        Chats
                    </Typography>
                </Grid>
                <Grid onClick={handleNotificationMenuOpen} item xs={2} pl={6} sx={{
                    '@media (max-width:900px)': {
                        paddingLeft: '0px'
                    }
                }}>
                    <Badge badgeContent={4} color="error">
                        <NotificationsNoneIcon sx={{ color: 'white', cursor: 'pointer' }} />
                    </Badge>
                </Grid>
                <Grid item xs={2} onClick={handleMenuOpen} >
                    <MoreVertIcon sx={{ color: 'white', cursor: 'pointer' }} />
                </Grid>
                <Grid item xs={12} mt={2}>
                    <AutoComplete />
                </Grid>
                {/* <Grid item mt={3} xs={12}>
                    <Tabs />
                </Grid> */}
                <Grid item xs={12} mt={1}>
                    <PostCard />
                </Grid>
            </Grid>
            {renderMenu}
            <Notification anchorElNotification={anchorElNotification} isNotificationMenuOpen={isNotificationMenuOpen} handleNotificationMenuClose={handleNotificationMenuClose} />
            <BackDrop />
            <BasicModal openProfile={openProfile} setOpenProfile={setOpenProfile} />
        </div>
    )
}
