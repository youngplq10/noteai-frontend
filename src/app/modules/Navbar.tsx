"use client"

import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Logo from '../components/Logo'
import { getIsAuthenticated } from '../scripts/server';

const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIsAuth = async () => {
            const isAuth = await getIsAuthenticated();
            setIsLogged(isAuth);
            setIsLoading(false);
        }
        fetchIsAuth();
    }, [])

    return (
        <div className='container-lg'>
            <div className="row my-3">
                <div className="col-2">
                    <Logo isAuth={isLogged} />
                </div>
                <div className="col-10">
                    <Navigation isAuth={isLogged} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}

export default Navbar
