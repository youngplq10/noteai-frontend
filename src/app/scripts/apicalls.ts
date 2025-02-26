"use server"

import axios from "axios"
import { getAllCookies, setAuthToken } from "./server"
import { note, tag, user } from "@/app/scripts/interfaces"
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PRIVATE_OPENAI_API_KEY });

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

export const createTag = async (name: string) : Promise<tag> => {
    try {
        const { username, jwt } = await getAllCookies();

        const res = await axios.post(process.env.NEXT_PUBLIC_API + "/auth/tag", {
            username: username?.value,
            name: name,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + jwt?.value,
            }
        })

        console.log(res)

        return res.data as tag
    } catch {
        throw new Error("failed creating tag")
    }
}

export const createdNoteByAI = async (note: string) : Promise<string> => {
    try {
        const res = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "developer", content: "Write note about user's criterias. Maximum 200 words. Don't comment. Just give the answer" },
                { role: "user", content: note },
            ],
            store: false,
        })

        if (typeof res.choices[0].message.content === "string") {
            return res.choices[0].message.content
        } else {
            return "Failed. Please try again."
        }
    } catch {
        return "Failed. Please try again."
    }
}

export const generateSummary = async (note: string, link: string) : Promise<string> => {
    try {
        const { jwt } = await getAllCookies();

        const res = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {role: "developer", content: "Write summary of this note. Give just summary. No comments. Short the note at least about a half."},
                {role: "user", content: note},
            ],
            store: false,
        })

        if (typeof res.choices[0].message.content === "string") {

            const formData = new FormData();
            formData.append("link", link);
            formData.append("summary", res.choices[0].message.content)

            await axios.post(process.env.NEXT_PUBLIC_API + "/auth/note/summary", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + jwt?.value,
                }
            })

            return res.choices[0].message.content
        } else {
            return "Failed. Please try again."
        }
    } catch {
        return "Failed. Please try again."
    }
}

export const saveNote = async (content: string, tags: string[]) : Promise<string> => {
    try {
        const { username, jwt } = await getAllCookies();

        const res = await axios.post(process.env.NEXT_PUBLIC_API + "/auth/note", {
            username: username?.value,
            content: content,
            tags: tags
        }, {
            headers: {
                'Authorization': 'Bearer ' + jwt?.value,
            }
        })

        return res.data
    } catch {
        throw new Error("failed saving note")
    }
}

export const getNoteByLink = async (link: string) : Promise<note> => {
    try {
        const { jwt } = await getAllCookies();

        const res = await axios.get(process.env.NEXT_PUBLIC_API + "/auth/note/" + link, {
            headers: {
                'Authorization': 'Bearer ' + jwt?.value,
            }
        })

        return res.data as note
    } catch {
        throw new Error("error in fetching note")
    }
}

export const getUserData = async () : Promise<user> => {
    try {
        const { username, jwt } = await getAllCookies();

        const res = await axios.get(process.env.NEXT_PUBLIC_API + "/auth/user/" + username?.value, {
            headers: {
                'Authorization': 'Bearer ' + jwt?.value,
            }
        })

        console.log(res)

        return res.data as user
    } catch {
        throw new Error("error in getting user data")
    }
}

export const copyNote = async (code: string) : Promise<string> => {
    try {
        const { username, jwt } = await getAllCookies();

        const res = await axios.post(process.env.NEXT_PUBLIC_API + "/auth/note/" + code, {
            username: username?.value,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + jwt?.value,
            }
        })

        return res.data
    } catch {
        throw new Error("error in copying code")
    }
}