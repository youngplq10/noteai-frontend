"use client"

import { Alert, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { validateExistingUser, validateNewUser } from '../scripts/validation';
import Link from 'next/link';
import { loginUser } from '../scripts/apicalls';

const LogInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMesssage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const handleSubmit = async () => {
        const res = validateExistingUser(username, password);

        if (res==="Success") {
            setErrorState(true);
            const resLogin = await loginUser(username, password);
            if (resLogin === false) {
                setErrorMesssage("Failed. Please try again.");
                setErrorState(false);
            } else {
                window.location.href = "/dashboard"
            }
        }
        else {
            setErrorMesssage(res);
            setErrorState(false);
        }
    }

    return (
        <>
            <form>
                <label htmlFor='username' className='form-label'><Typography variant='body1' color='textPrimary'>Username</Typography></label>
                <input type='text' className='form-control' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor='password' className='form-label'><Typography variant='body1' color='textPrimary'>Password</Typography></label>
                <input type='password' className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </form>
            <Button variant='contained' className='my-2' onClick={handleSubmit}>Create account</Button>
            <Typography variant='body1' color='textPrimary'>You don't have an account? <Link href="/sign-up">Create one now!</Link></Typography>

            <Alert severity='error' className='my-3' hidden={errorState}>{errorMessage}</Alert>
        </>
    )
}

export default LogInForm
