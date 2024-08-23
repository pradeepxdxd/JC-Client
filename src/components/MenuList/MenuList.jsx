import { Menu, MenuItem } from '@mui/material'
import React from 'react'

export default function MenuList({ anchorEl, isMenuOpen, handleMenuClose }) {
    return (
        <>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="menuId"
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Setting</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
        </>
    )
}
