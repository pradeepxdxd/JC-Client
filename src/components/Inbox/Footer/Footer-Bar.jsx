import { Box, Grid } from '@mui/material';
import React, { useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MicIcon from '@mui/icons-material/Mic';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import TextBox from '../TextBox/TextBox';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../../store/message/message.slice'
import { formatAMPM, getLocalTime } from '../../../utils/formatTime';
import { handleSnackbarClick } from '../../../store/ui/snakebar/snakebar.slice'
import { socket } from '../../../configs/socket/socket';
import { getUserId } from '../../../utils/auth';
import { setChat, sendMessage } from '../../../store/chat/chat.slice'
import { updateFriendList } from '../../../store/friend/friend.slice';

export default function FooterBar() {
    const [inputText, setInputText] = useState('')

    const { flag, info } = useSelector(state => state.friend)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSendClick = () => {
        const uid = getUserId()
        const time = getLocalTime()
        if (inputText !== '') {
            dispatch(setMessages({ message: inputText, time: formatAMPM() }))
            setInputText('')
        }
        const sendMessageToSocket = (message) => {
            socket.emit('private message', {
                userId1: uid,
                userId2: info?.friendId,
                message: {
                    message,
                    timestamp: time,
                    from: uid,
                },
            });
            dispatch(setChat({ senderId: uid, message, time }))
            dispatch(sendMessage({
                senderId: uid,
                receiverId: info?.friendId,
                time,
                message
            }))
            dispatch(updateFriendList({ id: info?.friendId, message, time }))
        };
        sendMessageToSocket(inputText)
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
                        <Grid item xs={0} mt={2} onClick={() => dispatch(handleSnackbarClick())}>
                            <SentimentVerySatisfiedIcon sx={{ color: '#7e8686', cursor: 'pointer' }} />
                        </Grid>
                        <Grid item xs={0} ml={3} mt={2} onClick={() => dispatch(handleSnackbarClick())}>
                            <AddIcon sx={{ color: '#7e8686', cursor: 'pointer' }} />
                        </Grid>
                        <Grid item xs={6.5}>
                            <TextBox inputText={inputText} handleSendClick={handleSendClick} handleChange={handleChange} />
                        </Grid>
                        <Grid item xs={0} mt={2} ml={5}>
                            {
                                isTyping ? <div onClick={handleSendClick}><SendIcon sx={{ color: '#7e8686', cursor: 'pointer' }} /></div> :
                                    <div onClick={() => dispatch(handleSnackbarClick())}><MicIcon sx={{ color: '#7e8686', cursor: 'pointer' }} /></div>
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

