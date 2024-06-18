export interface initialType {
    matric: string,
    matN_message?: string,
    image: string,
    userImgMsg?: string,
    password: string,
    pwd_message?: string,
    postalName: string,
    postalNameMsg?: string,
    timerFrom?: string,
    timerFromMsg?: string,
    timerTo?: string,
    timerToMsg?: string,
    message?: string,
}

export interface actionType {
    type: "MATRIC_" | "NICKNAME" | "TIMER-FROM" | "TIMER-TO" | "IMAGE" | "PASSWORD" | "ALL",
    payload: string
}
