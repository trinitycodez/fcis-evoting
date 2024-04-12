export interface initialType {
    matric: string,
    image: string,
    password: string,
    message?: string,
    pwd_message?: string,
    matN_message?: string,
}

export interface actionType {
    type: "MATRIC_" | "IMAGE" | "PASSWORD" | "ALL",
    payload: string
}
