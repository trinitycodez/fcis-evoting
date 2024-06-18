import { z } from 'zod'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const SignupFormSchema = z.object({
    matricNum: z
        .string()
        .min(8, { message: 'Be at least 8 characters long.' })
        .regex(/^[0-9]{2}(?:\/[0-9]{2}[a-z\d]+)+$/i, { message: " Characters should follow this sequence, example: 19/52HL001" })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .trim(),
    passport: z
        .any()
        .refine((files: Blob) => {
            return !files || files.size <= MAX_UPLOAD_SIZE;
        }, { message: 'File size must be less than 1MB' } )
        .refine((files: Blob) => {
            return files && ACCEPTED_FILE_TYPES.includes(files.type);
        }, { message: 'Either insert passport with .png, .jpeg or .jpg file extension' } ),
})

export const LoginFormSchema = z.object({
    matricNum: z
        .string()
        .min(8, { message: 'Be at least 8 characters long.' })
        .regex(/^[0-9]{2}(?:\/[0-9]{2}[a-z\d]+)+$/i, { message: " Characters should follow like this sequence, example: 19/52HL001" })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .trim(),
})

export const ModalFormSchema = z.object({
    nickname: z
        .string()
        .min(2, { message: 'Be at least 2 characters long.' })
        .regex(/^[A-Za-z0-9]+$/, { message: " Characters should be alphabetic or numeric" })
        .trim(),
    passport: z
        .any()
        .refine((files: Blob) => {
            return (!files || files.size) <= MAX_UPLOAD_SIZE;
        }, { message: 'File size must be less than 1MB' } )
        .refine((files: Blob) => {
            return files && ACCEPTED_FILE_TYPES.includes(files.type);
        }, { message: 'Either insert passport with .png, .jpeg or .jpg file extension' } ),
})

export const MessageFormSchema = z.object({
    msg: z
        .string()
        .min(3, { message: 'Be at least 3 characters long.' })
        .trim(),
})

export const CandidatesFormSchema = z.object({
    nominee: z
        .string()
        .min(3, { message: 'Be at least 3 characters long.' })
        .trim(),
})

export const SetTimerFormSchema = z.object({
    timerFrom: z
        .string()
        .length(5, { message: 'Invalid timestamp received' })
        .trim(),
    timerTo: z
        .string()
        .length(5, { message: 'Invalid timestamp received' })
        .trim(),
})

export type FormState =
    |   {
            errors?: {
                matricNum?: string[]
                passport?: string[]
                password?: string[]
                nickname?: string[]
                msg?: string[]
                nominee?: string[]
                timerFrom?: string[]
                timerTo?: string[]
            }
            message?: string
        }
    |   undefined;