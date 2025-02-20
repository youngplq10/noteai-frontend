"use client"

import { Alert, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { validateNewUser } from '../scripts/validation';
import Link from 'next/link';
import { createUser } from '../scripts/apicalls';

const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);

    const [errorMessage, setErrorMesssage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const handleSubmit = () => {
        const res = validateNewUser(username, email, password, repassword);

        if (res==="Success") {
            setErrorState(true)
            createUser(username, email, password, newsletter)
        }
        else {
            setErrorMesssage(res);
            setErrorState(false)
        }
    }

    return (
        <>
            <form>
                <label htmlFor='username' className='form-label'><Typography variant='body1' color='textPrimary'>Username</Typography></label>
                <input type='text' className='form-control' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor='email' className='form-label'><Typography variant='body1' color='textPrimary'>E-mail</Typography></label>
                <input type='text' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password' className='form-label'><Typography variant='body1' color='textPrimary'>Password</Typography></label>
                <input type='password' className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor='repassword' className='form-label'><Typography variant='body1' color='textPrimary'>Confirm Password</Typography></label>
                <input type='password' className='form-control' id='repassword' value={repassword} onChange={(e) => setRepassword(e.target.value)} />

                <label htmlFor='newsletter' className='form-label'><Typography variant='body1' color='textPrimary'>Newsletter</Typography></label>
                <input type='checkbox' id='newsletter' value="aa" className='mx-2' checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
            </form>
            <Button variant='contained' className='my-2' onClick={handleSubmit}>Create account</Button>
            <Typography variant='body1' color='textPrimary'>You already have an account? <Link href="/log-in">Log in now!</Link></Typography>

            <Alert severity='error' className='my-3' hidden={errorState}>{errorMessage}</Alert>
        </>
    )
}

export default SignUpForm
