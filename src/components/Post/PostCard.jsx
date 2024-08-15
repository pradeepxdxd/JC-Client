import React from 'react'
import { chats } from '../../data/chat'
import Post from './Post'

export default function PostCard() {
    return (
        <>
            {
                chats.map(chat => (
                    <>
                        <Post key={chat.id} data={chat} />
                    </>
                ))
            }
        </>
    )
}
