import React from 'react'
import LogInForm from '../components/LogInForm'

const LogInSection = () => {
    return (
        <div className='container-lg my-5'>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6 col-xl-4">
                    <LogInForm />
                </div>
            </div>
        </div>
    )
}

export default LogInSection
