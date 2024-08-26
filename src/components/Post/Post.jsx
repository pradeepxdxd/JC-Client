import React from 'react';
import { Avatar, Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from 'react-redux';
import { clearMessages } from '../../store/message/message.slice';
import { userSelected } from '../../store/selectedUser/selectedUser.slice'
import { getUserInfo } from '../../store/friend/friend.slice'
import { setProfile } from '../../store/profile/profile.slice'
import { PROFILE_IMAGE } from '../../constants/avatar';
import { getUserId } from '../../utils/auth';

export default function Post({ data }) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setProfile({ name: data?.firstname + ' ' + data?.lastname, image: data?.profileImage }))
    dispatch(getUserInfo({ userId: getUserId(), friendId: data?._id }))
    dispatch(clearMessages())
    dispatch(userSelected())
  }

  return (
    <Grid container item xs={12} style={{ width: '100%' }}>
      <Card
        onClick={handleClick}
        sx={{
          width: '90%',
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
              src={data?.profileImage || PROFILE_IMAGE}
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
                    {/* {data.time} */}01:34 PM
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
              {data?.firstname + ' ' + data?.lastname || ''}
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              {true && <DoneAllIcon sx={{ color: '#1695de' }} />}
              {data.clientMessageStatus === 'sent' && <DoneIcon sx={{ color: 'gray' }} />}
              {data.clientMessageStatus === 'delivered' && <DoneAllIcon sx={{ color: 'gray' }} />}
              <span style={{ marginLeft: '6px', paddingBottom: '0px', color: '#d2d3d2' }}>
                {/* {data.message} */}Hii ther, I'm using whatsapp
              </span>
            </Typography>
          }
        />
      </Card>
    </Grid>
  );
}

