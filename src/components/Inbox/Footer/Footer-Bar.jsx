import { Box, Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import TextBox from '../TextBox/TextBox';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../../store/message/message.slice'
import { formatAMPM, getLocalTime } from '../../../utils/formatTime';
import { socket } from '../../../configs/socket/socket';
import { getUserId } from '../../../utils/auth';
import { setChat, sendMessage } from '../../../store/chat/chat.slice'
import { updateFriendList } from '../../../store/friend/friend.slice';
import emojiData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import StopIcon from '@mui/icons-material/StopCircle';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from 'react-toastify';

export default function FooterBar() {
    const [inputText, setInputText] = useState('');
    const [showEmojies, setShowEmojies] = useState(false);

    const { info } = useSelector(state => state.friend);
    const dispatch = useDispatch();

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        startListening,
        stopListening
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        toast.error("Browser doesn't support speech recognition")
    }

    useEffect(() => {
        console.log({transcript})
        if (transcript) {
            setInputText(prev => prev + transcript);
        }
    }, [transcript]);

    useEffect(() => {
        if (!listening) {
            resetTranscript();
        }
    }, [listening, resetTranscript]);

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendClick = () => {
        const uid = getUserId();
        const time = getLocalTime();
        if (inputText !== '') {
            dispatch(setMessages({ message: inputText, time: formatAMPM() }));
            setInputText('');
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
            dispatch(setChat({ senderId: uid, message, time }));
            dispatch(sendMessage({
                senderId: uid,
                receiverId: info?.friendId,
                time,
                message
            }));
            dispatch(updateFriendList({ id: info?.friendId, message, time }));
        };
        sendMessageToSocket(inputText);
    };

    const isTyping = useMemo(() => inputText !== '', [inputText]);

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100vw',
                zIndex: 1100, // Ensure it's above other elements
            }}
        >
            {showEmojies && (
                <Picker
                    data={emojiData}
                    onEmojiSelect={(e) => setInputText(inputText + e.native)}
                    style={{ position: 'absolute', bottom: '60px', left: '10px' }}
                />
            )}
            <AppBar position="static" sx={{ bgcolor: '#2c343d' }}>
                <Toolbar>
                    <Grid container spacing={1}>
                        <Grid container alignItems="center">
                            <Grid item xs='auto'>
                                <SentimentVerySatisfiedIcon
                                    sx={{ color: '#7e8686', cursor: 'pointer' }}
                                    onClick={() => setShowEmojies(!showEmojies)}
                                />
                            </Grid>
                            <Grid item xs={10} sm={6} md={6} lg={6} xl={7}>
                                <TextBox disable={listening} inputText={inputText} handleSendClick={handleSendClick} handleChange={handleChange} />
                            </Grid>
                            <Grid item xs="auto" display="flex" justifyContent="flex-end" sx={{
                                ml: {
                                    xs: 1, // Margin-left for extra small screens
                                    sm: 1,
                                    md: 2,
                                    lg: 3,
                                    xl: 2
                                }
                            }}>
                                {
                                    isTyping ? (
                                        <SendIcon sx={{ color: '#7e8686', cursor: 'pointer' }} onClick={handleSendClick} />
                                    ) : (
                                        listening ? <StopIcon sx={{ color: '#7e8686', cursor: 'pointer' }} onClick={SpeechRecognition.stopListening} /> :
                                            <MicIcon sx={{ color: '#7e8686', cursor: 'pointer' }} onClick={SpeechRecognition.startListening} />
                                    )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
