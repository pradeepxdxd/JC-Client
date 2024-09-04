import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
// import DoneAllIcon from '@mui/icons-material/DoneAll';
// import DoneIcon from '@mui/icons-material/Done';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { useDispatch } from 'react-redux';
import { clearMessages } from '../../store/message/message.slice';
import { userSelected } from '../../store/selectedUser/selectedUser.slice'
import { getUserInfo, updateSeen } from '../../store/friend/friend.slice'
import { setProfile } from '../../store/profile/profile.slice'
import { PROFILE_IMAGE } from '../../constants/avatar';
import { getUserId } from '../../utils/auth';
import { getMessages, clearChats, updateReadStataus } from '../../store/chat/chat.slice'
import { socket } from '../../configs/socket/socket';

export default function Post({ data: initialState }) {
  const uid = getUserId()
  const [typingStatus, setTypingStatus] = useState(false)
  const [data, setData] = useState(initialState);

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('friend-typing', (typingUsers) => {
      if (typingUsers.hasOwnProperty(data?._id) && typingUsers[data?._id]) {
        setTypingStatus(true)
      }
      else setTypingStatus(false)
    })

    socket.on('show-current-message', socketData => {
      if (socketData?.hasOwnProperty(data?._id)) {
        setData({
          ...data,
          lastMessage: socketData[data?._id]?.message,
          lastTime: socketData[data?._id]?.time,
          receiverStatus: 'INCOMING',
          senderId:data?._id,
        })
      }
    });

    return () => {
      socket.off('friend-typing')
      // socket.off('show-current-message')
    }
  }, [data?._id])

  const handleClick = () => {
    dispatch(setProfile({ name: data?.firstname + ' ' + data?.lastname, image: data?.profileImage }))
    dispatch(getUserInfo({ userId: getUserId(), friendId: data?._id }))
    dispatch(clearMessages())
    dispatch(clearChats())
    dispatch(userSelected())
    dispatch(getMessages({ senderId: getUserId(), receiverId: data?._id, chatId: data?.chatId }));
    if (!!data?.chatId) {
      dispatch(updateReadStataus(data?.chatId))
    }
    dispatch(updateSeen(data?._id))
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
                uid !== data?.senderId && data?.receiverStatus === "INCOMING" ?
                  (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '10px' }}>
                      <Typography
                        variant="body2"
                        sx={{ color: !data.unread ? '#d2d3d2' : '#5ccda6', paddingRight: 2 }}
                      >
                        {data.lastTime}
                      </Typography>
                      <Box
                        sx={{
                          padding: '2px 8px',
                          marginTop: '4px', // Adjust spacing between time and badge
                        }}
                      >
                        <Brightness1Icon fontSize='0px' color='success' />
                      </Box>
                    </Box>
                  ) :
                  (
                    <Typography
                      variant="body2"
                      sx={{ color: '#d2d3d2', marginLeft: 'auto', paddingRight: 2, marginTop: '10px' }}
                    >
                      {data.lastTime}
                    </Typography>
                  )

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
            <>
              {typingStatus ? <i style={{ color: 'white' }}>Typing...</i> :
                <>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginLeft: '6px', paddingBottom: '0px', color: '#d2d3d2' }}>
                      {data.lastMessage}
                    </span>
                  </Typography>
                </>
              }
            </>
          }
        />
      </Card>
    </Grid>
  );
}

// {(data.senderId === uid && data.receiverStatus === 'READ') && <DoneAllIcon sx={{ color: '#1695de' }} />}
//                     {/* {data.clientMessageStatus === 'sent' && <DoneIcon sx={{ color: 'gray' }} />} */}
//                     {(data.senderId === uid && data.receiverStatus === 'INCOMING') && <DoneAllIcon sx={{ color: 'gray' }} />}