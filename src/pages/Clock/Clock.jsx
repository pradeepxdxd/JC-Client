import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Clock() {
    const [hour, setHour] = useState()
    const [minute, setMinute] = useState()
    const [second, setSecond] = useState()
    const [am_pm, set_am_pm] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer()
        }, 0)

        return () => clearInterval(interval)
    }, [])

    const setTimer = () => {
        const date = new Date()
        const hr = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()
        let formattedHr = hr;
        let formattedmin = min;
        let formattedSec = sec;
        if (hr >= 12) {
            formattedHr = hr - 12;
            set_am_pm('PM')

            if (formattedHr.toString().length === 1) {
                formattedHr = `0${formattedHr}`;
            }
            if (formattedmin.toString().length === 1) {
                formattedmin = `0${formattedmin}`;
            }
            if (formattedSec.toString().length === 1) {
                formattedSec = `0${formattedSec}`;
            }
        }
        else {
            set_am_pm('AM')
        }
        setMinute(formattedmin)
        setSecond(formattedSec)
        setHour(formattedHr)
    }

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} minHeight={'100vh'} color={'white'}>
            <Box fontWeight={'bold'} fontSize={'3rem'} component={Typography} color={'cyan'} sx={{ fontFamily: "'Playwrite CU', sans-serif", ml: 1, mr: 1 }}>{hour}</Box>:
            <Box fontWeight={'bold'} fontSize={'2rem'} component={Typography} color={'pink'} sx={{ fontFamily: "'Playwrite CU', sans-serif", ml: 1, mr: 1 }}>{minute}</Box>:
            <Box fontWeight={'bold'} fontSize={'1.2rem'} component={Typography} color={'violet'} sx={{ fontFamily: "'Playwrite CU', sans-serif", ml: 1, mr: 1 }}>{second}</Box>
            <Box fontWeight={'bold'} fontSize={'0.8rem'} component={Typography} color={'greenyellow'} sx={{ fontFamily: "'Playwrite CU', sans-serif", ml: 1 }}>{am_pm}</Box>
        </Box>
    )
}
