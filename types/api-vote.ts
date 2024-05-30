export interface APIVotes {
    Session: {
        year: string,
        candidates: {
            PortFolio: string,
            Names: string[],
            Votes: number[],
            NumVoters: number,
            NumRegVoters: number,
            Position: string[],
            Total?: number,
        }[],
    }[],
}

export enum POSITIONS {
    "Assistant General Secretary",
    "Financial Secretary",
    "General Secretary",
    "President",
    "Public Relations Officer",
    "Social Secretary",
    "Software Director",
    "Sport Director",
    "Vice President",
    "Welfare Secretary",
}