"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getNotesByTag, getUserData } from '@/app/scripts/apicalls';
import { tag, user } from '@/app/scripts/interfaces'
import { Chip, Link, Stack } from '@mui/material';
import Loading from '@/app/components/Loading';
import NoteCard from '@/app/components/NoteCard';

const FindByTag = () => {

    const params = useParams();
    const { name } = params;

    const [user, setUser] = useState<user>();
    const [loadingNotes, setLoadingNotes] = useState(true);

    const [tag, setTag] = useState<tag>();

    useEffect(() => {
        const fetchUserData = async () => {
            const resUser = await getUserData();
            setUser(resUser);

            if (typeof name === "string") {
                const resTag = await getNotesByTag(name);
                setTag(resTag)
            } else {
                const resTag = await getNotesByTag(name[0]);
                setTag(resTag)
            }
            
            setLoadingNotes(false);
        }
        fetchUserData();
    }, [])
    
    return (
        <div className='container-lg my-5'>
            <div className="row my-2">
                { loadingNotes ? (
                    <></>
                ) : (
                    <Stack direction="row" spacing={1}>
                        { user?.tags !== null && user?.tags !== undefined ? (
                            user?.tags.map((tag, index) => (
                                <Link key={index} href={"/dashboard/tag/" + tag.name}>
                                    <Chip label={tag.name} color="primary" variant="outlined" className='mt-1' />
                                </Link>
                            )) 
                        ) : (
                            <></>
                        ) }
                    </Stack>
                ) }
            </div>

            <div className="row my-2">
                { loadingNotes ? (
                    <div className="col-12 my-3" style={{ minHeight: 200 }}>
                        <Loading />
                    </div>
                ) : (
                    tag?.notes.map((note, index) => (
                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3" key={index}>
                            <NoteCard tags={note.tags} content={note.content} link={note.link} />
                        </div>
                    ))
                ) }
            </div>
        </div>
    )
}

export default FindByTag
