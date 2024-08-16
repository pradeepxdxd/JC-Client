import React from 'react'
import { Grid, Typography } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Search from '../../components/Search/Search';
import Tabs from '../../components/Tabs/Tabs';
import PostCard from '../../components/Post/PostCard';
import { useDispatch } from 'react-redux';
import { handleSnackbarClick } from '../../store/ui/snakebar/snakebar.slice'

export default function Left() {
    const dispatch = useDispatch()

    const handleWorking = () => {
        dispatch(handleSnackbarClick())
    }

    return (
        <div>
            <Grid container m={2}>
                <Grid item xs={8}>
                    <Typography variant='h5' fontWeight={'bold'} color={'white'}>
                        Chats
                    </Typography>
                </Grid>
                <Grid onClick={handleWorking} item xs={2} pl={6} sx={{
                    '@media (max-width:900px)': {
                        paddingLeft: '0px'
                    }
                }}>
                    <AddCommentIcon sx={{ color: 'white', cursor: 'pointer' }} />
                </Grid>
                <Grid item xs={2} onClick={handleWorking} >
                    <MoreVertIcon sx={{ color: 'white', cursor: 'pointer' }} />
                </Grid>
                <Grid item xs={12} mt={2}>
                    <Search />
                </Grid>
                <Grid item m={1} xs={12}>
                    <Tabs />
                </Grid>
                <Grid item xs={12} mt={1}>
                    <PostCard />
                </Grid>
            </Grid>
        </div>
    )
}
