import { TextField } from '@mui/material'
import React from 'react'

export default function TextBox({inputText, handleChange}) {
    return (
        <>
            <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                fullWidth
                value={inputText}
                onChange={handleChange}
                sx={{
                    '& .MuiInputBase-input': {
                        color: '#d2d3d2',
                    },
                    '& .MuiInputBase-root': {
                        marginLeft: '25px',
                        backgroundColor: '#556c73',
                        height: '40px',
                        mt: 1
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderWidth: 0,
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderWidth: 0,
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderWidth: 0,
                            borderColor: 'white',
                        },
                    },
                }}
            />
        </>
    )
}
