"use client";

import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Loading from './Loading';

const Navigation = ({ isAuth, isLoading } : { isAuth: boolean, isLoading: boolean }) => {
    return (
        <div className="d-flex gap-3 align-items-center justify-content-end">
            { isLoading ? (
                <Box width={200} height={30} display="flex"><Loading /></Box>
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