import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Tooltip } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import WestIcon from '@mui/icons-material/West';
import { userUnselected } from '../../../store/selectedUser/selectedUser.slice';
import { handleSnackbarClick } from '../../../store/ui/snakebar/snakebar.slice'
import { getUserId } from '../../../utils/auth';
import { socket } from '../../../configs/socket/socket';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../../store/auth/user.slice'

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const { name, image } = useSelector(state => state.profileSlice)
    const { info } = useSelector(state => state.friend)
    const { user } = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getUserById(getUserId()))
    }, [dispatch])

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleVideoCall = () => {
        const roomId = [getUserId(), info?.friendId].sort().join('_')
        const call_url = `${process.env.REACT_APP_CLIENT_URL}/room/${roomId}`;
        socket.emit('join-video-call', { user1: getUserId(), user2: info?.friendId, call_url, profileImage: user?.profileImage, name: `${user?.firstname} ${user?.lastname}` })
        navigate(`/room/${roomId}`)
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleVideoCall}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={0} color="error">
                        <VideocamIcon />
                    </Badge>
                </IconButton>
                <p>Video Call</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <SearchIcon />
                    </Badge>
                </IconButton>
                <p>Search</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    // #303941
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: '#2c343d' }}>
                <Toolbar>
                    <Box onClick={() => dispatch(userUnselected())} sx={{ mr: 2, cursor: 'pointer', display: { xs: 'block', sm: 'none' } }}>
                        <WestIcon />
                    </Box>
                    <Tooltip title="Profile Details">
                        <IconButton sx={{ p: 0 }} onClick={() => dispatch(handleSnackbarClick())}>
                            <Avatar alt={`${info?.firstname}`} src={image || `${info?.profileImage}`} />
                        </IconButton>
                    </Tooltip>
                    <Typography ml={2} variant='body1' fontWeight={'bold'}>
                        {name || `${info?.firstname} ${info?.lastname}`}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    {
                        getUserId() === info?.friendId ? null :
                            <>
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleVideoCall}>
                                        <Badge color="error">
                                            <VideocamIcon sx={{ color: '#7e8686' }} />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={() => dispatch(handleSnackbarClick())}
                                    >
                                        <Badge>
                                            <SearchIcon sx={{ color: '#CFCFCF' }} />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                    >
                                        <MoreVertIcon sx={{ color: '#CFCFCF', marginRight: '32px' }} />
                                    </IconButton>
                                </Box>
                            </>
                    }
                    {
                        getUserId() !== info?.friendId &&
                        <>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </>
                    }
                </Toolbar>
            </AppBar>
            {
                getUserId() !== info?.friendId &&
                <>
                    {renderMobileMenu}
                    {renderMenu}
                </>
            }
        </Box >
    );
}

