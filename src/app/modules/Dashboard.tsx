import { Button } from '@mui/material'
import React from 'react'

const Dashboard = () => {
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
        </div>
    )
}

export default Dashboard
