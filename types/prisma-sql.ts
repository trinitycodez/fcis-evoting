"use server"
import * as bcrypt from "bcrypt"

export const saltAndHash = async (data: string) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data, salt);
    return hashedPassword;
}

export const plainTextRes = async (plainText: string, hashDB: string) => {
    const match = await bcrypt.compare(plainText, hashDB);
    return match;
}