import * as React from 'react';
import List from '@mui/material/List';
import { Menu } from '@mui/material'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { notification } from '../../db/notification/notification'
import { handleSnackbarClick } from '../../store/ui/snakebar/snakebar.slice';
import { useDispatch } from 'react-redux';

export default function Notification({ anchorElNotification, isNotificationMenuOpen, handleNotificationMenuClose }) {
    const dispatch = useDispatch()
    return (
        <>
            <Menu
                anchorEl={anchorElNotification}
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
                open={isNotificationMenuOpen}
                onClose={handleNotificationMenuClose}
                sx={{
                    '& .MuiList-root': {
                        backgroundColor: '#2c343d',
                        color: '#d2d3d2',
                    },
                    '& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
                        bgcolor: '#2c343d'
                    }
                }}
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <Typography ml={3} variant='h6'>Notifications</Typography>
                    {
                        Array.isArray(notification) && notification?.length > 0 && notification?.map((notify, index) =>
                            <>
                                <ListItem key={index} alignItems="flex-start" sx={{ cursor: 'pointer' }} onClick={() => {
                                    dispatch(handleSnackbarClick())
                                    handleNotificationMenuClose()
                                }}>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={notify?.profileImage} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body1" sx={{ color: '#CFCFCF' }}>
                                                    {notify?.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#CFCFCF' }}>
                                                    {notify?.time}
                                                </Typography>
                                            </div>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: '#CFCFCF', display: 'inline' }}
                                                >
                                                    {notify?.type}{' '}-{' '}<span style={{ color: 'white' }}>{notify?.message}</span>
                                                </Typography>

                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    }
                </List>
            </Menu>
        </>
    )
}
