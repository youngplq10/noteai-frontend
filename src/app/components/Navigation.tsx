"use client";

import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-end">
            <Link href="/sign-up" passHref className="text-decoration-none">
                <Typography variant="h4" color="textPrimary">SIGN UP</Typography>
            </Link>
        </div>
    );
};

export default Navigation;