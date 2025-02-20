"use server"

import axios from "axios"
import { setAuthToken } from "./server"

export const createUser = async (username: string, email: string, password: string, newsletter: boolean) : Promise<boolean> => {
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

        if (res.data !== "Failed") {
            setAuthToken(res.data);
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

export const loginUser = async (username: string, password: string) : Promise<boolean> => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_API + "/public/login", {
            username: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.data !== "Failed") {
            setAuthToken(res.data);
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}