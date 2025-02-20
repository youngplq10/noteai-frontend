import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <div className='flex'>
            <Link href="/" className='text-decoration-none'><Typography variant='h4' color='textPrimary'>NoteAI</Typography></Link>
        </div>
    )
}

export default Logo
