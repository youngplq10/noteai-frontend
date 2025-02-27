"use client"

import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tag } from '@/app/scripts/interfaces'
import { createTag, fetchTagsAllTagsByUsername, removeTagByName } from '@/app/scripts/apicalls'
import Loading from '../components/Loading'

const CreateTagSection = () => {
    const [tags, setTags] = useState<tag[]>([]);
    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            const tags = await fetchTagsAllTagsByUsername();
            setTags(tags);
            setLoading(false);
        }
        fetchTags()
    }, [])

    const handleDeleteTag = async (name: string) => {
        await removeTagByName(name);
        const updatedTags = tags.filter(tag => tag.name !== name);
        setTags(updatedTags);
    }

    const handleCreateTag = async () => {
        const newTag = await createTag(name);
        setTags([...tags, newTag]);
        setName("");
    }

    return (
        <div className='container-lg my-5'>
            <div className="row my-5">
                <Typography variant='h5' className='my-2'>Already existing tags:</Typography>
                { loading ? (
                    <Box width={200} height={40} display="flex"><Loading /></Box>
                ) : (
                    <Stack direction="row" spacing={1}>
                        { tags.map((tag, index) => (
                            <Chip key={index} label={tag.name} color="primary" variant="outlined" onDelete={() => handleDeleteTag(tag.name)} />
                        )) }
                    </Stack>
                ) }
            </div>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6 col-xl-4">
                    <form>
                        <label htmlFor='name' className='form-label'><Typography variant='body1' color='textPrimary'>Name of tag</Typography></label>
                        <input type='text' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} />

                        <Button variant='contained' className='my-2' onClick={handleCreateTag}>Create tag</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTagSection
