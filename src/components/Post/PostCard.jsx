import React from 'react'
import { chats } from '../../db/data/chat'
import Post from './Post'

export default function PostCard() {
    return (
        <>
            <div style={{
                height: 'calc(100vh - 20px)', // Adjust height to fit within the viewport minus any padding or margins
                overflowY: 'auto',
                paddingBottom: '18px', // You can adjust this as necessary
            }}>
                {
                    chats.map(chat => (
                        <>
                            <Post key={chat.id} data={chat} />
                        </>
                    ))
                }
            </div>
        </>
    )
}
