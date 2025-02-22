export interface user {
    id: {
        timestamp: number,
        date: Date,
    },
    username: string,
    email: string,
    newsletter: boolean,
    createdAtDate: Date,
    notes: note[],
    tags: tag[],
}

export interface tag {
    id: {
        timestamp: number,
        date: Date,
    },
    name: string,
    user: user,
    notes: note[],
}

export interface note {
    id: {
        timestamp: number,
        date: Date,
    },
    user: user,
    content: string,
    summary: string,
    tags: tag[],
    createdAtDate: Date,
    mindMap: mindMap
}

export interface mindMap {
    id: {
        timestamp: number,
        date: Date,
    },
    note: note,
    link: string,
}