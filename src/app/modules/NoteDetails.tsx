"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { note } from '../scripts/interfaces';
import { generateSummary, getNoteByLink } from '../scripts/apicalls';
import { Button, Chip, Stack, Typography } from '@mui/material';

const NoteDetails = () => {
    const params = useParams();
    const { note_id } = params;

    const [note, setNote] = useState<note>();
    const [summary, setSummary] = useState("");

    const [generateSummaryButtonState, setGenerateSummaryButtonState] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            if (typeof note_id === "string") {
                const res = await getNoteByLink(note_id);
                setNote(res);
            }
        }
        fetchNote()
    }, [])

    const handleGenerateSummary = async () => {
        if (typeof note?.content === "string" && typeof note_id === "string") {
            setGenerateSummaryButtonState(true);
            const res = await generateSummary(note?.content, note_id);
            setSummary(res)
        }
    }

    return (
        <div className='container-lg my-5'>
            <div className="row my-2">
                <div className="col-10 col-md-6">
                    <Stack direction="row" spacing={1}>
                        { note?.tags.map((tag, index) => (
                            <Chip key={index} label={tag.name} color="primary" variant="outlined" className='mt-1' />
                        )) }
                    </Stack>
                </div>
            </div>

            <div className="row my-2">
                <div className="col-12 col-md-8">
                    <Typography variant='h4' className='my-2'> Note </Typography>
                    <Typography variant='body1'> { note?.content } </Typography>
                </div>
            </div>
 
            <div className="row my-2">
                <div className="col-12 col-md-8">
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
        </div>
    )
}

export default NoteDetails
