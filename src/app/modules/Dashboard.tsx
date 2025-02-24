"use client"

import { Button, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { user } from '../scripts/interfaces'
import { getUserData } from '../scripts/apicalls';
import NoteCard from '../components/NoteCard';
import Loading from '../components/Loading';

const Dashboard = () => {
    const [user, setUser] = useState<user>();
    const [loadingNotes, setLoadingNotes] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await getUserData();
            setUser(res);
            setLoadingNotes(false);
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
                { loadingNotes ? (
                    <div className="col-12 my-3" style={{ minHeight: 200 }}>
                        <Loading />
                    </div>
                ) : (
                    user?.notes.map((note, index) => (
                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3" key={index}>
                            <NoteCard tags={note.tags} content={note.content} link={note.link} />
                        </div>
                    ))
                ) }
            </div>
        </div>
    )
}

export default Dashboard
