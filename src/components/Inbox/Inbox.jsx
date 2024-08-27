import { Grid } from '@mui/material'
import React, { useState } from 'react'
import HeaderBar from './Header/Header-Bar'
import FooterBar from './Footer/Footer-Bar'
import ChatBox from './ChatBox/ChatBox'

export default function Inbox() {
  const [chats, setChats] = useState([])
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <HeaderBar />
            <ChatBox chats={chats} setChats={setChats}/>
          <FooterBar chats={chats} setChats={setChats}/>
        </Grid>
      </Grid>
    </>
  )
}
