import React from 'react';
import Left from './Left/Left';
import Right from './Right/Right';
import { Grid } from '@mui/material';
import WhatsAppBgChatImage from '../assets/chat/whatsapp-bg-image.jpg'

export default function Layout() {
   return (
      <>
         <Grid
            container
            height={'100vh'}
            width={'100%'}  // Change from 100vw to 100%
            spacing={0}  // Ensure spacing doesn't add extra width
            sx={{
               overflow: 'hidden',  // Hide overflow on the container
               boxSizing: 'border-box',
            }}
         >
            <Grid
               item
               sm={5}
               md={5}
               lg={5}
               xl={4}
               bgcolor={'#111b21'}
               sx={{
                  height: '100%',  // Ensure the grid item takes full height
                  overflow: 'hidden',  // Hide overflow within the item
                  boxSizing: 'border-box',
               }}
            >
               <Left />
            </Grid>
            <Grid
               item
               xs={12}
               sm={7}
               md={7}
               lg={7}
               xl={8}
               bgcolor={'#2c343d'}
               sx={{
                  display: {
                     xs: 'none',
                     sm: 'block',
                  },
                  height: '100%',  // Ensure the grid item takes full height
                  overflow: 'hidden',  // Hide overflow within the item
                  margin: 0,
                  padding: 0,
                  boxSizing: 'border-box',
                  backgroundImage: `url(${WhatsAppBgChatImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
               }}
            >
               <Right />
            </Grid>
         </Grid>
      </>
   );
}
