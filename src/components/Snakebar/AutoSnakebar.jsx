import { Slide, Snackbar } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleSnackbarClose } from '../../store/ui/snakebar/snakebar.slice'

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function AutoSnakebar() {
    const { snakebarOpen : snackbarOpen, message } = useSelector(state => state.snakebarSlice)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(handleSnackbarClose())
    }

    return (
        <Snackbar
            open={snackbarOpen}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            message={message}
            key={SlideTransition.name}
            autoHideDuration={2000}
        />
    )
}
