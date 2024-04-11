export interface APIVotes {
    Session: {
        year: string,
        candidates: {
            PortFolio: string,
            Names: string[],
            NumVotes: number[],
            NumVoters: number,
            NumRegVoters: number,
            Winner: string[],
            Total?: number,
        }[],
    }[],
}