import React from 'react'
import SignUpForm from '@/app/components/SignUpForm'

const SignUpSection = () => {
    return (
        <div className='container-lg my-5'>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6 col-xl-4">
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

export default SignUpSection
