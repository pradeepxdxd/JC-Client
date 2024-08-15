import { Box, Grid, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MicIcon from '@mui/icons-material/Mic';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import TextBox from '../TextBox/TextBox';
import { useDispatch } from 'react-redux';
import { setMessages } from '../../../store/message/message.slice'
import { formatAMPM } from '../../../utils/formatTime';

export default function FooterBar() {
    const [inputText, setInputText] = useState('')

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSendClick = e => {
        if (inputText !== '') {
            dispatch(setMessages({ message: inputText, time: formatAMPM() }))
            setInputText('')
        }
    }

    const isTyping = useMemo(() => {
        if (inputText === '') return false;
        else return true
    }, [inputText])

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100vw',
                zIndex: 1100, // Ensure it's above other elements
            }}
        >
            <AppBar position="static" sx={{ bgcolor: '#2c343d' }}>

                <Toolbar>
                    <Grid container spacing={1}>
                        <Grid item xs={0} mt={2}>
                            <SentimentVerySatisfiedIcon sx={{ color: '#7e8686', cursor: 'pointer' }} />
                        </Grid>
                        <Grid item xs={0} ml={3} mt={2}>
                            <AddIcon sx={{ color: '#7e8686', cursor: 'pointer' }} />
                        </Grid>
                        <Grid item xs={6.5}>
                            <TextBox inputText={inputText} handleChange={handleChange} />
                        </Grid>
                        <Grid item xs={0} mt={2} ml={5}>
                            {
                                isTyping ? <div onClick={handleSendClick}><SendIcon sx={{ color: '#7e8686', cursor: 'pointer' }} /></div> :
                                    <MicIcon sx={{ color: '#7e8686', cursor: 'pointer' }} />
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
