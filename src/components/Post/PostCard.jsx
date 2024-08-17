import React from 'react'
import { chats } from '../../db/data/chat'
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
