export interface APIMsg {
    Session: {
        year: string,
        messages: {
            name: string,
            msg: string,
            date: string,
        }[],
    }[],
}