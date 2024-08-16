import { Grid } from '@mui/material'
import React from 'react'
import HeaderBar from './Header/Header-Bar'
import FooterBar from './Footer/Footer-Bar'
import ChatBox from './ChatBox/ChatBox'
import MessageBar from './Footer/MessageBar'

export default function Inbox() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <HeaderBar />
            <ChatBox/>
          <FooterBar />
        </Grid>
      </Grid>
    </>
  )
}
