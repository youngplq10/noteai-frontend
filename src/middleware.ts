import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

    const isAuth = req.cookies.get("isAuthenticated")?.value;
    
    //Not authenticated users trying to access only-authed content
    if (isAuth !== "true" && req.nextUrl.pathname.startsWith("/dashboard")){
        return NextResponse.redirect(new URL("/log-in", req.url));
    } 
    if (isAuth !== "true" && req.nextUrl.pathname.match("/log-out")){
        return NextResponse.redirect(new URL("/log-in", req.url));
    }

    //Authenticated users trying to access only-unauthed content
    if (isAuth === "true" && req.nextUrl.pathname.match("/log-in")){
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (isAuth === "true" && req.nextUrl.pathname.match("/sign-up")){
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
}