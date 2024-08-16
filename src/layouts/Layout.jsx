import React from 'react';
import Left from './Left/Left';
import Right from './Right/Right';
import { Grid } from '@mui/material';
import WhatsAppBgChatImage from '../assets/chat/whatsapp-bg-image.jpg'
import AutoSnakebar from '../components/Snakebar/AutoSnakebar';
import { useSelector } from 'react-redux';

export default function Layout() {
   const { selected } = useSelector(state => state.selectedUserSlice)

   return (
      <>
         <Grid
            container
            height={'100vh'}
            width={'100%'} // Ensure full width
            spacing={0} // Remove spacing between items
            sx={{
               overflow: 'hidden',
               boxSizing: 'border-box',
            }}
         >
            {/* Left Panel */}
            <Grid
               item
               xs={selected ? 0 : 12} // Hide on xs if selected, full width otherwise
               sm={5} // Show on sm and larger
               md={5}
               lg={5}
               xl={4}
               bgcolor={'#111b21'}
               sx={{
                  height: '100%',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  display: { xs: selected ? 'none' : 'block', sm: 'block' }, // Conditional display for xs
               }}
            >
               <Left />
            </Grid>

            {/* Right Panel */}
            <Grid
               item
               xs={selected ? 12 : 0} // Full width on xs if selected
               sm={7} // Show on sm and larger
               md={7}
               lg={7}
               xl={8}
               bgcolor={'#2c343d'}
               sx={{
                  display: { xs: selected ? 'block' : 'none', sm: 'block' }, // Conditional display for xs
                  height: '100%',
                  overflow: 'hidden',
                  margin: 0,
                  padding: 0,
                  boxSizing: 'border-box',
                  backgroundImage: `url(${WhatsAppBgChatImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
               }}
            >
               <Right />
            </Grid>

            <AutoSnakebar />
         </Grid>
      </>
   );
}
