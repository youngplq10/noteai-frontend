import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import React from 'react'

const NoteCard = () => {
    return (
        <Card variant='outlined' className='my-3'>
            <CardContent>
                <Stack direction="row" spacing={1} className='my-2'>
                    <Chip label="Math" variant='outlined' color='primary' />
                    <Chip label="Spanish" variant='outlined' color='primary' />
                </Stack>
                <Typography variant='subtitle1'>User's criteria for creating a note about math include a focus on clarity and conciseness, ensuring that complex concepts are broken down into understandable components. The note should cover fundamental mathematical principles, potentially highlighting key topics such as algebra, geometry, calculus, and statistics.</Typography>
                <Button variant="contained" href='/dashboard/note/note_id' className='my-2'>View note</Button>
            </CardContent>
        </Card>
    )
}

export default NoteCard
