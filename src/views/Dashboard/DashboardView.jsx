import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import JustChatBg from '../../assets/images/justchatbg.png'
import HttpsIcon from '@mui/icons-material/Https';

export default function DashboardView() {
  return (
    <>
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
          <img src={JustChatBg} alt="whatsapp" style={{ width: "300px" }} />
          <Box my={2}>
            <Typography variant='h4' fontWeight={'100'}>Download <span style={{ fontFamily: "'Playwrite CU', sans-serif" }}>Just Chats</span> for Windows</Typography>
          </Box>
          <Box>
            <Typography variant='body2' fontWeight={'noraml'}>Make calls, share your screen and get a faster experience when you download the Windows app.</Typography>
          </Box>
          <Box>
            <Button variant='container' sx={{
              my: '24px',
              color: 'black',
              bgcolor: '#1aac7f',
              borderRadius: '23px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#1ccd97'
              },
              fontWeight: '500'
            }}>Coming Soon for Android and IOS
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography sx={{ color: 'gray' }} variant='body2'>
          <HttpsIcon fontSize='0px' /> Your personal message are end-to-end encrypted.
        </Typography>
      </Box>
    </>
  );
}
