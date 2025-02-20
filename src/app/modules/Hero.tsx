import { Button, Typography } from '@mui/material'
import React from 'react'

const Hero = () => {
    return (
        <div className='container-lg my-5 pt-5'>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6 col-lg-6 text-center">
                    <Typography variant='h2' color='textPrimary'>
                        Unleash Your Thoughts with AI-Powered Notes
                    </Typography>
                </div>
            </div>
            <div className="row justify-content-center my-2">
                <div className="col-10 col-md-6 col-lg-6 text-center">
                    <Typography variant='h5' color='textPrimary'>
                        Stay organized, capture ideas, and boost productivity with NotesAI — your intelligent assistant for seamless note-taking.
                    </Typography>
                </div>
            </div>
            <div className="row justify-content-center my-2">
                <div className="col-10 col-md-8 col-lg-6 text-center">
                    <Button variant='contained' className='mx-2' href='/sign-up'>Create account</Button>
                    <Button variant='outlined' className='mx-2' href='/log-in'>Log in</Button>
                </div>
            </div>
        </div>
    )
}

export default Hero
