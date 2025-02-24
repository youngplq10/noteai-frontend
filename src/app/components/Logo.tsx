import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Logo = ({ isAuth } : { isAuth: boolean }) => {
    return (
        <div className='flex'>
            { isAuth ? (
                <Link href="/dashboard" className='text-decoration-none'><Typography variant='h4' color='textPrimary'>NoteAI</Typography></Link>
            ) : (
                <Link href="/" className='text-decoration-none'><Typography variant='h4' color='textPrimary'>NoteAI</Typography></Link>
            ) }
        </div>
    )
}

export default Logo
