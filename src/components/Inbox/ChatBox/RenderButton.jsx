import { Box, Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { sendFriendRequest, acceptFriendRequest } from '../../../store/friend/friend.slice'
import { getUserId } from '../../../utils/auth'

export default function RenderButton({ flag, info }) {
    const dispatch = useDispatch()

    const handleAddToContact = () => {
        dispatch(sendFriendRequest({ userId: getUserId(), friendId: info.friendId }));
    }

    const handleAcceptRequest = () => {
        dispatch(acceptFriendRequest({ userId: getUserId(), friendId: info.friendId }))
    }

    return (
        <>
            {
                flag === 'NO CONNECTION' && getUserId() !== info?.friendId &&
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px', // Adds space between buttons
                        marginTop: '12px' // Adds some space above the buttons
                    }}
                >
                    <Button onClick={handleAddToContact} variant="contained" sx={{ backgroundColor: '#2c343d' }}>Add To Contact</Button>
                    {/* <Button variant="contained" sx={{ backgroundColor: '#2c343d' }}>Block</Button> */}
                </Box>
            }
            {
                (flag === 'USER SIDE' && info?.accept === false && getUserId() !== info?.friendId) &&
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px', // Adds space between buttons
                        marginTop: '12px' // Adds some space above the buttons
                    }}
                >
                    <Button variant="contained" sx={{ backgroundColor: '#2c343d' }}>Added</Button>
                    {/* <Button variant="contained" sx={{ backgroundColor: '#2c343d' }}>Block</Button> */}
                </Box>
            }
            {
                (flag === 'FRIEND SIDE' && info?.accept === false && getUserId() !== info?.friendId) &&
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px', // Adds space between buttons
                        marginTop: '12px' // Adds some space above the buttons
                    }}
                >
                    <Button onClick={handleAcceptRequest} variant="contained" sx={{ backgroundColor: '#2c343d' }}>Accept</Button>
                    {/* <Button variant="contained" sx={{ backgroundColor: '#2c343d' }}>Block</Button> */}
                </Box>
            }
        </>
    )
}
