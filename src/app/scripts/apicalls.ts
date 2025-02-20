"use server"

import axios from "axios"
import { setAuthToken } from "./server"

export const createUser = async (username: string, email: string, password: string, newsletter: boolean) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_API + "/public/register", {
            username: username,
            email: email,
            password: password,
            newsletter: newsletter
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setAuthToken(res.data)
    } catch {
        throw new Error("error in creating user")
    }
}

export const loginUser = async (username: string, password: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_API + "/public/login", {
            username: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setAuthToken(res.data)
    } catch {
        throw new Error("error in logging in user")
    }
}