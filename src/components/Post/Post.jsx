import React, { useState } from 'react';
import { Avatar, Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../store/profile/profile.slice';
import { clearMessages } from '../../store/message/message.slice';

export default function Post({ data }) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setProfile({ name: data.user_name, image: data.image }))
    dispatch(clearMessages())
  }
  
  return (
    <Grid container item xs={12} style={{ width: '100%' }}> {/* Ensure full width */}
      <Card
        onClick={handleClick}
        sx={{
          width: '90%', // Ensure the card fills the width
          bgcolor: '#111b21',
          cursor: 'pointer',
          '& .MuiCardHeader-avatar': {
            position: 'relative',
            marginRight: 'auto',
          },
          '& .MuiCardHeader-root:hover': {
            bgcolor: '#405156'
          }
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500], marginRight: 2 }}
              aria-label="recipe"
              src={data.image}
              alt="error"
            />
          }

          action={
            <>
              {
                !data.unread ?
                  (<Typography
                    variant="body2"
                    sx={{ color: '#d2d3d2', marginLeft: 'auto', paddingRight: 2, marginTop: '10px' }}
                  >
                    {data.time}
                  </Typography>) :
                  (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '10px' }}>
                    <Typography
                      variant="body2"
                      sx={{ color: !data.unread ? '#d2d3d2' : '#5ccda6', paddingRight: 2 }}
                    >
                      {data.time}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: '#5ccda6',
                        color: 'gray',
                        borderRadius: '12px',
                        padding: '2px 8px',
                        marginTop: '4px', // Adjust spacing between time and badge
                      }}
                    >
                      <Typography variant='caption' fontWeight={'bold'}>{data.lines}</Typography>
                    </Box>
                  </Box>)
              }
            </>
          }
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#d2d3d2',
                '@media (max-width: 1120px)': {
                  fontWeight: 'normal',
                },
                '@media (max-width: 900px)': {
                  fontSize: '15px',
                },
              }}
            >
              {data.user_name}
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              {data.clientMessageStatus === 'read' && <DoneAllIcon sx={{ color: 'blue' }} />}
              {data.clientMessageStatus === 'sent' && <DoneIcon sx={{ color: 'gray' }} />}
              {data.clientMessageStatus === 'delivered' && <DoneAllIcon sx={{ color: 'gray' }} />}
              <span style={{ marginLeft: '6px', paddingBottom: '0px', color: '#d2d3d2' }}>
                {data.message}
              </span>
            </Typography>
          }
        />
      </Card>
    </Grid>
  );
}

