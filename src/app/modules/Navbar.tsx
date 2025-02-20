import React from 'react'
import Navigation from '../components/Navigation'
import Logo from '../components/Logo'

const Navbar = () => {
    return (
        <div className='container-lg'>
            <div className="row my-3">
                <div className="col-2">
                    <Logo />
                </div>
                <div className="col-10">
                    <Navigation />
                </div>
            </div>
        </div>
    )
}

export default Navbar
