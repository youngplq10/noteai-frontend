import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { tag } from '@/app/scripts/interfaces'
import Link from 'next/link'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'

const NoteCard = ({ tags, content, link } : { tags: tag[], content: string, link: string }) => {
    return (
        <Link href={'/dashboard/note/' + link} className='text-decoration-none'>
            <Card variant='outlined' className='my-3' style={{ height: 200 }}>
                <CardContent>
                    <Stack direction="row" spacing={1} className='my-2'>
                        { tags.length > 0 && tags[0] !== null ? (
                            tags.map((tag, index) => (
                                <Chip label={tag.name} variant='outlined' color='primary' key={index} />
                            ))
                        ) : (
                            <></>
                        ) }
                    </Stack>
                    <Typography variant='subtitle1'>{ content.length < 200 ? (
                        <FroalaEditorView model={content} />
                    ) : (
                        <FroalaEditorView model={content.slice(0, 200) + "..."} />
                    ) }</Typography>
                    
                </CardContent>
            </Card>
        </Link>
    )
}

export default NoteCard
