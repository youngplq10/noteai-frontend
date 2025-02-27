"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { note } from '@/app/scripts/interfaces';
import { deleteNote, generateSummary, getNoteByLink } from '@/app/scripts/apicalls';
import { Alert, Box, Button, Chip, Stack, Typography } from '@mui/material';
import Loading from '../components/Loading';

const NoteDetails = () => {
    const params = useParams();
    const { note_id } = params;

    const [note, setNote] = useState<note>();
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(true);

    const [generateSummaryButtonState, setGenerateSummaryButtonState] = useState(false);

    const [errorState, setErrorState] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            if (typeof note_id === "string") {
                const res = await getNoteByLink(note_id);
                setNote(res);
                setLoading(false);
            }
        }
        fetchNote()
    }, [note_id])

    const handleGenerateSummary = async () => {
        if (typeof note?.content === "string" && typeof note_id === "string") {
            setGenerateSummaryButtonState(true);
            const res = await generateSummary(note?.content, note_id);
            setSummary(res)
        }
    }

    const handleDeleteNote = async () => {
        if (typeof note?.link === "string") {
            const res = await deleteNote(note?.link);

            if (res === true) {
                window.location.href = "/dashboard";
            } else {
                setErrorState(false);
                setErrorMessage("Failed. Please try again.");
            }
        }
    }

    return (
        <div className='container-lg my-5'>
            { !loading ? (
                <>
                    <div className="row my-4">
                        <div className="col-12">
                            <Stack direction="row" spacing={1}>
                                { note?.tags.map((tag, index) => (
                                     tag === null ? (
                                        <></>
                                     ) : (
                                        <Chip key={index} label={tag.name} color="primary" variant="outlined" className='mt-1' />
                                     )
                                )) }
                            </Stack>
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12 col-md-12">
                            <Typography variant='h4' className='my-2'> Note </Typography>
                            <Typography variant='body1'> { note?.content } </Typography>
                        </div>
                    </div>
        
                    <div className="row my-4">
                        <div className="col-12 col-md-12">
                            <Typography variant='h4' className='my-2'> Summary </Typography>
                            { note?.summary === null && summary === "" ? (
                                <Button disabled={generateSummaryButtonState} variant='contained' onClick={handleGenerateSummary}>Generate summary</Button>
                            ) : (
                                note?.summary === null ? (
                                    <Typography variant='body1'>{ summary }</Typography>
                                ) : (
                                    <Typography variant='body1'>{ note?.summary }</Typography>
                                )
                            ) }
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12 ms-auto my-auto">
                            <Typography variant='h4'>Share your notes by sharing this code:</Typography>
                            <Typography variant='body1' className='text-decoration-underline'> { note?.link } </Typography>
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12">
                            <Button variant='contained' color="error" onClick={handleDeleteNote}>Delete note</Button>
                        </div>
                    </div>
                </>
                ) : (
                <>
                    <div className="row my-4">
                        <div className="col-12">
                            <Box width={100 + "%"} height={400} display="flex"><Loading /></Box>
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12">
                            <Alert severity='error' className='my-3' hidden={errorState}>{errorMessage}</Alert>
                        </div>
                    </div>
                </>
                )}
        </div>
    )
}

export default NoteDetails
