import { Box, LinearProgress, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import HttpsIcon from '@mui/icons-material/Https';
import JustChatsLogo from '../../assets/images/justchats-glow-bg.png'

export default function Loading() {
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh', // Set full viewport height to center vertically
            }}
        >
            <Box
                sx={{
                    color: '#eaeaea ',
                    width: '70%',
                    display: 'flex', // Make inner Box a flex container
                    justifyContent: 'center', // Center content horizontally
                    alignItems: 'center', // Center content vertically
                    height: '200px', // Optional: Set a fixed height for the inner Box
                    textAlign: 'center', // Ensure text is centered
                    flexDirection: 'column',
                }}
            >
                <img src={JustChatsLogo} alt="error" width={100} height={100} style={{ borderRadius: 50 }} />
                <Box sx={{ width: '30%', my: 5, '@media (max-width:600px)': { width: '100%' } }}>
                    <LinearProgress color='success' variant="determinate" value={progress} />
                </Box>
                <Box>
                    <Typography variant='h5' fontWeight={'bold'} color={'gray'} sx={{ fontFamily: "'Playwrite CU', sans-serif" }}>Just Chats ❤️</Typography>
                </Box>
                <Typography sx={{ color: 'gray', mt: 4 }} variant='body2'>
                    <HttpsIcon fontSize='0px' />{' '}End-to-end encrypted.
                </Typography>
                <Typography sx={{ color: 'gray', mt: 1 }} variant='body1'>
                    You are using Guest Mode
                </Typography>
            </Box>
        </Box>
    )
}
