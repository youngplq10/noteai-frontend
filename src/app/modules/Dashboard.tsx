"use client"

import { Button, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { user } from '../scripts/interfaces'
import { getUserData } from '../scripts/apicalls';
import NoteCard from '../components/NoteCard';

const Dashboard = () => {
    const [user, setUser] = useState<user>();

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await getUserData();
            setUser(res);
            console.log(res);
        }
        fetchUserData();
    }, [])

    return (
        <div className='container-lg my-5'>
            <div className="row">
                <div className="col-auto my-2">
                    <Button variant='contained' href='/dashboard/create-note'>Create note</Button>
                </div>
                <div className="col-auto my-2">
                    <Button variant='contained' href='/dashboard/create-tag'>Create tag</Button>
                </div>
                <div className="col-12 col-md-auto ms-auto d-flex gap-2 my-2">
                    <input type='text' placeholder='Enter note code' className='form-control' />
                    <Button variant='contained'>Submit</Button>
                </div>
            </div>

            <div className="row">
                <div className="col-3">
                    <NoteCard />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
