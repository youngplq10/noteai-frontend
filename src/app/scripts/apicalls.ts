"use server"

import axios from "axios"
import { getAllCookies, setAuthToken } from "./server"
import { tag } from "./interfaces"

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

export const fetchTagsAllTagsByUsername = async () : Promise<tag[]> => {
    try {
        const { username, jwt } = await getAllCookies();

        const res = await axios.get(process.env.NEXT_PUBLIC_API + "/auth/tags/" + username?.value, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt?.value,
            }
        })

        return res.data as tag[]
    } catch {
        return []
    }
}

export const removeTagByName = async (name: string) : Promise<void> => {
    try {
        const { username, jwt } = await getAllCookies();

        await axios.delete(process.env.NEXT_PUBLIC_API + "/auth/tag/" + username?.value + "/" + name, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt?.value,
            }
        })
        
    } catch {
        throw new Error("error in deleting tag")
    }
}