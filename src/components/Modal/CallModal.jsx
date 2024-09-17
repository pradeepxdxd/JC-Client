import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from 'react-router-dom';
import { PROFILE_IMAGE } from '../../constants/avatar'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "300px",
    height: "5vh",
    maxHeight: "5vh",
    bgcolor: "#111b22",
    borderRadius: "6px",
    boxShadow: "none",
    outline: "none",
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
};

export default function CallModal({ open, handleClose, handleOpen, callInfo }) {
    const navigate = useNavigate()
    const handleCall = () => {
        if (callInfo?.call_url) {
            const relativeUrl = callInfo.call_url.replace(/^.*\/\/[^\/]+/, ''); // Remove base URL if included
            navigate(relativeUrl);
        }
    }
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Avatar alt="User Avatar" src={callInfo?.profileImage || PROFILE_IMAGE} />
                        <Typography variant="body1" sx={{ color: '#fff', ml: 2 }}>
                            {callInfo?.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                            <Button sx={{ minWidth: 'auto', p: 1 }} onClick={handleClose}>
                                <CancelIcon sx={{ color: '#f44336' }} />
                            </Button>
                            <Button sx={{ minWidth: 'auto', p: 1, ml: 1 }} onClick={handleCall}>
                                <CallIcon sx={{ color: 'green' }} />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
