import React, { useEffect } from 'react'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendList } from '../../store/friend/friend.slice'
import { getUserId } from '../../utils/auth'
import './PostCard.css'

export default function PostCard() {
    const { friendList } = useSelector(state => state.friend)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendList(getUserId()))
    }, [dispatch])

    return (
        <>
            <div className='post-card-container'
            // style={{
            //     height: 'calc(100vh - 20px)', // Adjust height to fit within the viewport minus any padding or margins
            //     overflowY: 'auto',
            //     paddingBottom: '18px', // You can adjust this as necessary
            // }}
            >
                {
                    friendList && friendList?.length > 0 && friendList?.map(chat =>
                        <>
                            <Post key={chat.friendId} data={chat} />
                        </>
                    )
                }
            </div>
        </>
    )
}
