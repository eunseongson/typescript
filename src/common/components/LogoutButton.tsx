import { Button } from '@mui/material'
import React from 'react'

const LogoutButton = () => {
    const logout = () => {
        localStorage.removeItem('access_token');
        window.location.reload();
    }
    return (
        <Button variant="contained" color="secondary" size="large" onClick={logout}>
            Logout
        </Button>
    )
}

export default LogoutButton