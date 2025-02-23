"use client"

import { Alert, Button, Chip, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tag } from '../scripts/interfaces';
import { createdNoteByAI, fetchTagsAllTagsByUsername, saveNote } from '../scripts/apicalls';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CreateNoteSection = () => {
    const [note, setNote] = useState("");
    const [usersTags, setUsersTags] = useState<tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<tag[]>([]);
    const [used, setUsed] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(true);

    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        const fetchUsersTags = async () => {
            const res = await fetchTagsAllTagsByUsername();

            setUsersTags(res);
        }
        fetchUsersTags();
    }, [])

    const handleAddTag = (name: string) => {
        const tag = usersTags.find(tag => tag.name === name);
        if (tag) {
            setSelectedTags([...selectedTags, tag]);

            const updatedUsersTags = usersTags.filter(tag => tag.name !== name);
            setUsersTags(updatedUsersTags);
        }
    }

    const handleRemoveTag = (name: string) => {
        const tag = selectedTags.find(tag => tag.name === name);
        if (tag) {
            setUsersTags([...usersTags, tag]);

            const updatedSelectedTags = selectedTags.filter(tag => tag.name !== name);
            setSelectedTags(updatedSelectedTags);
        }
    }

    const handleCreateNoteByAI = async () => {
        if (!used) {
            if (note.length < 10) {
                setErrorMessage("Minimum length of note to ask AI for help is 10 characters.");
                setErrorState(false);
            } else {
                setLoadingState(true);
                const res = await createdNoteByAI(note);
                setNote(res);
                setUsed(true);
                setLoadingState(false);
            }
        } else {
            setErrorMessage("You already generated note by AI.");
            setErrorState(false);
        }
    }

    const handleSaveNote = async () => {
        if (note.length < 2) {
            setErrorMessage("Minimum length of note to ask AI for help is 2 characters.");
            setErrorState(false);
        } else {
            const link = await saveNote(note, selectedTags.map((tag) => tag.name))
            window.location.href = "/dashboard/note/" + link
        }
    }

    return (
        <div className='container-lg my-5'>
            <div className="row justify-content-center">
                <div className="col-10 col-md-8 col-xl-6">
                    <form>
                        <textarea disabled={loadingState} placeholder='Write your note / Write what do you want to be your note about?' className='form-control' id='note' style={{ resize: "none" }} value={loadingState ? "Loading..." : note} onChange={(e) => setNote(e.target.value)} rows={8} />
                        
                        <Typography variant='h6' className='mt-2'>Select tags:</Typography>
                        <Stack direction="row" spacing={1}>
                            { usersTags.map((tag, index) => (
                                <Chip key={index} label={tag.name} color="primary" variant="outlined" className='mt-1' deleteIcon={<AddIcon />} onDelete={() => handleAddTag(tag.name)} />
                            )) }
                        </Stack>

                        <Typography variant='h6' className='mt-2'>Selected tags:</Typography>
                        <Stack direction="row" spacing={1}>
                            { selectedTags.map((tag, index) => (
                                <Chip key={index} label={tag.name} color="primary" variant="outlined" className='mt-1' deleteIcon={<RemoveIcon />} onDelete={() => handleRemoveTag(tag.name)} />
                            )) }
                        </Stack>

                        <Button variant='contained' className='my-2 me-2' onClick={handleSaveNote}>Save note</Button>
                        <Button variant='contained' className='my-2 me-2' onClick={handleCreateNoteByAI}>Create note by AI</Button>

                        <Alert severity='error' className='my-3' hidden={errorState}>{errorMessage}</Alert>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNoteSection
