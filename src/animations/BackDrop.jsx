import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

export default function BackDrop() {

    const { backdrop } = useSelector(state => state.backdrop)

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </div>
    );
}
