"use client"

import { Button, Typography } from '@mui/material'
import React from 'react'
import { logout } from '../scripts/server'

const LogoutSection = () => {
    const handleLogout = () => {
        logout();
        window.location.href = "/"
    }

    return (
        <div className='container-lg my-5 py-5'>
            <div className="row text-center justify-content-center">
                <div className="col-auto">
                    <Typography variant='h4' color='textPrimary'>Are you sure you want to log out?</Typography>
                </div>
            </div>
            <div className="row text-center justify-content-center">
                <div className="col-auto">
                    <Button variant='contained' className='my-2' onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default LogoutSection
