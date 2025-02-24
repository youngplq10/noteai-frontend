"use client";

import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Navigation = ({ isAuth, isLoading } : { isAuth: boolean, isLoading: boolean }) => {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-end">
            { isLoading ? (
                <Typography variant="h4" color="textPrimary">loading</Typography>
            ) : (
                isAuth ? (
                    <Stack direction="row" gap={2}>
                        <Link href="/dashboard" passHref className="text-decoration-none">
                            <Typography variant="h4" color="textPrimary">DASHBOARD</Typography>
                        </Link>
                        <Link href="/log-out" passHref className="text-decoration-none">
                            <Typography variant="h4" color="textPrimary">LOGOUT</Typography>
                        </Link>
                    </Stack>
                ) : (
                    <Link href="/sign-up" passHref className="text-decoration-none">
                        <Typography variant="h4" color="textPrimary">SIGN UP</Typography>
                    </Link>
                )
            ) }
        </div>
    );
};

export default Navigation;