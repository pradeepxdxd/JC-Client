import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function AccountProfileIcon() {
    return (
        <AccountCircleIcon sx={{
            color: 'gray',
            mb: 4,
            fontSize: '122px',
            '@media (max-width:445px)': {
                fontSize: '80px',
            }
        }} />
    )
}
