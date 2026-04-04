import {z} from "zod"

export const registerSchema=z.object({
    fullname:z.string().min(3,"fullname must of 3 characters"),
    email:z.string().email("Invalid email format"),
    password:z.string().min(6,"password must be of 6 characters.")
})