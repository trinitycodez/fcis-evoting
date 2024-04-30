export interface initialType {
    matric: string,
    matN_message?: string,
    image: string,
    userImgMsg?: string,
    password: string,
    pwd_message?: string,
    postalName: string,
    postalNameMsg?: string,
    message?: string,
}

export interface actionType {
    type: "MATRIC_" | "NICKNAME" | "IMAGE" | "PASSWORD" | "ALL",
    payload: string
}
