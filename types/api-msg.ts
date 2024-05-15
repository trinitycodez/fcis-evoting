export interface APIMsg {
    status: number,
    Session: {
        messages: {
            ID: string,
            Statement: string,
            MessageDate: string,
        }[],
    }
}

export enum DAYS {
    'Sun',  'Mon',    'Tue',    'Wed',    'Thu',    'Fri',    'Sat'
}

export enum MONTHS {
    'Jan',    'Feb',     'Mar',     'Apr',     'May',     'Jun',     'Jul',     'Aug',     'Sep',     'Oct',     'Nov',     'Dec'
}
